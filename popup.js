document.addEventListener("DOMContentLoaded", function () {
  const analyzeBtn = document.getElementById("analyze");
  const updateCloseBtn = document.getElementById("updateClose");
  const launchTabBtn = document.getElementById("launchTab");
  const output = document.getElementById("output");
  const nvdaRatioEl = document.getElementById("nvdaRatio");
  const msftRatioEl = document.getElementById("msftRatio");
  const alertLog = document.getElementById("alertLog");
  const lastCloseEl = document.getElementById("lastClose");

  // 🚀 Launch persistent tab
  launchTabBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "openTab" });
  });

  // 📅 Update Last Close button logic (calls backend /close)
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
    } catch (err) {
      console.error("❌ Close fetch failed:", err);
      output.textContent = "❌ Close price update failed.";
    }
  });

  // 🧪 Analyze signal logic
  analyzeBtn.addEventListener("click", async function () {
    output.textContent = "🔄 Analyzing...";
    alertLog.innerHTML = "";

    const tickerInput = document.getElementById("tickerInput").value.trim().toUpperCase();
    const putInput = parseFloat(document.getElementById("putPrem").value);
    const bwInput = parseFloat(document.getElementById("bwPrem").value);
    const userClose = parseFloat(lastCloseEl.value);

    if (!tickerInput || isNaN(putInput) || isNaN(bwInput) || isNaN(userClose)) {
      output.textContent = "⚠️ Please fill in all fields using valid numbers.";
      return;
    }

    const putPrem = putInput / 100;
    const bwPrem = bwInput / 100;

    try {
      const response = await fetch(`http://127.0.0.1:5000/analyze?ticker=${tickerInput}`);
      const data = await response.json();

      if (!data || typeof data.price !== "number") {
        output.textContent = "❌ Failed to parse live data. Check ticker and try again.";
        return;
      }

      const livePrice = data.price;

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

      output.textContent = `
📡 Ticker: ${tickerInput}
💵 Yesterday's Close: $${userClose.toFixed(2)}
💰 Live Price: $${livePrice.toFixed(2)}
📊 Zone: ${zone}
🔐 PUT Zone: ${put_lo.toFixed(2)} – ${put_hi.toFixed(2)}
🛡️ BW Zone: ${bw_lo.toFixed(2)} – ${bw_hi.toFixed(2)}
🕒 Checked: ${new Date().toLocaleTimeString()}
`;

      if (zone.includes("ALERT") || zone.includes("BUFFER")) {
        const alertItem = document.createElement("li");
        alertItem.textContent = `⚠️ ${zone} triggered at $${livePrice.toFixed(2)}`;
        alertLog.appendChild(alertItem);
      }

      nvdaRatioEl.textContent = `📈 NVDA Drift Ratio → ${data.nvda_ratio}`;
      msftRatioEl.textContent = `📈 MSFT Drift Ratio → ${data.msft_ratio}`;
      document.getElementById("vspRatio").textContent = `📈 SPY/VSP Drift Ratio → ${data.spy_vsp_ratio}`;
    } catch (error) {
      console.error("❌ Fetch error:", error);
      output.textContent = "❌ Data fetch failed.";
      nvdaRatioEl.textContent = "❌ NVDA ratio fetch failed.";
      msftRatioEl.textContent = "❌ MSFT ratio fetch failed.";
    }
  });

  // ⏱️ Auto-refresh every 60 seconds
  setInterval(() => {
    analyzeBtn.click();
  }, 60000); // 1 min loop

  // 🟢 Trigger once on startup
  analyzeBtn.click();
});