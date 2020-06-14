import { Sequelize, DataTypes, ModelAttributes, ModelOptions, Association } from "sequelize";
import AbstractModel, { abstractModelAttributes, abstractModelOptions } from "../libs/classes/AbstractSequelizeModel.class";
import { Publication } from "./Publication.model";
import { User } from "./User.model";

export default {
  init: (sequelize: Sequelize): void => {
    PublicationComment.init(modelAttributes, { ...modelOptions, sequelize });
  },
  associate: (): void => {
    PublicationComment.belongsTo(Publication, {
      targetKey:  'PublicationID',
      foreignKey: 'PublicationID',
      as:         'Comments'
    });
    PublicationComment.hasOne(User, {
      sourceKey:  'UserID',
      foreignKey: 'UserID',
      as:         'CommentOwner'
    });
  }
}

export class PublicationComment extends AbstractModel {
  public PublicationCommentID!: number; // Note that the `null assertion` `!` is required in strict mode.
  public UserID!: number;
  public PublicationID!: number;
  public Comment!: string;

  public static associations: {
    CommentOwner: Association<PublicationComment, User>;
  };
}

export const modelAttributes: ModelAttributes = {
  ...abstractModelAttributes,
  PublicationCommentID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  PublicationID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  Comment: {
    type: new DataTypes.STRING(45),
    allowNull: false
  }
};

export const modelOptions: ModelOptions = {
  ...abstractModelOptions,
  tableName: 'PublicationComment'
};
