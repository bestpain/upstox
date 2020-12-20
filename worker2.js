const Stock=require('./stock.js')
const { workerData, parentPort ,isMainThread} = require('worker_threads')

if(!isMainThread){
	parentPort.on('message', (data)=>{
		 runfunction(data)
	})
}

let Stocks={};

function runfunction(data){

	if(!Stocks.hasOwnProperty(data.sym)){
		let timer=data.TS2/1000000000;
		Stocks[data.sym]=new Stock(data.sym,data.P,0,data.P,data.P,data.Q,timer+15)
		Stocks[data.sym].runTimer()
	}else {
		if((data.TS2/1000000000)<Stocks[data.sym].getTimer()){
			Stocks[data.sym].updater(data)
		}else{
			Stocks[data.sym].addBar(data)
		}	
	}
}
