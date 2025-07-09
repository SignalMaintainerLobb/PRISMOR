Created by Warren Lobb with the help of co-pilot
June 2025
Cornwall ON Canada

project name :   PRISMOR  ( Protective Implied Signal MonitOR ) 
raw code     :   CTC      ( Chart Traffic Controller ) commented code
GUI          :   PIGOS    ( Protective Implied Generator Of Signals )
Purpose      :   Understanding Markets 			

project in developement stages 
REPLACED BY PIGOS-mini and PIGOS-mini UI reaadme

THESIS:

This script measures rolling volatility by marking ATM 30-day buy-write and put values at the previous day’s close. It’s designed to help traders evaluate where option participants might be trapped or in profit—and whether their behavior is creating gamma pressure.
Note: This is a contextual range framework, not a trade signal. Entries require independent risk/reward logic.

________________________________________________________________________________________________________________________

TRADER OBSERVATIONS:

- Promotes objectivity—alerts are based on range breaks, not chart-watching.

- Rejections (wicks) during RTH are noise—confirmation comes at close.

- A close above/below range often triggers confirmation bias.

- 15-minute data lag helps emotional detachment.

- Price staying within the buy-write zone = neutral zone; not bullish or bearish.

________________________________________________________________________________________________________________________


HOW TO ATTAIN CALCULATIONS : Use public or purchased data

alert hi = closing price + (closing price * put premium) 
alert low = closing price - (closing price * put premium) 

BW buffer hi = closing price + (closing price * covered call premium )
BW buffer low = closing price - (closing price * covered call premium )

put price example : alert calculation

SPY @ 700 on close
Put premium 2% for SPY on same close	

alert hi = 700 + ( 700 * 0.02 ) = 714  = hi
alert low = 700 - ( 700 * 0.02 ) = 686  = lo


BW buffer price example : buffer calculation

SPY @ 700 on close 
buy write or covered call premium 1% on same close 

BW buffer hi = 700 + ( 700 *0.01 ) = 707 = hi2
BW buffer low = 700 + ( 700 * 0.01 ) = 693 = low2

Program input Format ( "SPY", 714, 686, 707, 693 )
                     ( "SPY", hi, low, hi2, low2 )

________________________________________________________________________________________________________________________


CONCLUSIONS:

- Buy-write zone = minimum range
  Covered calls cluster here → high volume.

- Inside BW zone = neutral/no signal

- Outside BW but inside buffer = wait

- Put zone = maximum range
  Put writers/buyers act at extremes

- Outside = alert zone → potential repricing

- Confirm with close + context

- Why not just call premium -> we are tracking protected movements, loss or profit

- Why use puts - > put sellers are cash covered and put buyers 'may' also use to hedge -> we are tracking protected movements, loss or profit



✨ END	



________________________________________________________________________________________________________________________












THE HIDDEN BONUS TRACK :




Appendix I – The Squeeze Doctrine

The Dual-System Dilemma of Gamma Squeezes
Why is the universe not a unified field ?

On products like SPY, QQQ, IWM, or VXX—our so-called mainline universe—there exists no single governing model of gamma, so we attempt to summarize:
- Electrical Systems → Delta exposure mechanics (think: GME-style squeezes, thin liquidity, price velocity from OTM call pressure)
- Mechanical Systems → Futures-based hedging rooted in macro variables (rates, divs, Fed posture, ETF inflows—aka "weather systems")

When Gamma Is Electric
In thin-volume names or meme conditions, the market maker is “electrically cornered”:
- Retail blitzes OTM calls
- Dealer is short gamma, starts buying stock to hedge
- Coiling and slingshot occur as directional flow builds and we see gaps

When Gamma Becomes Weather or Mechanical 
But on the mainline? It’s different: Dealer can hedge bad calls with futures and baskets of stock
- Liquidity is deep
- Dealers hedge exposure via futures or synthetic baskets
- Gaps don’t manifest the same—SPY just grinds in stairs
- There’s no visible coiling because time value distributes and hedging moves off-exchange

High IV may bring better weather
We see the switch may occur from high IV world and too many bad calls or puts were taken by dealer 
- Bad calls and puts from dealer end wind up but,
- instead of the typical low volume to high volume stocks, SPY IWM QQQ VXX can be hedged into futures and out of direct calls and puts
- The moment the dealers decide that bad calls and puts can be offset by letting time drain and hedges losses with futures is often the
  switch from electrical to mechanical world on mainline movements


That’s the problem: PRISMOR is watching protected movement. But on the mainline, the protection mechanism itself morphs—from delta management to macro gamma osmosis.
So we can’t “see” gamma squeezes the same way in mainline index products, because:
The market maker lives in both electrical and mechanical time. And they’ll switch modes without telling anyone.

In short: PRISMOR isn't broken. The field isn't unified.


Doctrine Note – On Grounding the Product

The Operational Insight:
- Ground the product → Move to spot equities when signal integrity breaks down in options
- Do not enter the mainline track → Avoid initiating new positions in option structures during directional grind or mechanical squeezes
- Futures are darkness and light → Powerful, fast, and value-shifting—but often invisible in their intention until momentum confirms
PRISMOR Interpretation Layer
In these conditions, PRISMOR recommends:
- Watching for synthetic hedging behavior (futures overriding option decay)
- Holding back from confirmation bias when IV stays suppressed during directional trend
- Identifying unhedgeable flow not through volume, but through method switching or watching gaps go into stairsteps


“In a universe that is not unified, you only work on grounded products—and you don't jump in front of the mainline track when the train’s on approach. Darkness and light is futures.”
— SignalMaintainerLobb





