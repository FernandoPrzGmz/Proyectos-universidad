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

const Op = require('Sequelize').Op;

const models = require('../../sequelize/models/'),
      subjectSchema = require('../schemas/subjects');

module.exports = {
  /* TODO: Solo el administrador puede añadir una materia */
  createSubject: {
    type: subjectSchema,
    args: {
      enrollment: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
      },
    },
    resolve: async(root, args) =>{
      /** El metodo findOrCreate nos regresa un arreglo donde la posicion 0 es el resultado y la posicion 1 regresa un booleano
       *  http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-findorcreate-search-for-a-specific-element-or-create-it-if-not-available 
       */
      const subjectCreated = await models.subjects.findOrCreate({
        where: { [Op.or]:[
          { enrollment : args.enrollment.trim() },
          { name       : args.name.trim() }
        ]},
        defaults: {
          enrollment: (args.enrollment != null && args.enrollment.trim() != "" ) ? args.enrollment.trim() : null,
          name      : (args.name       != null && args.name.trim()       != "" ) ? args.name.trim()       : null,
          state     : true
        }
      });
      return subjectCreated[0];
    }
  },
  
  /* TODO: Solo el administrador puede modificar una materia */
  updateSubject: {
    type: subjectSchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'El ID del registro a modificar.',
      },
      enrollment: {
        type: GraphQLString,
        description: '',
      },
      name: {
        type: GraphQLString,
        description: '',
      },
      state: {
        type: GraphQLBoolean,
        description: '',
      },
    },
    resolve: async(root, args) =>{
      const subject = await models.subjects.findById(args.id);
      if (subject != null){
        var subject_updated = await subject.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          enrollment: (args.enrollment != null && args.enrollment.trim() != "" ) ? args.enrollment.trim() : subject.enrollment,
          name      : (args.name       != null && args.name.trim()       != "" ) ? args.name.trim()       : subject.name,
          state     : (args.state      != null)                                  ? args.state             : subject.state     
        });
      }
      return subject_updated;    
    }
  },
  

};