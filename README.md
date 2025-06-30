Created by Warren Lobb with the help of co-pilot
June 2025
Cornwall ON Canada

project name :   PRISMOR  ( Protective Implied Signal MonitOR ) 

raw code     :   CTC      ( Chart Traffic Controller ) commented code

bare code    :   CTC_bare ( Chart Traffic Controller ) bare of comments easy code

GUI          :   PIGOS    ( Protective Implied Generator Of Signals )

Purpose      :   Understanding Markets 			


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
