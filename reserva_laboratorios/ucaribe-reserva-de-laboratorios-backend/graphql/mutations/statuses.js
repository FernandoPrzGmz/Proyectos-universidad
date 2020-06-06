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
      statusSchema = require('../schemas/statuses');

module.exports = {
  /* TODO: Solo el administrador puede añadir un status */
  createStatus: {
    type: statusSchema,
    args: {
      status: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
      },
      description: {
        type: GraphQLString,
        description: '',
      },
    },
    resolve: async(root, args) =>{
      /** El metodo findOrCreate nos regresa un arreglo donde la posicion 0 es el resultado y la posicion 1 regresa un booleano
       *  http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-findorcreate-search-for-a-specific-element-or-create-it-if-not-available 
       */
      const statusCreated = await models.statuses.findOrCreate({
        where: { status : args.status.trim() },
        defaults: {
          status      : (args.status      != null && args.status.trim()      != "") ? args.status.trim()      : null,
          description : (args.description != null && args.description.trim() != "") ? args.description.trim() : null,
          state       : true
        }
      });
      return statusCreated[0];
    }
  },

  /* TODO: Solo el administrador puede actualizar un status */
  updateStatus:{
    type: statusSchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'El ID del registro a modificar.',
      },
      status: {
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
    },
    resolve: async(root, args) =>{
      // FIXME: Si se modifica a un status que ya existe manda un "message": "Validation error"
      const status = await models.statuses.findById(args.id);
      if (status != null){
        var status_updated = await status.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          status      : (args.status      != null && args.status.trim()      != "" ) ? args.status.trim() : status.status,
          description : (args.description != null) ? args.description.trim() : status.description,
          state       : (args.state       != null) ? args.state              : status.state     
        });
      }
      return status_updated;    
    }
  },
};

