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
      userSchema = require('./users');

module.exports = new GraphQLObjectType({
  name: 'Laboratory',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(laboratory) {
          return laboratory.id;
        }
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(laboratory) {
          return laboratory.name;
        }
      },
      building: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(laboratory) {
          return laboratory.building;
        }
      },
      room: {
        type: GraphQLString,
        description: '',
        resolve(laboratory) {
          return laboratory.room;
        }
      },
      description: {
        type: GraphQLString,
        description: '',
        resolve(laboratory) {
          return laboratory.description;
        }
      },
      state: {
        type: new GraphQLNonNull(GraphQLBoolean),
        description: '',
        resolve(laboratory){
          return laboratory.state;
        }
      },
      user: {
        type: new GraphQLNonNull(userSchema),
        description: '',
        resolve (laboratory) {
          return models.users.findById(laboratory.user_id,{
            attributes: { exclude: ['password'] }}
          );
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(laboratory) {
          return new Date(laboratory.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(laboratory) {
          return new Date(laboratory.updatedAt).toString();
        }
      }
      
    };
  }
});