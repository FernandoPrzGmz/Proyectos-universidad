'use strict';

module.exports = function(sequelize, DataTypes) {
  let requests = sequelize.define('requests', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date_request: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_update: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'types',
        key: 'id'
      }
    },
    status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'statuses',
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
    tableName: 'requests',
  });

  requests.associate = (models) =>{
    // associations can be defined here
    models.types.hasMany(models.requests, { foreignKey: "type_id" } );
    models.statuses.hasMany(models.requests, { foreignKey: "status_id" } );
    models.schedule.belongsTo(models.requests, { foreignKey: "request_id" } );
  };

  return requests;
};
