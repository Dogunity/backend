import ChatLog from './chatLog.model';
import Community from './community.model';
import CommunityComment from './communityComment.model';
import CommunityImage from './communityImage.model';
import CommunityPost from './communityPost.model';
import Review from './review.model';
import ReviewComment from './reviewComment.model';
import User from './user.model';
import UserCommunity from './userCommunity.model';

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
  foreignKey: 'communityId',
  sourceKey: 'id',
});
CommunityImage.belongsTo(CommunityPost, {
  foreignKey: 'communityId',
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

// User-Review N:M
User.belongsToMany(Review, { through: 'reviewLikes', unique: false });
Review.belongsToMany(User, { through: 'reviewLikes', unique: false });

// User-Review 1:N
User.hasMany(Review, { foreignKey: 'userId', sourceKey: 'id' });
Review.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

// Review-ReviewComment 1:N
Review.hasMany(ReviewComment, { foreignKey: 'reviewId', sourceKey: 'id' });
ReviewComment.belongsTo(Review, { foreignKey: 'reviewId', targetKey: 'id' });

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
  Review,
  ReviewComment,
  User,
};
