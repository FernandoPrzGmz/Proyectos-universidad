'use strict';

const {
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,

  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Status',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(status) {
          return status.id;
        }
      },
      status: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(status) {
          return status.status;
        }
      },
      description: {
        type: GraphQLString,
        description: '',
        resolve(status) {
          return status.description;
        }
      },
      state: {
        type: new GraphQLNonNull(GraphQLBoolean),
        description: '',
        resolve(status){
          return status.state;
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(status) {
          return new Date(status.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(status) {
          return new Date(status.updatedAt).toString();
        }
      }
    };
  }
});