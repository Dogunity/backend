import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class CommunityPostLike extends Model {}

CommunityPostLike.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'communityPostLike',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export default CommunityPostLike;
