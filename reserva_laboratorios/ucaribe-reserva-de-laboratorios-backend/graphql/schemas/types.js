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
  name: 'Type',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(type) {
          return type.id;
        }
      },
      type: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(type) {
          return type.type;
        }
      },
      description: {
        type: GraphQLString,
        description: '',
        resolve(type) {
          return type.description;
        }
      },
      color: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'En hexadecimal',
        resolve(type) {
          return type.color;
        }
      },
      state: {
        type: new GraphQLNonNull(GraphQLBoolean),
        description: '',
        resolve(type){
          return type.state;
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(type) {
          return new Date(type.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(type) {
          return new Date(type.updatedAt).toString();
        }
      }
    };
  }
});