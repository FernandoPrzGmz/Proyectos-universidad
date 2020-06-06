'use strict';

module.exports = function(sequelize, DataTypes) {
  let usertypes_has_permissions = sequelize.define('usertypes_has_permissions', {
    userTypes_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usertypes',
        key: 'id'
      }
    },
    permissions_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'permissions',
        key: 'id'
      }
    },
    state: {
      type: DataTypes.INTEGER(1),
      allowNull: false
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
    tableName: 'usertypes_has_permissions',
  });

  usertypes_has_permissions.associate = (models) =>{
    // associations can be defined here
  };

  return usertypes_has_permissions;
};
