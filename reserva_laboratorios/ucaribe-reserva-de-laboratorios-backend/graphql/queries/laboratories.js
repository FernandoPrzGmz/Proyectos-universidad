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
  select_Laboratories: {
    type: new GraphQLList(laboratorySchema),
    args:{
      // Data of Laboratory
      id:       { type: GraphQLID },
      name:     { type: GraphQLString },
      building: { type: GraphQLString },
      state:    { type: GraphQLBoolean},
      
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
      
      return models.laboratories.findAll({
        where: args,
        offset,
        limit,
      });
    }
  },

  select_Laboratories_ByUser: {
    type: new GraphQLList(laboratorySchema),
    args:{
      // Data of User
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
      
      return models.laboratories.findAll({
        include: [{
          model: models.users,
          where: args,
        }],
        offset,
        limit,
      });
    }
  },
};