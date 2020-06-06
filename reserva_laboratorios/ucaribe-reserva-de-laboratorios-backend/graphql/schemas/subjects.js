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
  name: 'Subject',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(subjec) {
          return subjec.id;
        }
      },
      enrollment: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(subjec) {
          return subjec.enrollment;
        }
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(subjec) {
          return subjec.name;
        }
      },
      state: {
        type: new GraphQLNonNull(GraphQLBoolean),
        description: '',
        resolve(subjec){
          return subjec.state;
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(subject) {
          return new Date(subject.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(subject) {
          return new Date(subject.updatedAt).toString();
        }
      }
    };
  }
});