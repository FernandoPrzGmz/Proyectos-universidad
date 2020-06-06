'use strict';

module.exports = function(sequelize, DataTypes) {
  let usertypes = sequelize.define('usertypes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'usertypes',
  });

  usertypes.associate = (models) =>{
    // associations can be defined here
    models.users.belongsTo(models.usertypes, { foreignKey: "userType_id" });
  };

  return usertypes;
};
