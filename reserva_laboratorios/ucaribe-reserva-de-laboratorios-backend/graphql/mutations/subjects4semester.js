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

const models = require('../../sequelize/models/'),
      subjects4semesterSchema = require('../schemas/subjects4semester');

module.exports = {
  /* TODO: Solo el administrador puede añadir un nuevo SubjectForSemester */
  createSubjectForSemester: {
    type: subjects4semesterSchema,
    args: {
      section: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
      },
      user_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID del docente.',
      },
      subject_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID de la materia.',
      },
      semester_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID del semestre en el que se imparte la materia.',
      },
    },
    resolve: async(root, args) =>{
      /** El metodo findOrCreate nos regresa un arreglo donde la posicion 0 es el resultado y la posicion 1 regresa un booleano
       *  http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-findorcreate-search-for-a-specific-element-or-create-it-if-not-available 
       */
      const subject4semesterCreated = await models.subjects4semester.findOrCreate({
        where: {
          section     : args.section.trim(),
          subject_id  : args.subject_id,
          semester_id : args.semester_id,
        },
        defaults: {
          section     : (args.section     != null && args.section.trim() != "") ? args.section.trim() : null,
          user_id     : (args.user_id     != null && args.user_id        != "") ? args.user_id        : null,
          subject_id  : (args.subject_id  != null && args.subject_id     != "") ? args.subject_id     : null,
          semester_id : (args.semester_id != null && args.semester_id    != "") ? args.semester_id    : null,
          state       : true
        }
      });
      return subject4semesterCreated[0];
    }
  },
  
  /* TODO: Solo el administrador puede modificar un nuevo SubjectForSemester */
  updateSubjectForSemester:{
    type: subjects4semesterSchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'El ID del registro a modificar.',
      },
      section: {
        type: GraphQLString,
        description: '',
      },
      user_id: {
        type: GraphQLID,
        description: 'ID del docente.',
      },
      subject_id: {
        type: GraphQLID,
        description: 'ID de la materia.',
      },
      semester_id: {
        type: GraphQLID,
        description: 'ID del semestre en el que se imparte la materia.',
      },
      state: {
        type: GraphQLBoolean,
        description: '',
      },
    },
    resolve: async(root, args) =>{
      const subject4semester = await models.subjects4semester.findById(args.id);
      if (subject4semester != null){
        var update_SubjectForSemester = await subject4semester.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          section     : (args.section     != null && args.section.trim() != "") ? args.section.trim() : subject4semester.section,
          user_id     : (args.user_id     != null)                              ? args.user_id        : subject4semester.user_id,
          subject_id  : (args.subject_id  != null)                              ? args.subject_id     : subject4semester.subject_id,
          semester_id : (args.semester_id != null)                              ? args.semester_id    : subject4semester.semester_id,
          state       : (args.state       != null)                              ? args.state          : subject4semester.state         
        });
      }
      return update_SubjectForSemester;    
    }
  },
};