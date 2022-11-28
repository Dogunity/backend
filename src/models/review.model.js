import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class Review extends Model {}

Review.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    images: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'reviews',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export default Review;
