import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class CommunityComment extends Model {}

CommunityComment.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'communityComments',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export default CommunityComment;
