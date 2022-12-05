import ChatLog from './chatLog.model';
import Community from './community.model';
import CommunityComment from './communityComment.model';
import CommunityImage from './communityImage.model';
import CommunityPost from './communityPost.model';
import User from './user.model';
import UserCommunity from './userCommunity.model';
import RefreshToken from './refreshToken.model';

// Model association
// User-Community N:M
User.belongsToMany(Community, { through: UserCommunity, unique: false });
Community.belongsToMany(User, { through: UserCommunity, unique: false });

// User-CommuntyPost 1:N
User.hasMany(CommunityPost, { foreignKey: 'userId', sourceKey: 'userId' });
Community.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });

// Community-CommuntyPost 1:N
Community.hasMany(CommunityPost, {
  foreignKey: 'communityId',
  sourceKey: 'id',
});
CommunityPost.belongsTo(Community, {
  foreignKey: 'communityId',
  targetKey: 'id',
});

// CommunityPost-CommunityImage 1:N
CommunityPost.hasMany(CommunityImage, {
  foreignKey: 'communityPostId',
  sourceKey: 'id',
});
CommunityImage.belongsTo(CommunityPost, {
  foreignKey: 'communityPostId',
  targetKey: 'id',
});

// CommunityPost-CommunityComment 1:N
CommunityPost.hasMany(CommunityComment, {
  foreignKey: 'communityPostId',
  sourceKey: 'id',
});
CommunityComment.belongsTo(CommunityPost, {
  foreignKey: 'communityPostId',
  targetKey: 'id',
});

// User-RefreshToken 1:1
User.hasOne(RefreshToken, { foreignKey: 'userId', sourceKey: 'id' });
RefreshToken.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

// ChatLog TBD
// User-ChatLog N:M
// User.belongsToMany(ChatLog, { through: 'UserChatLog', unique: false });
// ChatLog.belongsToMany(User, { through: 'UserChatLog', unique: false });
// User-ChatLog 1:N
// ChatLog-Community 1:1

export {
  ChatLog,
  Community,
  CommunityComment,
  CommunityImage,
  CommunityPost,
  User,
};
