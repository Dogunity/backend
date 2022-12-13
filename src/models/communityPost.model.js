import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class CommunityPost extends Model {}

CommunityPost.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: 'id',
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likeCnt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    images: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    tableName: 'communityPosts',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export default CommunityPost;
