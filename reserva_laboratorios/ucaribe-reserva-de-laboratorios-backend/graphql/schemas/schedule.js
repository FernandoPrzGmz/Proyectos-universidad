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

const models = require ('../../sequelize/models/'),
      subjectSchema    = require('./subjects4semester'),
      laboratorySchema = require('./laboratories'),
      requestSchema    = require('./requests');

module.exports = new GraphQLObjectType({
  name: 'Schedule',
  description: '',
  fields () {
    return {
      id: { 
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(schedule) {
          return schedule.id;
        }
      },
      date: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(schedule) {
          return schedule.date;
        }
      },
      start_hour: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(schedule){
          return schedule.start_hour;
        }
      },
      end_hour: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(schedule){
          return schedule.end_hour;
        }
      },
      state: {
        type: new GraphQLNonNull(GraphQLBoolean),
        description: '',
        resolve(schedule){
          return schedule.state;
        }
      },
      subject: {
        type: new GraphQLNonNull(subjectSchema),
        description: '',
        resolve (schedule) {
          return models.subjects4semester.findById(schedule.subject4semester_id);
        }
      },
      laboratory: {
        type: new GraphQLNonNull(laboratorySchema),
        description: '',
        resolve (schedule) {
          return models.laboratories.findById(schedule.laboratory_id);
        }
      },
      extra_data: {
        type: new GraphQLNonNull(requestSchema),
        description: '',
        resolve (schedule) {
          return models.requests.findById(schedule.request_id);
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(schedule) {
          return new Date(schedule.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(schedule) {
          return new Date(schedule.updatedAt).toString();
        }
      }
    };
  }
});