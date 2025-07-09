
                                                        >>>>>PIGOS-mini User Interface <<<<<

IN DEVELOPEMNT PROJECT

System requirements:

python v3

server flask cors installed

Pigos mini folder

Edge or Chrome browser

________________________________________________________________________________________________________________________

OBJECTIVE:

This UI is designed to note 

the put bands hi and low 
The BW bands hi and low
the BW buffer trading zone
Alert user when price is in or outside of zone

watch market wide collapse indications from highly trusted pairs



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


BW ( buy write or covered call ) buffer price example : buffer calculation

SPY @ 700 on close 
buy write or covered call premium 1% on same close 

BW buffer hi = 700 + ( 700 *0.01 ) = 707 = hi2
BW buffer low = 700 - ( 700 * 0.01 ) = 693 = low2

________________________________________________________________________________________________________________________

PIGOS-mini // Signal Input Spec
Required Inputs
- ATM PUT Premium (30D) — closing value from previous session
- ATM BW Premium (30D) — closing value from previous session
- Previous Close Price — full session settle

Action: Hit Analyze Signal
The system will scan and categorize live price into alert zones:
- PUT HI Alert → Price trading  above  PUT premium threshold
- PUT LO Alert → Price trading  below  PUT premium threshold
- BW HI Alert → Price trading   above  BW premium threshold
- BW LO Alert → Price trading   below  BW premium threshold
- Buffer Zone → Price within    BW hi/lo range; neutral condition

Action: 
Hit Cockpit button →  Brings dashboard into browser for easy entry

Bonus listing :

SPY / VFV ( testing ) 
NVDA ( US ) / NVDA ( Can CDR )
MSFT ( US ) / NVDA ( can CDR )

These ratios are based on percent changes and may slightly change in small ranges but never exceeding more than 0.15 any close.
Market interpretations on these pairs are complex and need trader evaluation before taking extreme signal.
	
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
