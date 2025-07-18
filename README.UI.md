                                                        >>>>>PIGOS-mini User Interface <<<<<



IN DEVELOPEMNT PROJECT



System requirements:



python v3



server flask cors installed



yf lib installed



PIGOS-mini folder with - 8 files that includes 2 readme files ( UI + fast instructions )



Edge or Chrome browser



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



OBJECTIVE:



Monitor is designed for :  Understanding of Advanced market behavior from buy writes and puts



a)  Bias Price of an in-range or out of range day

b)  Confirm Volatility

c)  Direct user for bias on open long positions - in range or above range day may indicate; pressure from selling is low

d)  Direct user for bias on open short positions - under range day may indicate; pressure from buying is low

 





This UI is designed to note



the put bands hi and low

The BW bands hi and low

the BW buffer trading zone

Alert user when price is in or outside of zone



watch market wide collapse indications from highly trusted pairs







HOW TO ATTAIN CALCULATIONS : Use public or purchased data



alert hi = closing price + (closing price \* put premium)

alert low = closing price - (closing price \* put premium)



BW buffer hi = closing price + (closing price \* covered call premium )

BW buffer low = closing price - (closing price \* covered call premium )



put price example : alert calculation



SPY @ 700 on close

Put premium 2% for SPY on same close



alert hi = 700 + ( 700 \* 0.02 ) = 714  = hi

alert low = 700 - ( 700 \* 0.02 ) = 686  = lo





BW ( buy write or covered call ) buffer price example : buffer calculation



SPY @ 700 on close

buy write or covered call premium 1% on same close



BW buffer hi = 700 + ( 700 \*0.01 ) = 707 = hi2

BW buffer low = 700 - ( 700 \* 0.01 ) = 693 = low2



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



PIGOS-mini // Signal Input Spec



\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*Required Inputs\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*



\- Enter ticker

\- ATM PUT Premium (30D) — closing value from previous session

\- ATM BW Premium (7D) — closing value from previous session



\- ATM VXX BW Premium (3M) - closing value from previous session



\- Previous Close Price will be auto filled 



-->  Press update last close before pressing Analyze



Example entry steps:



step1: SPY

step2: 1.5% = 1.5 entry

step3: 0.7% = 0.7 entry

step4: 10.1% = 10.1 entry

step5: leave blank and press update last close

step6: press analyze for data



\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*Required Inputs\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*





\- Auto refresh set to every 60 seconds it will clear log and check for new alerts with live price and pair ratio's

\- Price bands do not change as they are set to calculate based on yest close price and prem



Action: Hit Analyze Signal

The system will scan and categorize live price into alert zones:

\- PUT HI Alert → Price trading  above  PUT premium threshold

\- PUT LO Alert → Price trading  below  PUT premium threshold

\- BW HI Alert → Price trading   above  BW premium threshold

\- BW LO Alert → Price trading   below  BW premium threshold

\- Buffer Zone → Price within    BW hi/lo range; neutral condition



Action:

Hit Cockpit button →  Brings dashboard into browser for easy entry



Bonus listing :



VXX Manual Calculation – Overview for PIGOS Users



PIGOS performs best when the VXX manual calculation from yesterday reports below 20. This figure is based on your rolling 3-month premium entry on VXX, providing context for expected intraday volatility.

\- Values below 20 suggest bands may see subdued volatility and tighten up - study mechanical PRISMOR trading 

\- Values above 20 indicate elevated volatility—bands may widen excessively - study electric PRISMOR trading 



Mainline products may trade within their bands routinely, making directional signals harder to interpret during high volatility periods.





Bonus listing :



SPY / VFV ( testing )

NVDA ( US ) / NVDA ( Can CDR )

MSFT ( US ) / NVDA ( can CDR )



These ratios are based on Daily percent changes and may slightly change in small ranges but never less than 0.90 any close.

Which says VSP is leading SPY by 1% or more,

which should not happen in regular trading environment- they are a tight pair by design

Market interpretations on these pairs are complex and need trader evaluation before taking on extreme signal.







\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_





Data Errors \& Fetch Handling



Delay Errors / Fetch Failures



If data fails to load near market open—especially after weekends—verify the previous session was an active trading day (i.e., no holidays or market closures). Minor internet interruptions may also trigger fetch issues. Click Analyze to retry manually.

Note: PIGOS relies on a 15-minute delayed feed. The recommended analyze window begins 09:45–09:50 actual time.





Early Session Mute (BMO/AMC Hours)



Between 09:00–09:50 actual time, PIGOS will report:

Early session muted



This feature prevents misreads from delayed pricing that may echo yesterday’s tape and cause false alerts.

Clean session analysis begins after 09:51 actual time, when structure stabilizes.





Daily Setup – Recommended Steps

Before running a fresh analysis:

\- Clear all fields, enter ticker, PUT, BW premiums

\- Press Update Last Close to refresh pricing of selected ticker yesterday close.

\- Press Analyze to begin session tracking for todays delayed price against trading bands



Troubleshooting Tips

\- If updates fail, try restarting the PIGOS extension.

\- Always operate in full cockpit mode for optimal signal visibility.

\- Manual override coming soon—for advanced users needing early tape access.



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_





CONCLUSIONS:



\- Buy-write zone = minimum range

  Covered calls cluster here → high volume.



\- Inside BW zone = neutral/no signal



\- Outside BW but inside buffer = wait



\- Put zone = maximum range

  Put writers/buyers act at extremes



\- Outside = alert zone → potential repricing



\- Confirm with close + context



\- Why not just call premium -> we are tracking protected movements, loss or profit



\- Why use puts - > put sellers are cash covered and put buyers 'may' also use to hedge -> we are tracking protected movements, loss or profit





// END

