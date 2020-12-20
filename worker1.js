const { Worker,workerData, parentPort } = require('worker_threads')
const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('trades.json');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const worker = new Worker('./worker2.js');
  for await (const line of rl) {
  	worker.postMessage(JSON.parse(line))
  }
}

processLineByLine();

