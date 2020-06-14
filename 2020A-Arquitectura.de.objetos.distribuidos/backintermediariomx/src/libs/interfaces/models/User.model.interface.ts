import { AbstractModel } from "./AbstractModel.interface";

export interface UserDB extends AbstractModel {
  UserID:     number;
	FistName:   string;
	LastName:   string;
	Password:   string;
	Biography?: string;
	City?:      string;
	Country:    string;
}