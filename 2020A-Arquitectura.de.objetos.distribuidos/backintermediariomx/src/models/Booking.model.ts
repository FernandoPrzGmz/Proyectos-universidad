import { Sequelize, DataTypes, ModelAttributes, ModelOptions, Association } from "sequelize";
import AbstractModel, { abstractModelAttributes, abstractModelOptions } from "../libs/classes/AbstractSequelizeModel.class";
import { Publication } from "./Publication.model";
import { User } from "./User.model";

export default {
  init: (sequelize: Sequelize): void => {
    Booking.init(modelAttributes, { ...modelOptions, sequelize });
  },
  associate: (): void => {
    Booking.hasOne(Publication, {
      sourceKey:  'PublicationID',
      foreignKey: 'PublicationID',
      as:         'Publication'
    });
    Booking.hasOne(User, {
      sourceKey:  'UserID',
      foreignKey: 'UserID',
      as:         'BookingBuyer'
    });
  }
}

export class Booking extends AbstractModel {
  public BookingID!: number;
  public PublicationID!: number;
	public UserID!: number;
	public Folio!: string;
  public Total!: number;
  
  public static associations: {
    Publication: Association<Booking, Publication>;
    BookingBuyer: Association<Booking, User>;
  };
}

export const modelAttributes: ModelAttributes = {
  ...abstractModelAttributes,
  BookingID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  PublicationID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  UserID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  Folio: {
    type: new DataTypes.STRING(45),
    allowNull: false
  },
  Total: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
};

export const modelOptions: ModelOptions = {
  ...abstractModelOptions,
  tableName: 'Booking'
};
