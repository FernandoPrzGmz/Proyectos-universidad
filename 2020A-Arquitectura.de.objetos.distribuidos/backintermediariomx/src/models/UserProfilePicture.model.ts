import { Sequelize, DataTypes, ModelAttributes, ModelOptions, Association } from "sequelize";
import AbstractModel, { abstractModelAttributes, abstractModelOptions } from "../libs/classes/AbstractSequelizeModel.class";
import { User } from "./User.model";

export default {
  init: (sequelize: Sequelize) => {
    UserProfilePicture.init(modelAttributes, { ...modelOptions, sequelize });
  },
  associate: () => {
    UserProfilePicture.belongsTo(User, {
      targetKey:  'UserID',
      foreignKey: 'UserID',
      as:         'User'
    });
  }
}

export class UserProfilePicture extends AbstractModel {
  public UserProfilePictureID!: number;
  public UserID!: number;
  public Path!: string;
  public Size!: string;
  
  public static associations: {
    User: Association<UserProfilePicture, User>;
  };
}

export const modelAttributes: ModelAttributes = {
  ...abstractModelAttributes,
  UserProfilePictureID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  Path: {
    type: new DataTypes.STRING(45),
    allowNull: false
  },
  Size: {
    type: new DataTypes.STRING(45),
    allowNull: false
  }
};

export const modelOptions: ModelOptions = {
  ...abstractModelOptions,
  tableName: 'UserProfilePicture'
};
