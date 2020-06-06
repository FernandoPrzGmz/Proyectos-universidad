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
      requestsSchema = require('../schemas/requests');

module.exports = {
  select_Requests: {
    type: new GraphQLList(requestsSchema),
    args:{
      // id:       { type: GraphQLID },
      // name:     { type: GraphQLString },
      // building: { type: GraphQLString },
      // state:    { type: GraphQLBoolean},
      
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
      
      return models.requests.findAll({
        where: args,
        offset,
        limit,
      });
    }
  },

};