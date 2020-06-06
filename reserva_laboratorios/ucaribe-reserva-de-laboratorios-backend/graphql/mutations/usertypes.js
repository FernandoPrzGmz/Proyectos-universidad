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
      userTypesSchema = require('../schemas/usertypes');

module.exports = {
  /* TODO: Solo el administrador puede añadir un nuevo usertype */
  createUsertype: {
    type: userTypesSchema,
    args: {
      type: {
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
      const usertypeCreated = await models.usertypes.findOrCreate({
        where: { type: args.type.trim() },
        defaults: {
          type        : (args.type        != null && args.type.trim()        != "" ) ? args.type.trim()        : null,
          description : (args.description != null && args.description.trim() != "" ) ? args.description.trim() : null,
          state       : true
        }
      });
      return usertypeCreated[0];
    }
  },
  
  /* TODO: Solo el administrador puede modificar un nuevo usertype */
  updateUsertype: {
    type: userTypesSchema,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'El ID del registro a modificar.',
      },
      type: {
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
      const usertype = await models.usertypes.findById(args.id);
      if (usertype != null){
        var usertype_updated = await usertype.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          type        : (args.type        != null && args.type.trim()  != "" ) ? args.type.trim()        : usertype.type,
          description : (args.description != null)                             ? args.description.trim() : usertype.description,
          state       : (args.state       != null)                             ? args.state              : usertype.state     
        });
      }
      return usertype_updated;    
    }
  },

};