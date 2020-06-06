// Se añaden los helpers
const {
  obtenerProcesosConMetadata,
  obtenerMaximoTimeline,
  generarTabla
} = require('./helpers');

module.exports = function prioridades(inputProcesos, print = false){
  // procesos con el metadata agregado para verificar el estado del proceso
  let metaProcesos = obtenerProcesosConMetadata(inputProcesos);
  let queue = []; // Cola de procesos
  
  // Corre linea de tiempo
  for (let time = 0; time < obtenerMaximoTimeline(inputProcesos); time++) {
    // Esta variable contendra la etiqueta del proceso que se va a ejecutar
    let procesoActual = {
      etiqueta : '',
      prioridad: Number.MAX_SAFE_INTEGER,
      metadata : {
        indexesTimeline: []
      }
    }; 
    
    
    // Se añaden en la cola los procesos entrantes en su tiempo
    metaProcesos.forEach(proceso => {
      if (proceso.tiempoLlegada ==  time && !queue.includes(proceso.etiqueta)) {
        queue.push(proceso);
      }
    });
    
    
    // Verificamos la cola de procesos y obtenemos el de mayor prioridad
    queue.forEach(proceso => {
      if (proceso.prioridad < procesoActual.prioridad){
        procesoActual = proceso;
      }
    });
    

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