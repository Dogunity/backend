import {
  CommunityComment,
  CommunityPost,
  CommunityPostLike,
  User,
} from '../models';
import ApiError from '../utils/ApiError';

const apiError = new ApiError();

export default {
  async createComment(userId, id, description) {
    if (!id) throw apiError.setBadRequest('Post ID is required.');
    if (!description)
      throw apiError.setBadRequest('Comment description is required.');

    return CommunityComment.create({
      description,
      communityPostId: id,
      userId,
    });
  },

  async getComments(id) {
    if (!id) throw apiError.setBadRequest('Post ID is required.');

    const foundComments = await CommunityComment.findAll({
      where: { communityPostId: id },
      order: [['createdAt', 'DESC']],
      raw: true,
    });

    await Promise.all(
      foundComments.map(async (comment) => {
        const userId = comment.userId;
        const userInfo = await User.findOne({
          where: { id: userId },
          attributes: ['id', 'email', 'nickname', 'profileImg'],
          raw: true,
        });
        comment.userInfo = userInfo;
      }),
    );

    return foundComments;
  },

  async deleteComment(userId, id, commentId) {
    if (!userId) throw apiError.setBadRequest('User ID is required');
    if (!id) throw apiError.setBadRequest('Post ID is required.');
    if (!commentId) throw apiError.setBadRequest('Comment ID is required.');

    const foundComment = await CommunityComment.findOne({
      where: { id: commentId, communityPostId: id },
    });

    if (foundComment.userId !== userId)
      throw apiError.setForbidden('Only the writer could delete the comment.');

    await CommunityComment.destroy({
      where: { id: commentId, communityPostId: id, userId },
    });
  },

  async likePost(userId, id) {
    if (!userId) throw apiError.setBadRequest('User ID is required');
    if (!id) throw apiError.setBadRequest('Post ID is required.');

    const isLikeHistoryExist = await CommunityPostLike.findOne({
      where: { UserId: userId, CommunityPostId: id },
    });

    if (isLikeHistoryExist)
      throw apiError.setBadRequest('This user already liked the post.');

    const foundPost = await CommunityPost.findOne({ where: { id } });

    if (!foundPost)
      throw apiError.setBadRequest('Post with that ID does not exist.');

    await foundPost.increment('likeCnt');

    return CommunityPostLike.create({ UserId: userId, CommunityPostId: id });
  },

  async cancelLikePost(userId, id) {
    if (!userId) throw apiError.setBadRequest('User ID is required');
    if (!id) throw apiError.setBadRequest('Post ID is required.');

    const isLikeHistoryExist = await CommunityPostLike.findOne({
      where: { UserId: userId, CommunityPostId: id },
    });

    if (!isLikeHistoryExist)
      throw apiError.setBadRequest('This user did not LIKE the post.');

    await CommunityPostLike.destroy({
      where: { UserId: userId, CommunityPostId: id },
    });

    const foundPost = await CommunityPost.findOne({ where: { id } });

    if (!foundPost)
      throw apiError.setBadRequest('Post with that ID does not exist.');

    if (!foundPost.likeCnt)
      throw apiError.setBadRequest('Like count cannot be a minus value.');

    return foundPost.decrement('likeCnt');
  },
};
