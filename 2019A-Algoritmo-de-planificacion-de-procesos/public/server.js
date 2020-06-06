// Importamos los modulos para el servidor
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const path       = require('path');
// Importamos los algoritmos
const FIFO = require ('./../algorithms/fifo');
const SJF  = require ('./../algorithms/sjf');
const SRT         = require ('./../algorithms/srt');
const PRIORIDADES = require ('./../algorithms/prioridades');
const ROUND_ROBIN = require ('./../algorithms/round-robin');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname+'/index.html'));
});

// Mostrar o no los logs
const enablePrint = true;

app.post('/algo', (req, res) =>{
  let inputProcesos = req.body;
  let resultado = null;
  // Segun el tipo de algoritmo seleccionamos el tipo de algoritmo
  switch(inputProcesos.algoritmo) {
    case 'FIFO':
      resultado = FIFO(inputProcesos, print=enablePrint);
      break;

    case 'SJF':
      resultado = SJF(inputProcesos, print=enablePrint);
      break;

    case 'SRT':
      resultado = SRT(inputProcesos, print=enablePrint);
      break;

    case 'PRIORIDADES':
      resultado = PRIORIDADES(inputProcesos, print=enablePrint);
      break;

    case 'ROUND-ROBIN':
      resultado = ROUND_ROBIN(inputProcesos, print=enablePrint);
      break;

    default: // Por default ejecutamos FIFO
      resultado = FIFO(inputProcesos, print=enablePrint);
  }
  res.end(JSON.stringify(resultado, null, 2));
});

app.listen(3000, () => console.log('Ejecutando en puerto 3000') );