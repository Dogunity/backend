import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class RefreshToken extends Model {}

RefreshToken.init(
  {
    token: {
      type: DataTypes.STRING,
    },
    expiryDate: {
      type: DataTypes.DATE,
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
