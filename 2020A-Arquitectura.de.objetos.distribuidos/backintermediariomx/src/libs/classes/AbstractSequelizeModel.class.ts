import { Model, DataTypes, ModelAttributes, ModelOptions } from "sequelize";

export const abstractModelAttributes: ModelAttributes = {
  Status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  CreatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  UpdatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
};

export const abstractModelOptions: ModelOptions = {
  updatedAt: 'UpdatedAt',
  createdAt: 'CreatedAt'
};

export default abstract class AbstractModel extends Model {
  public Status!: boolean;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}
