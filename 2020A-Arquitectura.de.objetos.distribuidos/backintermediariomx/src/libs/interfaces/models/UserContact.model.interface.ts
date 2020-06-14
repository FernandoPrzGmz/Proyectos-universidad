import { AbstractModel } from "./AbstractModel.interface";

export interface UserContactDB extends AbstractModel {
  UserContactID: number;
  UserID:        number;
  Contact:       string;
  IsEmail:       boolean;
  IsPhoneNumber: boolean;
  IsMai:         boolean;
}