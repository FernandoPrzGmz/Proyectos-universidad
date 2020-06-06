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
      laboratorySchema = require('../schemas/laboratories');

module.exports = {
  /* TODO: Solo el administrador puede añadir un laboratorio */
  createLaboratory: {
    type: laboratorySchema,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
      },
      building: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
      },
      room: {
        type: GraphQLString,
        description: '',
      },
      description: {
        type: GraphQLString,
        description: '',
      },
      user_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
      }
    },
    resolve: async(root, args) =>{
      /** El metodo findOrCreate nos regresa un arreglo donde la posicion 0 es el resultado y la posicion 1 regresa un booleano
       *  http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-findorcreate-search-for-a-specific-element-or-create-it-if-not-available 
       */
      const laboratoryCreated = await models.laboratories.findOrCreate({
        where: { name: args.name.trim() },
        defaults: {
          name        : (args.name        != null && args.name.trim()        != "") ? args.name.trim()        : null,
          building    : (args.building    != null && args.building.trim()    != "") ? args.building.trim()    : null,
          room        : (args.room        != null && args.room.trim()        != "") ? args.room.trim()        : null,
          description : (args.description != null && args.description.trim() != "") ? args.description.trim() : null,
          state       : true,
          user_id     : args.user_id,
        }
      });
      return laboratoryCreated[0];
    }
  },

  /* TODO: Solo el administrador puede modificar un laboratorio */
  updateLaboratory: {
    type: laboratorySchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'El ID del registro a modificar.',
      },
      // Nuevos valores
      name: {
        type: GraphQLString,
        description: '',
      },
      building: {
        type: GraphQLString,
        description: '',
      },
      room: {
        type: GraphQLString,
        description: '',
      },
      description: {
        type: GraphQLString,
        description: '',
      },
      state: {
        type: GraphQLBoolean,
        description: '',
      },
      user_id: {
        type: GraphQLID,
        description: '',
      }
    },
    resolve: async(root, args) =>{
      // Se busca por ID el registro a actualizar
      const laboratoryToUpdate = await models.laboratories.findById(args.id);
      
      // Si se encontro un registro con ese ID se procede a eliminarlo
      if (laboratoryToUpdate != null){
        var laboratoryUpdated = await laboratoryToUpdate.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          name       : (args.name        != null && args.name.trim()     != "" ) ? args.name.trim()         : laboratoryToUpdate.name,
          building   : (args.building    != null && args.building.trim() != "" ) ? args.building.trim()     : laboratoryToUpdate.building,
          room       : (args.room        != null)                                ? args.room.trim()         : laboratoryToUpdate.room,
          description: (args.description != null)                                ? args.description.trim()  : laboratoryToUpdate.description,
          state      : (args.state       != null)                                ? args.state               : laboratoryToUpdate.state,
          user_id    : (args.user_id     != null)                                ? args.user_id             : laboratoryToUpdate.user_id
        });
      }
      return laboratoryUpdated;    
    }

  },

};