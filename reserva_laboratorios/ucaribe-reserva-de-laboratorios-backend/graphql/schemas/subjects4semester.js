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
      userSchema     = require('./users'),
      subjectSchema  = require('./subjects'),
      semesterSchema = require('./semesters');

module.exports = new GraphQLObjectType({
  name: 'SubjectForSemerter',
  description: '',
  fields () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: '',
        resolve(subject4semerter) {
          return subject4semerter.id;
        }
      },
      section: {
        type: new GraphQLNonNull(GraphQLInt),
        description: '',
        resolve(subject4semerter) {
          return subject4semerter.section;
        }
      },
      state: {
        type: new GraphQLNonNull(GraphQLBoolean),
        description: '',
        resolve(subject4semerter){
          return subject4semerter.state;
        }
      },
      teacher: {
        type: new GraphQLNonNull(userSchema),
        description: '',
        resolve (subject4semerter) {
          return models.users.findById(subject4semerter.user_id,{
            attributes: {
              exclude: ['password']
            }}
          );
        }
      },
      subject: {
        type: new GraphQLNonNull(subjectSchema),
        description: '',
        resolve (subject4semerter) {
          return models.subjects.findById(subject4semerter.subject_id);
        }
      },
      semester: {
        type: new GraphQLNonNull(semesterSchema),
        description: '',
        resolve (subject4semerter) {
          return models.semesters.findById(subject4semerter.semester_id);
        }
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(subject4semerter) {
          return new Date(subject4semerter.createdAt).toString();
        }
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: '',
        resolve(subject4semerter) {
          return new Date(subject4semerter.updatedAt).toString();
        }
      }
      
    };
  }
});