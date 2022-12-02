import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class User extends Model {}

User.init(
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your email',
        },
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your password',
        },
      },
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Please enter your nickname',
        },
      },
    },
    profileImg: {
      type: DataTypes.STRING(2048),
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
