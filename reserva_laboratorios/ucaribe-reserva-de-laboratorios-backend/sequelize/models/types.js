'use strict';

module.exports = function(sequelize, DataTypes) {
  let types = sequelize.define('types', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(7),
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
    tableName: 'types',
  });

  types.associate = (models) =>{
    // associations can be defined here
    models.requests.belongsTo(models.types, { foreignKey: "type_id" } );
  };

  return types;
};
