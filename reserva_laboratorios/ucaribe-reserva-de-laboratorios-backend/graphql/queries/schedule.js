'use strict';

const {
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql');

const models = require('../../sequelize/models/'),
      scheduleSchema = require('../schemas/schedule');

module.exports = {
  select_Schedule: {
    type: new GraphQLList(scheduleSchema),
    args:{
      subject4semester_id : { type: GraphQLID},
      laboratory_id       : { type: GraphQLID},
      date                : { type: GraphQLString},
      // offset: {
      //   type: GraphQLInt,
      // },
      // first: {
      //   type: GraphQLInt,
      //   description: 'Limits the number of results returned in the page. Defaults to 10.',
      // }
    },
    resolve(root, args) {
      // const offset = args.offset || 0;
      // const limit  = args.first  || 10;
      delete args.offset;
      delete args.first;
      
      return models.schedule.findAll({
        where: args,
        // offset,
        // limit,
      });
    }
  },

  
  select_Schedule_ByLaboratoryANDRange: {
    type: new GraphQLList(scheduleSchema),
    args:{
      laboratory_id       : { type: GraphQLID},
      start_date          : { type: GraphQLString, description: 'YYYY-MM-DD'},
      end_date            : { type: GraphQLString, description: 'YYYY-MM-DD'},   
    },
    resolve(root, args) {
      return models.schedule.findAll({
        where: {
          laboratory_id: args.laboratory_id,
          date: {
            [models.Sequelize.Op.between]: [args.start_date, args.end_date]
          },
        },
      });
    }
  },

  
};