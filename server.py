from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route('/close')
def get_close():
    try:
        ticker = request.args.get("ticker", "SPY").upper()
        hist = yf.Ticker(ticker).history(period="2d")["Close"]
        if hist.empty or len(hist) < 2:
            return {"error": "Not enough data to determine yesterday's close."}, 400
        yesterday_close = float(hist.iloc[-2])
        return jsonify({"ticker": ticker, "yesterday_close": yesterday_close})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/analyze')
def analyze():
    try:
        ticker = request.args.get("ticker", "SPY").upper()

        # Live price fetch
        ticker_hist = yf.Ticker(ticker).history(period="1d", interval="1m")
        live_price = ticker_hist["Close"].iloc[-1]

        # Percent change fragility ratios
        nvda_us = yf.Ticker("NVDA").history(period="2d")["Close"].pct_change()
        nvda_cdr = yf.Ticker("NVDA.NE").history(period="2d")["Close"].pct_change()
        msft_us = yf.Ticker("MSFT").history(period="2d")["Close"].pct_change()
        msft_cdr = yf.Ticker("MSFT.NE").history(period="2d")["Close"].pct_change()
        spy_us = yf.Ticker("SPY").history(period="2d")["Close"].pct_change()
        vsp_can = yf.Ticker("VSP.TO").history(period="2d")["Close"].pct_change()

        spy_vsp_ratio = round((1 + spy_us.iloc[-1]) / (1 + vsp_can.iloc[-1]), 4)
        nvda_ratio = round((1 + nvda_us.iloc[-1]) / (1 + nvda_cdr.iloc[-1]), 4)
        msft_ratio = round((1 + msft_us.iloc[-1]) / (1 + msft_cdr.iloc[-1]), 4)

        return jsonify({
            "ticker": ticker,
            "price": round(live_price, 2),
            "spy_vsp_ratio": spy_vsp_ratio,
            "nvda_ratio": nvda_ratio,
            "msft_ratio": msft_ratio
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)