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
      typeSchema = require('../schemas/types');

module.exports = {
  /* TODO: Solo el administrador puede añadir una tipo de reservacion */
  createType: {
    type: typeSchema,
    args: {
      type: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
      },
      description: {
        type: GraphQLString,
        description: '',
      },
      color: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'En hexadecimal',
      },
    },
    resolve: async(root, args) =>{
      /** El metodo findOrCreate nos regresa un arreglo donde la posicion 0 es el resultado y la posicion 1 regresa un booleano
       *  http://docs.sequelizejs.com/manual/tutorial/models-usage.html#-findorcreate-search-for-a-specific-element-or-create-it-if-not-available 
       */
      const typeCreated = await models.types.findOrCreate({
        where: { [Op.or]:[
          { type  : args.type.trim() },
          { color : args.color.trim() }
        ]},
        defaults: {
          type        : (args.type        != null && args.type.trim()        != "") ? args.type.trim()        : null,
          description : (args.description != null && args.description.trim() != "") ? args.description.trim() : null,
          color       : (args.color       != null && args.color.trim()       != "") ? args.color.trim()       : null,
          state       : true
        }
      });
      return typeCreated[0];
    }
  },
  
  /* TODO: Solo el administrador puede modificar una tipo de reservacion */
  updateType: {
    type: typeSchema,
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
      color: {
        type: GraphQLString,
        description: 'En hexadecimal',
      },
      state: {
        type: GraphQLBoolean,
        description: '',
      },
    },
    resolve: async(root, args) =>{
      const type = await models.types.findById(args.id);
      if (type != null){
        var type_updated = await type.update({
          // Si las entradas llegan vacias o son null dejamos su valor anterior
          type        : (args.type        != null && args.type.trim()  != "" ) ? args.type.trim()        : type.type,
          color       : (args.color       != null && args.color.trim() != "" ) ? args.color.trim()       : type.color,
          description : (args.description != null)                             ? args.description.trim() : type.description,
          state       : (args.state       != null)                             ? args.state              : type.state     
        });
      }
      return type_updated;    
    }
  },
};