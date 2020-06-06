'use strict';

module.exports = function(sequelize, DataTypes) {
  let statuses = sequelize.define('statuses', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING(45),
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
    tableName: 'statuses',
  });

  statuses.associate = (models) =>{
    // associations can be defined here
    models.requests.belongsTo(models.statuses, { foreignKey: "status_id" } );
  };
  
  return statuses;
};
