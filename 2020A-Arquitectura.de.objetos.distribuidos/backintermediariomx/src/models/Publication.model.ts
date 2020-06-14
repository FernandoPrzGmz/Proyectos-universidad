//#region imports
import { Sequelize, DataTypes, ModelAttributes, ModelOptions, Association } from "sequelize";
import AbstractModel, { abstractModelAttributes, abstractModelOptions } from "../libs/classes/AbstractSequelizeModel.class";
import { User } from "./User.model";
import { PublicationComment } from "./PublicationComment.model";
import { Booking } from "./Booking.model";
//#endregion

export default {
  init: (sequelize: Sequelize): void => {
    Publication.init(modelAttributes, { ...modelOptions, sequelize });
  },
  associate: (): void => {
    Publication.hasOne(User, {
      sourceKey:  'UserID',
      foreignKey: 'UserID',
      as:         'PublicationOwner'
    });
    
    Publication.hasMany(PublicationComment, {
      sourceKey:  'PublicationID',
      foreignKey: 'PublicationID',
      as:         'Comments'
    });

    Publication.belongsTo(Booking, {
      targetKey:  'PublicationID',
      foreignKey: 'PublicationID',
      as:         'Publication'
    });
  }
}

export class Publication extends AbstractModel {
  public PublicationID!: number; // Note that the `null assertion` `!` is required in strict mode.
  public Folio!: string;
  public UserID!: number;
  public Published!: boolean;
  public Cover!: string | null;
  public Title!: string;
  public Details!: string | null;
  public EventDate!: Date;
  public Price!: number;

  public static associations: {
    PublicationOwner: Association<Publication, User>;
    Comments: Association<Publication, PublicationComment>;
  };
}

export const modelAttributes: ModelAttributes = {
  ...abstractModelAttributes,
  PublicationID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  Folio: {
    type: new DataTypes.STRING(45),
    allowNull: false
  },
  UserID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  Published: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  Cover: {
    type: new DataTypes.STRING(45),
    allowNull: true
  },
  Title: {
    type: new DataTypes.STRING(45),
    allowNull: false
  },
  Details: {
    type: new DataTypes.STRING(45),
    allowNull: true
  },
  EventDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
};

export const modelOptions: ModelOptions = {
  ...abstractModelOptions,
  tableName: 'Publication'
};
