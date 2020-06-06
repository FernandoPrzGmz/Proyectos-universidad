'use strict';

const {
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql');

const moment = require('moment');
const Op     = require('Sequelize').Op;

const models = require('../../sequelize/models/'),
      semesterSchema = require('../schemas/semesters');

module.exports = {
  /* TODO: Solo el administrador puede añadir un semestre */
  createSemester:{
    type: semesterSchema,
    args: {
      semester: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
      },
      start_date: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'YYYY-MM-DD',
      },
      end_date: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'YYYY-MM-DD',
      },
    },
    resolve: async(root, args) =>{
      // Comprobamos que la fecha de inicio sea mayor que la fecha de fin
      if(moment(args.start_date) < moment(args.end_date)){
        /** El metodo findOrCreate nos regresa un arreglo donde la posicion 0 es el resultado y la posicion 1 regresa un booleano
         *  http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-findorcreate-search-for-a-specific-element-or-create-it-if-not-available 
         */
        const semesterCreated = await models.semesters.findOrCreate({
          where: { [Op.or]:[
            { semester  : args.semester.trim() },
            { start_date: args.start_date.trim() },
            { end_date  : args.end_date.trim() }
          ]},
          defaults: {
            semester   : args.semester.trim(),
            start_date : args.start_date.trim(),
            end_date   : args.end_date.trim(),
            state      : true
          }
        });
        return semesterCreated[0];

      } else {
        // Error: 'end_date' es menor que 'start_date'
        return null;
      }


    }
  },
  
  /* TODO: Solo el administrador puede actualizar un semestre */
  updateSemester:{
    type: semesterSchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'El ID del registro a modificar.',
      },
      semester: {
        type: GraphQLString,
        description: '',
      },
      start_date: {
        type: GraphQLString,
        description: 'YYYY-MM-DD',
      },
      end_date: {
        type: GraphQLString,
        description: 'YYYY-MM-DD',
      },
      state: {
        type: GraphQLBoolean,
        description: '',
      },
    },
    resolve: async(root, args) =>{
      const semester = await models.semesters.findById(args.id);
      
      if (semester != null){
        var semesterUpdated = await semester.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          semester  : (args.semester   != null && args.semester.trim()   != "" ) ? args.semester.trim()   : semester.semester,
          start_date: (args.start_date != null && args.start_date.trim() != "" ) ? args.start_date.trim() : semester.start_date,
          end_date  : (args.end_date   != null && args.end_date.trim()   != "" ) ? args.end_date.trim()   : semester.end_date,
          state     : (args.state      != null)                                  ? args.state             : semester.state     
        });
      }
      return semesterUpdated;    
    }
  },

};