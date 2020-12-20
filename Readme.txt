Output format:
Send the OHLC "ONLY" when the bar closes

Design:
created a class named Stock.
for every new symbol(stock) instantiate a new Stock object.
And keep on updating the values of this new object.


Data structures used:
An object whose key will be the symbol(stock).
And value will be Stock object.
Every Stock object has an array named 'bars' 
this bars array will be used as an Queue which stores all the incoming trade value for that particular symbol.


flowchart->
1.if stock comes for the first time

2.create an object from the Stock class

3.start the timer 
timer=TS +15 sec

4.put this stock object inside the Stocks Object with key as the symbol and value of stock

5.for the next stock if TS is greater than timer value then add inside the bars array(queue)

6.when timer expire run a setInterval and send the stocks data to Worker3

 