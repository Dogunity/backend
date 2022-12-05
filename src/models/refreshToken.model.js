import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class RefreshToken extends Model {}

RefreshToken.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'refreshTokens',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export default RefreshToken;
