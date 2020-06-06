// Se añaden los helpers
const {
  obtenerProcesosConMetadata,
  obtenerMaximoTimeline,
  generarTabla
} = require('./helpers');

module.exports = function sjf(inputProcesos, print = false){
  // procesos con el metadata agregado para verificar el estado del proceso
  let metaProcesos = obtenerProcesosConMetadata(inputProcesos);
  let queue = []; // Cola de procesos
  
  // Corre linea de tiempo
  for (let time = 0; time < obtenerMaximoTimeline(inputProcesos); time++) {

   
    // Obtenemos el proceso actual
    let procesoActual = null; 
    queue.forEach(proceso => {
      if (proceso.metadata.state == 'EJECUCION'){
        procesoActual = proceso;
      }
    });    
    
    // Se añaden en la cola los procesos entrantes en su tiempo
    metaProcesos.forEach(proceso => {
      if (proceso.tiempoLlegada ==  time && !queue.includes(proceso.etiqueta)) {
        queue.push(proceso);
      }
    });
    
    
    // Si no tenemos un proceso en ejecucion buscamos el que necesite menos tiempo de ejecucion
    if(procesoActual == null) {
      let pAux = {
        etiqueta : '',
        t        : Number.MAX_SAFE_INTEGER,
        metadata : { indexesTimeline: [] }
      };
      queue.forEach(proceso => {
        if (proceso.t < pAux.t){
          pAux = proceso;
        }
      });
      
      procesoActual = pAux;
    }


    // Añadimos en que tiempo se esta ejecutando
    procesoActual.metadata.indexesTimeline.push(time);
    procesoActual.metadata.state = 'EJECUCION';
    
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