'use strict';
const {
  createUserAsTeacher,
  createUserAsTrainee,
  updateUser,
  updateUserPassword,
} = require('./users');
const {
  createUsertype,
  updateUsertype,
} = require('./usertypes');
const {
  createSemester,
  updateSemester,
} = require('./semesters');
const {
  createSubject,
  updateSubject,
} = require('./subjects');
const {
  createLaboratory,
  updateLaboratory,
} = require('./laboratories');
const {
  createStatus,
  updateStatus,
} = require('./statuses');
const {
  createType,
  updateType,
} = require('./types');
const {
  createSubjectForSemester,
  updateSubjectForSemester,
} = require('./subjects4semester');
const {
  createSchedulesAsSigmaa,
  createSchedulesAsSemester,
  createScheduleAsTemporal,
  updateSchedule,
} = require('./schedule');

module.exports = {
  // user
  createUserAsTeacher,
  createUserAsTrainee,
  updateUser,
  updateUserPassword,
  // usertype
  createUsertype,
  updateUsertype,
  // semester
  createSemester,
  updateSemester,
  // subject
  createSubject,
  updateSubject,
  // laboratory
  createLaboratory,
  updateLaboratory,
  // status
  createStatus,
  updateStatus,
  // type
  createType,
  updateType,
  // subjectForSemester
  createSubjectForSemester,
  updateSubjectForSemester,
  // schedule
  createSchedulesAsSigmaa,
  createSchedulesAsSemester,
  createScheduleAsTemporal,
  // updateSchedule,

};