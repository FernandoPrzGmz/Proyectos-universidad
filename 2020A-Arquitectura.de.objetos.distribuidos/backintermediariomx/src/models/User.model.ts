//#region imports
import { Sequelize, DataTypes, ModelAttributes, ModelOptions, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from "sequelize";
import AbstractModel, { abstractModelAttributes, abstractModelOptions } from "../libs/classes/AbstractSequelizeModel.class";
import { UserContact } from "./UserContact.model";
import { UserProfilePicture } from "./UserProfilePicture.model";
import { Publication } from "./Publication.model";
import { PublicationComment } from "./PublicationComment.model";
import { Booking } from "./Booking.model";
//#endregion

export default {
  init: (sequelize: Sequelize): void => {
    User.init(modelAttributes, { ...modelOptions, sequelize });
  },
  associate: (): void => {
    User.hasMany(UserContact, {
      sourceKey:  'UserID',
      foreignKey: 'UserID',
      as:         'ContactList'
    });
    
    User.hasMany(UserProfilePicture, {
      sourceKey:  'UserID',
      foreignKey: 'UserID',
      as:         'ProfilePictureList'
    });
    
    User.belongsTo(Publication, {
      targetKey:  'UserID',
      foreignKey: 'UserID',
      as:         'PublicationOwner'
    });
    
    User.belongsTo(PublicationComment, {
      targetKey:  'UserID',
      foreignKey: 'UserID',
      as:         'CommentOwner'
    });

    User.belongsTo(Booking, {
      targetKey:  'UserID',
      foreignKey: 'UserID',
      as:         'BookingBuyer'
    });
  }

}

export class User extends AbstractModel {
  public UserID!: number;
  public FirstName!: string;
  public LastName!: string;
  public Password!: string;
  public Biography!: string | null;
  public Country!: string | null;
  public City!: string | null;

  public static associations: {
    ContactList: Association<User, UserContact>;
    ProfilePictureList: Association<User, UserProfilePicture>;
    PublicationOwner: Association<User, Publication>
    CommentOwner: Association<User, PublicationComment>
    BookingBuyer: Association<User,Booking>
  };
}

export const modelAttributes: ModelAttributes = {
  ...abstractModelAttributes,
  UserID: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  FirstName: {
    type: new DataTypes.STRING(45),
    allowNull: false
  },
  LastName: {
    type: new DataTypes.STRING(45),
    allowNull: false
  },
  Password: {
    type: new DataTypes.STRING(45),
    allowNull: false
  },
  Biography: {
    type: new DataTypes.STRING(45),
    allowNull: true
  },
  Country: {
    type: new DataTypes.STRING(45),
    allowNull: true
  },
  City: {
    type: new DataTypes.STRING(45),
    allowNull: true
  }
};

export const modelOptions: ModelOptions = {
  ...abstractModelOptions,
  tableName: 'User'
};
