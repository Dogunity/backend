import ChatLog from './chatLog.model';
import Community from './community.model';
import CommunityComment from './communityComment.model';
import CommunityImage from './communityImage.model';
import CommunityPost from './communityPost.model';
import User from './user.model';
import UserCommunity from './userCommunity.model';
import RefreshToken from './refreshToken.model';

// Model association

// User-CommuntyPost 1:N
User.hasMany(CommunityPost, { foreignKey: 'userId', sourceKey: 'id' });
CommunityPost.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

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

export {
  ChatLog,
  Community,
  CommunityComment,
  CommunityImage,
  CommunityPost,
  User,
  UserCommunity,
  RefreshToken,
};
