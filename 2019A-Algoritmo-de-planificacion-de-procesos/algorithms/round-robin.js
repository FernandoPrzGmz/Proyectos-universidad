// Se añaden los helpers
const {
  obtenerProcesosConMetadata,
  obtenerMaximoTimeline,
  generarTabla
} = require('./helpers');

module.exports = function roundRobin(inputProcesos, print = false){
  // procesos con el metadata agregado para verificar el estado del proceso
  let metaProcesos = obtenerProcesosConMetadata(inputProcesos);
  let queue = []; // Cola de procesos
  
  inputProcesos.quantum--;
  // Corre linea de tiempo
  for (let time = -1; time < obtenerMaximoTimeline(inputProcesos); time++) {
    // Esta variable contendra la etiqueta del proceso que se va a ejecutar
    let procesoActual = {
      etiqueta : '',
      prioridad: Number.MAX_SAFE_INTEGER,
      metadata : {
        tiempos        : 0,
        indexesTimeline: []
      }
    }; 
    
    
    // Verificamos la cola de procesos no este vacia y tomamos el primer proceso en espera
    if(queue.length > 0){
      procesoActual = queue[0];
    }

    metaProcesos.forEach(proceso => {
      if (proceso.tiempoLlegada ==  time+1 && !queue.includes(proceso.etiqueta)) {
        queue.push(proceso);
      }
    });
  
    if (procesoActual.metadata.tiempos < inputProcesos.quantum){
      procesoActual.metadata.tiempos++;
    } else {
      procesoActual.metadata.tiempos = 0;
      queue.shift();
      queue.push(procesoActual);
    }

    // Añadimos en que tiempo se esta ejecutando
    procesoActual.metadata.indexesTimeline.push(time);
    if(procesoActual.metadata.indexesTimeline.length == (procesoActual.t)){
      // Especificamos que el proceso ya se completo
      procesoActual.metadata.state = true;
      let indexProceso = 0;
      for (let i = 0; i < queue.length; i++) {
        if(queue[i].metadata.state){
          indexProceso = i;
        }
      }
      queue.splice(indexProceso, 1); // Eliminamos el proceso con el index de 'indexProceso' de la cola
    } 


    // Imprimir logs
    if(print){
      console.log('--> Tiempo', time);
      console.log('\n Ejecutando proceso: ', procesoActual); 
      console.log('-------------------------------------------------------------');
    }
  }


  // Finalmente, procedemos a crear la tabla
  let result = {
    ...inputProcesos,
    procesos: metaProcesos
  };
  generarTabla(result);

  return result;
}