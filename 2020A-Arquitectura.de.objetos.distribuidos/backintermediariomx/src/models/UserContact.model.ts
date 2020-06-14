import { Sequelize, DataTypes, ModelAttributes, ModelOptions, Association } from "sequelize";
import AbstractModel, { abstractModelAttributes, abstractModelOptions } from "../libs/classes/AbstractSequelizeModel.class";
import { User } from "./User.model";

export default {
  init: (sequelize: Sequelize): void => {
    UserContact.init(modelAttributes, { ...modelOptions, sequelize });
  },
  associate: (): void => {
    UserContact.belongsTo(User, {
      targetKey:  'UserID',
      foreignKey: 'UserID',
      as:         'User'
    });
  }
}

export class UserContact extends AbstractModel {
  public UserContactID!: number;
  public UserID!: number;
  public Contact!: string;
  public IsEmail!: boolean | null;
  public IsPhoneNumber!: boolean | null;
  public IsMain!: boolean | null;

  public static associations: {
    User: Association<UserContact, User>;
  };
}

export const modelAttributes: ModelAttributes = {
  ...abstractModelAttributes,
  UserContactID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  Contact: {
    type: new DataTypes.STRING(45),
    allowNull: false
  },
  IsEmail: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  IsPhoneNumber: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  IsMain: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
};

export const modelOptions: ModelOptions = {
  ...abstractModelOptions,
  tableName: 'UserContact'
};
