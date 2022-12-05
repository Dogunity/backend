import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class CommunityImage extends Model {}

CommunityImage.init(
  {
    images: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
