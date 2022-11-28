import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class ReviewComment extends Model {}

ReviewComment.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'reviewComments',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export default ReviewComment;
