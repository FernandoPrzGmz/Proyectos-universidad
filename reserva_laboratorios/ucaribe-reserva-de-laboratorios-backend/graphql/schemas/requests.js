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
      statusSchema = require('./statuses'),
      typesSchema  = require('./types');

module.exports = new GraphQLObjectType({
  name: 'Request',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(request) {
          return request.id;
        }
      },
      date_request: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(request) {
          return new Date(request.date_request).toString();
        }
      },
      date_update: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(request) {
          return new Date(request.date_update).toString();
        }
      },
      description: {
        type: GraphQLString,
        description: '',
        resolve(request) {
          return request.description;
        }
      },
      type: {
        type: new GraphQLNonNull(typesSchema),
        description: '',
        resolve (request) {
          return models.types.findById(request.type_id);
        }
      },
      status: {
        type: new GraphQLNonNull(statusSchema),
        description: '',
        resolve (request) {
          return models.statuses.findById(request.status_id);
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(request) {
          return new Date(request.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(request) {
          return new Date(request.updatedAt).toString();
        }
      }
    };
  }
});