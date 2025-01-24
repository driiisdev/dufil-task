import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './userModel';

export class Book extends Model {
  public id!: string;
  public userId!: string;
  public title!: string;
  public author!: string;
  public isPublic!: boolean;
  public readingStatus!: 'read' | 'reading' | 'want-to-read';
  public rating!: string | null;
  public comment!: string | null;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    readingStatus: {
      type: DataTypes.ENUM('read', 'reading', 'want-to-read'),
      allowNull: false
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'books',
  }
);

Book.belongsTo(User, { foreignKey: 'userId' });
