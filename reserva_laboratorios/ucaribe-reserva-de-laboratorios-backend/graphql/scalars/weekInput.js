'use strict';

const {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require('graphql');

const daysEnumType = require('./daysEnumType');
module.exports = new GraphQLInputObjectType({
  name: 'WeekInput',
  description: '',
  fields () {
    return {
      day: {
        type: new GraphQLNonNull(daysEnumType),
        description: '',
      },
      start_hour: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'hh:mm:ss',
      },
      end_hour: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'hh:mm:ss',
      },
      laboratory_id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'ID del laboratorio',
      },

    };
  }
});
