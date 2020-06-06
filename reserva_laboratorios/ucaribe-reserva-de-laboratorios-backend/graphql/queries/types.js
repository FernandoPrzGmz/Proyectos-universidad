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
      typeSchema = require('../schemas/types');

module.exports = {
  select_Types: {
    type: new GraphQLList(typeSchema),
    args:{
      id:    { type: GraphQLID },
      type:  { type: GraphQLString },
      color: { type: GraphQLString },
      state: { type: GraphQLBoolean},
      
      offset: {
        type: GraphQLInt,
      },
      first: {
        type: GraphQLInt,
        description: 'Limits the number of results returned in the page. Defaults to 10.',
      }
    },
    resolve(root, args) {
      const offset = args.offset || 0;
      const limit  = args.first  || 10;
      delete args.offset;
      delete args.first;
      
      return models.types.findAll({
        where: args,
        offset,
        limit,
      });
    }
  },

};