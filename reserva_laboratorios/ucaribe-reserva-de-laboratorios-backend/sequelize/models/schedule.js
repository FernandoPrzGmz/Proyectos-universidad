'use strict';

module.exports = function(sequelize, DataTypes) {
  let schedule = sequelize.define('schedule', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    start_hour: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_hour: {
      type: DataTypes.TIME,
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    subject4semester_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'subjects4semester',
        key: 'id'
      }
    },
    laboratory_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'laboratories',
        key: 'id'
      }
    },
    request_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'requests',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'schedule',
  });

  schedule.associate = (models) =>{
    // associations can be defined here
    models.laboratories.hasMany(models.schedule, { foreignKey: "laboratory_id" } );
    models.subjects4semester.hasMany(models.schedule, { foreignKey: "subject4semester_id" } );
    models.requests.hasMany(models.schedule, { foreignKey: "request_id" } );
  };
  
  return schedule;
};
