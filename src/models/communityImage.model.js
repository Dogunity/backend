import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class CommunityImage extends Model {}

CommunityImage.init(
  {
    imageName1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'communityImages',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export default CommunityImage;
