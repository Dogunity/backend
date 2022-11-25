import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class CommunityPost extends Model {}

CommunityPost.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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
