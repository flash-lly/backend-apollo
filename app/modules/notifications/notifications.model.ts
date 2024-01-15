import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequelize';

export class NotificationModel extends Model {}

NotificationModel.init(
  {
    idnotifications: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    client_nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_read: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    modelName: 'notification',
    sequelize,
  },
);

interface NotificationAttributes {
  idnotifications: string;
  date: string;
  client_nom: string;
  client_prenom: string;
  mail: string;
  agent: string;
  action: string;
  order_id: string;
  is_read: number;
}

interface NotificationOptionalAttributes
  extends Optional<NotificationAttributes, 'idnotifications'> {}

export interface NotificationInstance
  extends Model<NotificationAttributes, NotificationOptionalAttributes>,
    NotificationAttributes {}
