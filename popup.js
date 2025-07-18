document.addEventListener("DOMContentLoaded", function () {
  const analyzeBtn = document.getElementById("analyze");
  const updateCloseBtn = document.getElementById("updateClose");
  const launchTabBtn = document.getElementById("launchTab");
  const output = document.getElementById("output");
  const nvdaRatioEl = document.getElementById("nvdaRatio");
  const msftRatioEl = document.getElementById("msftRatio");
  const alertLog = document.getElementById("alertLog");
  const lastCloseEl = document.getElementById("lastClose");
  const vxxCloseEl = document.getElementById("vxxClose");
  const vxxBwPremEl = document.getElementById("vxxBwPrem");

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
    const tickerInput = document.getElementById("tickerInput").value.trim().toUpperCase();
    if (!tickerInput) {
      output.textContent = "⚠️ Enter a ticker before updating close price.";
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:5000/close?ticker=${tickerInput}`);
      const data = await res.json();

      if (!data || typeof data.yesterday_close !== "number") {
        output.textContent = `❌ Server failed to get close price for ${tickerInput}`;
        return;
      }

      lastCloseEl.value = data.yesterday_close.toFixed(2);
      output.textContent = `✅ Close price updated for ${tickerInput}`;

      fetchVxxClose();
    } catch (err) {
      console.error("❌ Close fetch failed:", err);
      output.textContent = "❌ Close price update failed.";
    }
  });

  analyzeBtn.addEventListener("click", async function () {
    // 🛑 EARLY SESSION CHECK (09:00–09:50)
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const isEarlyMute = (hour === 9 && min < 50);

    output.innerHTML = "";
    alertLog.innerHTML = "";

    if (isEarlyMute) {
      output.style.color = "gold";
      output.innerHTML = "🛑 Early session muted (09:00–09:50)";
      return;
    } else {
      output.style.color = ""; // Reset to default color
    }

    const tickerInput = document.getElementById("tickerInput").value.trim().toUpperCase();
    const putInput = parseFloat(document.getElementById("putPrem").value);
    const bwInput = parseFloat(document.getElementById("bwPrem").value);
    const userClose = parseFloat(lastCloseEl.value);

    const vxxClose = parseFloat(vxxCloseEl.value);
    const vxxBwPrem = parseFloat(vxxBwPremEl.value) / 100;

    if (!tickerInput || isNaN(putInput) || isNaN(bwInput) || isNaN(userClose)) {
      output.innerHTML = "⚠️ Please fill in all fields using valid numbers.";
      return;
    }

    output.innerHTML = "🔄 Analyzing...";

    try {
      const response = await fetch(`http://127.0.0.1:5000/analyze?ticker=${tickerInput}`);
      const data = await response.json();

      if (!data || typeof data.price !== "number") {
        output.innerHTML = "❌ Failed to parse live data. Check ticker or check connection.";
        return;
      }

      const livePrice = data.price;

      const putPrem = putInput / 100;
      const bwPrem = bwInput / 100;

      const put_hi = userClose + (putPrem * userClose);
      const put_lo = userClose - (putPrem * userClose);
      const bw_hi = userClose + (bwPrem * userClose);
      const bw_lo = userClose - (bwPrem * userClose);

      let zone = "OUTSIDE RANGE";
      if (livePrice > put_hi) zone = "PUT HI ALERT";
      else if (livePrice < put_lo) zone = "PUT LO ALERT";
      else if (livePrice > bw_hi && livePrice <= put_hi) zone = "BW HI ALERT";
      else if (livePrice < bw_lo && livePrice >= put_lo) zone = "BW LO ALERT";
      else if (livePrice >= bw_lo && livePrice <= bw_hi) zone = "WITHIN BUFFER";

      let resultText = `<pre>
📡 Ticker:           ${tickerInput}
💵 Yest Close:       $${userClose.toFixed(2)}
💰 15m delay price:  $${livePrice.toFixed(2)}
📊 Zone:             ${zone}
🔐 PUT Zone:         ${put_lo.toFixed(2)} – ${put_hi.toFixed(2)}
🛡️ BW Zone:          ${bw_lo.toFixed(2)} – ${bw_hi.toFixed(2)}
🕒 Checked:          ${now.toLocaleTimeString()}
</pre>`;

      output.innerHTML = resultText;

      if (zone.includes("ALERT") || zone.includes("BUFFER")) {
        const alertItem = document.createElement("li");
        alertItem.textContent = `⚠️ ${zone} triggered at $${livePrice.toFixed(2)}`;
        alertLog.appendChild(alertItem);
      }

      nvdaRatioEl.textContent = `📈 NVDA Drift Ratio → ${data.nvda_ratio}`;
      msftRatioEl.textContent = `📈 MSFT Drift Ratio → ${data.msft_ratio}`;
      document.getElementById("vspRatio").textContent = `📈 SPY/VSP Drift Ratio → ${data.spy_vsp_ratio}`;

      if (!isNaN(vxxClose) && !isNaN(vxxBwPrem)) {
        const vxxSpread = (vxxClose * vxxBwPrem * 2).toFixed(2);
        const spreadColor = parseFloat(vxxSpread) < 20 ? "green" : "red";

        const vxxLine = document.createElement("div");
        vxxLine.innerHTML = `<span style="color:${spreadColor};">📈 yest VXX manual calculation: ${vxxSpread}</span>`;
        output.appendChild(vxxLine);
      }
    } catch (error) {
      console.error("⚠️ Delay error: Data fetch failed. Confirm yesterday was a trading day before reloading:", error);
      output.innerHTML = "⚠️ Delay error: Data fetch failed. Confirm yesterday was a trading day before reloading.";
      nvdaRatioEl.textContent = "❌ NVDA ratio fetch failed.";
      msftRatioEl.textContent = "❌ MSFT ratio fetch failed.";
    }
  });

  setInterval(() => {
    analyzeBtn.click();
  }, 600000);

  analyzeBtn.click();
});