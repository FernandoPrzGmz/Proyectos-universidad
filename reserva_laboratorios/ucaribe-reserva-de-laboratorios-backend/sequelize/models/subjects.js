'use strict';

module.exports = function(sequelize, DataTypes) {
  let subjects = sequelize.define('subjects', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    enrollment: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    state: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
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
    tableName: 'subjects',
  });
  
  subjects.associate = (models) =>{
    // associations can be defined here
    models.subjects4semester.belongsTo(models.subjects, { foreignKey: "subject_id" } );
  };
  
  return subjects;
};
