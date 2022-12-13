import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'email',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'nickname',
    },
    profileImg: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:
        'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png',
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'users',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export default User;
