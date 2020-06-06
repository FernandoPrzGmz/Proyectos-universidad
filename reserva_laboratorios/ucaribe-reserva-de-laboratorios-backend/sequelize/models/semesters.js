'use strict';

module.exports = function(sequelize, DataTypes) {
  let semester = sequelize.define('semesters', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    semester: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
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
    tableName: 'semesters',
  });

  semester.associate = (models) =>{
    // associations can be defined here
    models.subjects4semester.belongsTo(models.semesters, { foreignKey: "semester_id" } );
  };

  return semester;
};
