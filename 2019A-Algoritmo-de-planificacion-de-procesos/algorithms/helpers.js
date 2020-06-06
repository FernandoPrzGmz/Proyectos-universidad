/**
 * Calcula el maximo tiempo con la sumatoria de los procesos
 *
 * @param {object} {procesos} Recibe el formato de entrada json
 * @returns {number} {tiempoFinalizacionMaximo} Retorna un int que representa hasta donde llega la linea del tiempo
 */
const obtenerMaximoTiempoFinalizacion = ( {procesos} ) =>{
  let tiempoFinalizacionMaximo = 0;
  // Sumatoria de todos los procesos.t
  procesos.forEach(element => {
    tiempoFinalizacionMaximo += element.t;
  });
  return tiempoFinalizacionMaximo;
}

/**
 * Calcula el maximo tiempo en la timeline
 *
 * @param {object} {procesos} Recibe el formato de entrada json
 * @returns {number} {tiempoFinalizacionMaximo} Retorna un int que representa hasta donde llega la linea del tiempo
  
 */
const obtenerMaximoTimeline = ( {procesos} ) =>{
  let tiempoLlegadaMaximo = -Number.MAX_SAFE_INTEGER;
  procesos.forEach(element => {
    if(element.tiempoLlegada > tiempoLlegadaMaximo){
      tiempoLlegadaMaximo = element.tiempoLlegada;
    }
  });
  // Retornamos el maximo valor de tiempoFinalizacion + tiempoLlegada
  return obtenerMaximoTiempoFinalizacion( {procesos} ) + tiempoLlegadaMaximo;
}

/**
 * Evalua el listado de procesos y determina el menor tiempo de llegada
 * @param {object} {procesos} Recibe el formato de entrada json
 * @returns {number} {menorTiempoLlegada} Retorna un numero que representa el
 * menor tiempo de llegada
 */
const obtenerMenorTiempoLlegada = ( {procesos} ) =>{
  let menorTiempoLlegada = Number.MAX_SAFE_INTEGER;
  
  procesos.forEach(element => {
    if (element.tiempoLlegada < menorTiempoLlegada){
      menorTiempoLlegada = element.tiempoLlegada;
    }
  });
  return menorTiempoLlegada;
}

/**
 * Realiza una copia de todos los procesos y les añade el atributo metadata
 * donde se tiene el estado si ya se termino el procesos y el indice en la
 * linea del tiempo
 * @param {object} {procesos} Recibe el formato de entrada json
 * @returns {Array} {procesosMetadata} Retorna un array de los procesos con metadatos
 */
const obtenerProcesosConMetadata = ( {procesos} ) =>{
  let procesosMetadata = [];
  procesos.forEach(element => {
    procesosMetadata.push({
      ...element,
      metadata: {
        tiempos        : 0,
        state          : false,
        indexesTimeline: []
      }
    });
  });
  return procesosMetadata;
}
/* Funciones para generar la tabla */
const calculaF = ( {indexesTimeline} ) =>{
  return Math.max.apply(null, indexesTimeline)+1;
}
const calculaT = (proceso) =>{
  return proceso.F - proceso.tiempoLlegada;
}
const calculaW = (proceso) =>{
  return proceso.T - proceso.t;
}
const calculaP = (proceso) =>{
  return proceso.T / proceso.t;
}

/**
 * Se genera la tabla de los procesos 
 * @param {object} procesosMetadata 
 */
const generarTabla = (procesosMetadata) =>{
  let sumaT = 0, sumaW = 0, sumaP = 0;
  // Recorremos cada uno de los procesos para calcular los datos
  procesosMetadata.procesos.forEach(proceso => {
    // Se añaden los valores a los procesos
    proceso.F = calculaF(proceso.metadata);
    proceso.T = calculaT(proceso);
    proceso.W = calculaW(proceso);
    proceso.P = calculaP(proceso);
    // Se hace la sumatoria para obtener el promedio
    sumaT += calculaT(proceso);  
    sumaW += calculaW(proceso);
    sumaP += calculaP(proceso);
  });
  procesosMetadata.promedioT = sumaT / procesosMetadata.procesos.length;
  procesosMetadata.promedioW = sumaW / procesosMetadata.procesos.length;
  procesosMetadata.promedioP = sumaP / procesosMetadata.procesos.length;
}

// Exportamos las funciones para que puedan ser usadas en otros modelos
module.exports = {
  obtenerMaximoTiempoFinalizacion,
  obtenerMenorTiempoLlegada,
  obtenerProcesosConMetadata,
  obtenerMaximoTimeline,
  generarTabla,
}