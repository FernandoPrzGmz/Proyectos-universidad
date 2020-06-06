const moment = require('moment');
const models = require('../../sequelize/models/');

/**
 * Esta funcion verifica si se encuentra una colision con un horario registrado
 *
 * @param {string} argsStartTime
 * @param {string} argsEnd
 * @param {number} argsLaboratoryId
 * @param {string} argsDate
 * @returns {boolean}
 */
async function collisionWithAnotherSchedule(argsStartTime, argsEnd, argsLaboratoryId, argsDate){
  // Se obtienen los horarios activos registrados en esa fecha y laboratorio
  const scheduleResponse = await models.schedule.findAll({
    where: {
      laboratory_id : argsLaboratoryId,
      date          : argsDate,
      state         : true,
    }
  });
  // Recorremos el resultado de los registros e inspeccionamos si las fechas chocan
  for(let i = 0; i < scheduleResponse.length; i++) {
    const startTimeResEle = moment((scheduleResponse[i].start_hour), 'hh:mm:ss'),
          endTimeResEle   = moment((scheduleResponse[i].end_hour), 'hh:mm:ss'),
          startTimeArgs   = moment((argsStartTime), 'hh:mm:ss'),
          endTimeArgs     = moment((argsEnd), 'hh:mm:ss');
    
    // Comprobamos si hay una colision
    if( (startTimeArgs.isSameOrAfter(startTimeResEle) && endTimeArgs.isSameOrBefore(endTimeResEle)) ||
        (startTimeResEle.isBetween(startTimeArgs, endTimeArgs) || endTimeResEle.isBetween(startTimeArgs, endTimeArgs)) ){
      // Se encontro una colision 
      return true;
    }
  }
  // No hay colision alguna con los horarios
  return false;
}

module.exports = collisionWithAnotherSchedule;