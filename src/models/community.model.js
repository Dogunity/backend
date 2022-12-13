import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class Community extends Model {}

Community.init(
  {
    communityId: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allownull: false,
    },
    communityImage: {
      type: DataTypes.STRING,
      defaultValue:
        'https://cdn.shopify.com/s/files/1/1089/1814/products/orca-bandana-square-428977.jpg?v=1634319724',
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likeCnt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'communities',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export default Community;
