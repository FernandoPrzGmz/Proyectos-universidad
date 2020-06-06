'use strict';

module.exports = function(sequelize, DataTypes) {
  let users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      scopes: ['self', 'public']
    },
    enrollment: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
      scopes: ['self', 'public']
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url_pp: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING(11),
      allowNull: true,
    },
    state_email: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
    },
    state: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
    },
    userType_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'usertypes',
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
    tableName: 'users',
  });

  users.associate = (models) =>{
    // associations can be defined here
    models.usertypes.hasMany(models.users, { foreignKey: "userType_id" } );
    models.laboratories.belongsTo(models.users, { foreignKey: "user_id" } );
    models.subjects4semester.belongsTo(models.users, { foreignKey: "user_id" } );
  };

  return users;
};
