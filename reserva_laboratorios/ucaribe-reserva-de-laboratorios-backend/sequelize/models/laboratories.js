'use strict';

module.exports = function(sequelize, DataTypes) {
  let laboratories = sequelize.define('laboratories', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    building: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    room: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'laboratories',
  });
  
  laboratories.associate = (models) =>{
    // associations can be defined here
    models.users.hasMany(models.laboratories, { foreignKey: "user_id" } );
    models.schedule.belongsTo(models.laboratories, { foreignKey: "laboratory_id" } );
  };

  return laboratories;
};
