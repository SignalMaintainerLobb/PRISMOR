document.addEventListener("DOMContentLoaded", function () {
  const analyzeBtn = document.getElementById("analyze");
  const updateCloseBtn = document.getElementById("updateClose");
  const launchTabBtn = document.getElementById("launchTab");

  const vxxCloseEl = document.getElementById("vxxClose");
  const vxxBwPremEl = document.getElementById("vxxBwPrem");
  const nvdaRatioEl = document.getElementById("nvdaRatio");
  const msftRatioEl = document.getElementById("msftRatio");
  const vspRatioEl = document.getElementById("vspRatio");

  const tickerBoxes = [
    {
      label: "Ticker 1",
      tickerInput: document.getElementById("tickerInput"),
      putPrem: document.getElementById("putPrem"),
      bwPrem: document.getElementById("bwPrem"),
      closeInput: document.getElementById("lastClose"),
      outputEl: document.getElementById("output1"),
      alertEl: document.getElementById("alertLog1")
    },
    {
      label: "Ticker 2",
      tickerInput: document.getElementById("tickerInput2"),
      putPrem: document.getElementById("putPrem2"),
      bwPrem: document.getElementById("bwPrem2"),
      closeInput: document.getElementById("lastClose2"),
      outputEl: document.getElementById("output2"),
      alertEl: document.getElementById("alertLog2")
    },
    {
      label: "Ticker 3",
      tickerInput: document.getElementById("tickerInput3"),
      putPrem: document.getElementById("putPrem3"),
      bwPrem: document.getElementById("bwPrem3"),
      closeInput: document.getElementById("lastClose3"),
      outputEl: document.getElementById("output3"),
      alertEl: document.getElementById("alertLog3")
    }
  ];

  launchTabBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "openTab" });
  });

  async function fetchVxxClose() {
    try {
      const res = await fetch("http://127.0.0.1:5000/close?ticker=VXX");
      const data = await res.json();
      if (data && typeof data.yesterday_close === "number") {
        vxxCloseEl.value = data.yesterday_close.toFixed(2);
      }
    } catch (err) {
      console.error("❌ VXX close fetch failed:", err);
    }
  }

  updateCloseBtn.addEventListener("click", async () => {
    for (let box of tickerBoxes) {
      box.outputEl.innerHTML = "";
      const ticker = box.tickerInput.value.trim().toUpperCase();
      if (!ticker) {
        box.outputEl.innerHTML = `⚠️ ${box.label}: Enter a ticker before updating close price.`;
        continue;
      }

      try {
        const res = await fetch(`http://127.0.0.1:5000/close?ticker=${ticker}`);
        const data = await res.json();
        if (!data || typeof data.yesterday_close !== "number") {
          box.outputEl.innerHTML = `❌ ${box.label}: Failed to fetch close for ${ticker}`;
          continue;
        }
        box.closeInput.value = data.yesterday_close.toFixed(2);
        box.outputEl.innerHTML = `✅ ${box.label}: Close price updated for ${ticker}`;
      } catch (err) {
        box.outputEl.innerHTML = `❌ ${box.label}: Close fetch error`;
        console.error(`❌ ${box.label}:`, err);
      }
    }
    fetchVxxClose();
  });

  async function analyzeBox(box) {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const isEarlyMute = hour === 9 && min < 50;

    box.outputEl.innerHTML = "";
    box.alertEl.innerHTML = "";

    if (isEarlyMute) {
      box.outputEl.innerHTML = `🛑 ${box.label} muted (09:00–09:50)`;
      return;
    }

    const ticker = box.tickerInput.value.trim().toUpperCase();
    const put = parseFloat(box.putPrem.value);
    const bw = parseFloat(box.bwPrem.value);
    const close = parseFloat(box.closeInput.value);

    if (!ticker || isNaN(put) || isNaN(bw) || isNaN(close)) {
      box.outputEl.innerHTML = `⚠️ ${box.label}: Invalid input`;
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:5000/analyze?ticker=${ticker}`);
      const data = await res.json();

      if (!data || typeof data.price !== "number") {
        box.outputEl.innerHTML = `❌ ${box.label}: Failed to fetch price`;
        return;
      }

      const price = data.price;
      const put_hi = close + (put / 100 * close);
      const put_lo = close - (put / 100 * close);
      const bw_hi = close + (bw / 100 * close);
      const bw_lo = close - (bw / 100 * close);

      let zone = "OUTSIDE RANGE";
      if (price > put_hi) zone = "PUT HI ALERT";
      else if (price < put_lo) zone = "PUT LO ALERT";
      else if (price > bw_hi && price <= put_hi) zone = "BW HI ALERT";
      else if (price < bw_lo && price >= put_lo) zone = "BW LO ALERT";
      else if (price >= bw_lo && price <= bw_hi) zone = "WITHIN BUFFER";

      box.outputEl.innerHTML = `<pre>
📦 ${box.label}
📡 Ticker:           ${ticker}
💵 Yest Close:       $${close.toFixed(2)}
💰 15m delay price:  $${price.toFixed(2)}
📊 Zone:             ${zone}
🔐 PUT Zone:         ${put_lo.toFixed(2)} – ${put_hi.toFixed(2)}
🛡️ BW Zone:          ${bw_lo.toFixed(2)} – ${bw_hi.toFixed(2)}
🕒 Checked:          ${now.toLocaleTimeString()}
</pre>`;

      if (zone.includes("ALERT") || zone.includes("BUFFER")) {
        const alertItem = document.createElement("li");
        alertItem.textContent = `⚠️ ${box.label}: ${zone} at $${price.toFixed(2)}`;
        box.alertEl.appendChild(alertItem);
      }

      if (box.label === "Ticker 1") {
        nvdaRatioEl.textContent = `📈 NVDA Drift Ratio → ${data.nvda_ratio}`;
        msftRatioEl.textContent = `📈 MSFT Drift Ratio → ${data.msft_ratio}`;
        vspRatioEl.textContent = `📈 SPY/VSP Drift Ratio → ${data.spy_vsp_ratio}`;

        const vxxClose = parseFloat(vxxCloseEl.value);
        const vxxBwPrem = parseFloat(vxxBwPremEl.value) / 100;
        if (!isNaN(vxxClose) && !isNaN(vxxBwPrem)) {
          const vxxSpread = (vxxClose * vxxBwPrem * 2).toFixed(2);
          const spreadColor = parseFloat(vxxSpread) < 20 ? "green" : "red";
          const vxxLine = document.createElement("div");
          vxxLine.innerHTML = `<span style="color:${spreadColor};">📈 yest VXX manual calculation: ${vxxSpread}</span>`;
          box.outputEl.appendChild(vxxLine);
        }
      }
    } catch (err) {
      box.outputEl.innerHTML = `❌ ${box.label}: Analysis error`;
      console.error(`❌ ${box.label}:`, err);
    }
  }

  analyzeBtn.addEventListener("click", async function () {
    for (let box of tickerBoxes) {
      await analyzeBox(box);
    }
  });

  setInterval(() => {
    analyzeBtn.click();
  }, 600000);

  analyzeBtn.click();
});