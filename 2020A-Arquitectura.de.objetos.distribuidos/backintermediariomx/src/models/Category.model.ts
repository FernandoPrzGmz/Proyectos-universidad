import { Sequelize, DataTypes, ModelAttributes, ModelOptions } from "sequelize";
import AbstractModel, { abstractModelAttributes, abstractModelOptions } from "../libs/classes/AbstractSequelizeModel.class";

export default {
  init: (sequelize: Sequelize): void => {
    Category.init(modelAttributes, { ...modelOptions, sequelize });
  },
  associate: (): void => { }
}

export class Category extends AbstractModel {
  public CategoryID!: number;
  public Name!: string;
}

export const modelAttributes: ModelAttributes = {
  ...abstractModelAttributes,
  CategoryID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: new DataTypes.STRING(45),
    allowNull: false
  }
};

export const modelOptions: ModelOptions = {
  ...abstractModelOptions,
  tableName: 'Category'
};
