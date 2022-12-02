import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class ChatLog extends Model {}

ChatLog.init(
  {
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    logDate: DataTypes.DATE,
    logTime: DataTypes.DATE,
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'chatLogs',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export default ChatLog;
