const { workerData, parentPort ,isMainThread} = require('worker_threads')

if(!isMainThread){
	parentPort.on('message', (data)=>{
		 console.log(data)
	})
}
