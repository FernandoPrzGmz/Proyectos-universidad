// Importamos los algoritmos
const FIFO = require ('./algorithms/fifo');
const SJF  = require ('./algorithms/sjf');
const SRT         = require ('./algorithms/srt');
const PRIORIDADES = require ('./algorithms/prioridades');
const ROUND_ROBIN = require ('./algorithms/round-robin');

// Importamos el archivo JSON
const inputProcesos = require('./examples/RR/RR.2.json');

// Segun el tipo de algoritmo seleccionamos el tipo de algoritmo
switch(inputProcesos.algoritmo) {
  case 'FIFO':
    console.log(JSON.stringify(FIFO(inputProcesos, print=true), null, 2));
    break;

  case 'SJF':
    console.log(JSON.stringify(SJF(inputProcesos, print=true), null, 2));
    break;

  case 'SRT':
    console.log(JSON.stringify(SRT(inputProcesos, print=true), null, 2));
    break;

  case 'PRIORIDADES':
    console.log(JSON.stringify(PRIORIDADES(inputProcesos, print=true), null, 2));
    break;

  case 'ROUND-ROBIN':
    console.log(JSON.stringify(ROUND_ROBIN(inputProcesos, print=true), null, 2));
    break;

  default: // Por default ejecutamos FIFO
    console.log(JSON.stringify(FIFO(inputProcesos, print=true), null, 2));
}