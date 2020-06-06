'use strict';

const {
  GraphQLObjectType,
  GraphQLSchema
} = require('graphql');

const queries   = require('./queries/'),
      mutations = require('./mutations/');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name:   'Query',
    fields: queries
  }),
  
  mutation: new GraphQLObjectType({
    name:   'Mutation',
    fields: mutations
  })
});
