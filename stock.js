const { Worker,workerData, parentPort } = require('worker_threads')
const worker = new Worker('./worker3.js');

class Stock{
	constructor(name,open,close,low,high,vol,timer){
		this.name=name;
		this.open=open;
		this.close=close;
		this.low=low;
		this.high=high;
		this.vol=vol;
		this.timer=timer;
		this.prevTimer=0;
		this.bar=1;
		this.bars=[];
	}

	updateLow(low){
		this.low=low;
	}

	addBar(data){
		this.bars.push(data)
	}

	updateHigh(high){
		this.high=high;
	}

	updateClose(close){
		this.close=close;
	}

	updateOpen(open){
		this.open=open;
	}

	updateVol(vol){
		this.vol+=vol;
	}

	getTimer(){
		return this.timer;
	}

	makeBars(){
		if(this.bars[0]!=undefined){
			let first=this.bars[0].TS2/1000000000;
			while(first<this.timer && first>=this.prevTimer){
				this.updater(this.bars.shift())
				if(this.bars[0]!=undefined){
					first=this.bars[0].TS2/1000000000;
				}
				else break;
			}
		}
	}

	sendData=()=>{
		worker.postMessage({event:"OHLC notify",symbol:this.name,bar_num:this.bar++,
							O:this.open,H:this.high,L:this.low,C:this.close,volume:this.vol})
		this.open=0;
		this.close=0;
		this.low=0;
		this.high=0;
		this.vol=0;
		this.prevTimer=this.timer;
	}

	updateTimer=()=>{
		this.sendData()
		this.timer+=15;
		this.makeBars()
	}

	runTimer(){
		return setInterval(this.updateTimer,15000)
	}


	updater(data){	
		if(this.open==0){
			this.updateOpen(data.P)
			this.updateHigh(data.P)
			this.updateLow(data.P)
		}
		if(data.P>this.high){
			this.updateHigh(data.P)
		}else if(data.P<this.low){
			this.updateLow(data.P)
		}
		this.updateClose(data.P)
		this.updateVol(data.Q)
	};
}

module.exports=Stock;