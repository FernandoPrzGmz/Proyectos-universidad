import { ModelAttributes, ModelOptions } from "sequelize/types";

export interface ModelExport {
  default: Model;
  modelAttributes: ModelAttributes;
  modelOptions: ModelOptions;
  [x:string]: any;
}
export interface Model {
  init: Function;
  associate: Function;
}