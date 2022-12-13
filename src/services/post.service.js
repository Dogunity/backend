import { CommunityComment } from '../models';
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
};
