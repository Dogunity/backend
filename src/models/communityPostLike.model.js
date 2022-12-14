import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class CommunityPostLike extends Model {}

CommunityPostLike.init(
  {},
  {
    sequelize,
    tableName: 'communityPostLike',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export default CommunityPostLike;
