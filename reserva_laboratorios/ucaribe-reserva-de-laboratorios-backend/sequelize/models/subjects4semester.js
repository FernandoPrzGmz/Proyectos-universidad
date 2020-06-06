'use strict';

module.exports = function(sequelize, DataTypes) {
  let subjects4semester = sequelize.define('subjects4semester', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    section: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    subject_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'subjects',
        key: 'id'
      }
    },
    semester_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'semesters',
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
    tableName: 'subjects4semester',
  });

  subjects4semester.associate = (models) =>{
    // associations can be defined here
    models.users.hasMany(models.subjects4semester, { foreignKey: "user_id" } );
    models.subjects.hasMany(models.subjects4semester, { foreignKey: "subject_id" } );
    models.semesters.hasMany(models.subjects4semester, { foreignKey: "semester_id" } );
    models.schedule.belongsTo(models.subjects4semester, { foreignKey: "subject4semester_id" } );
  };

  return subjects4semester;
};
