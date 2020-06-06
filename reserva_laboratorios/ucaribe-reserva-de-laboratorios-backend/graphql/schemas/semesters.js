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
  name: 'Semester',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(semester) {
          return semester.id;
        }
      },
      semester: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(semester) {
          return semester.semester;
        }
      },
      start_date: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(semester) {
          return semester.start_date;
        }
      },
      end_date: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(semester) {
          return semester.end_date;
        }
      },
      state: {
        type: new GraphQLNonNull(GraphQLBoolean),
        description: '',
        resolve(semester){
          return semester.state;
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(semester) {
          return new Date(semester.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(semester) {
          return new Date(semester.updatedAt).toString();
        }
      }
    };
  }
});