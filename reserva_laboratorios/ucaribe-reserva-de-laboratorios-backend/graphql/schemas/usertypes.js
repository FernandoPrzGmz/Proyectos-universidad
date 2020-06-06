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
  name: 'UserType',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(usertype) {
          return usertype.id;
        }
      },
      type: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(usertype) {
          return usertype.type;
        }
      },
      description: {
        type: GraphQLString,
        description: '',
        resolve(usertype) {
          return usertype.description;
        }
      },
      state: {
        type: new GraphQLNonNull(GraphQLBoolean),
        description: '',
        resolve(usertype) {
          return usertype.state;
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(usertype) {
          return new Date(usertype.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(usertype) {
          return new Date(usertype.updatedAt).toString();
        }
      }      
    };
  }
});