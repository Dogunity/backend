import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class UserCommunity extends Model {}

UserCommunity.init(
  {
    owner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    communityId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'UserCommunty',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export default UserCommunity;
