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
      userSchema = require('../schemas/users');

module.exports = {
  select_Users: {
    type: new GraphQLList(userSchema),
    args:{
      id:         { type: GraphQLID },
      enrollment: { type: GraphQLString },
      email:      { type: GraphQLString },
      first_name: { type: GraphQLString },
      last_name:  { type: GraphQLString },
      state:      { type: GraphQLBoolean},
      
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
      
      return models.users.findAll({
        attributes: {
          exclude: ['password']
        },

        where: args,
        offset,
        limit,
      });
    }
  },

};