import { Community, UserCommunity, CommunityPost } from '../models';
import ApiError from '../utils/ApiError';
import { COMMUNITY_PER_PAGE, FEED_PER_PAGE } from '../utils/constants';
import { v4 as uuidv4 } from 'uuid';

const apiError = new ApiError();

export default {
  async countCommunityPage() {
    const totalCommunityCount = await Community.count();
    if (totalCommunityCount % COMMUNITY_PER_PAGE === 0)
      return totalCommunityCount / COMMUNITY_PER_PAGE;
    return Math.floor(totalCommunityCount / COMMUNITY_PER_PAGE) + 1;
  },

  async getSelectedCommunities(page, order) {
    if (!page) throw apiError.setBadRequest('Page number is required.');
    if (!order) throw apiError.setBadRequest('Ordering type is required.');

    const selectedCommunities = await Community.findAll({
      offset: (page - 1) * COMMUNITY_PER_PAGE,
      limit: COMMUNITY_PER_PAGE,
      order: [[order, 'DESC']],
    });
    return selectedCommunities;
  },

  async createCommunity(userId, name, location, introduction) {
    if (!userId) throw apiError.setBadRequest('User token is required.');
    if (!name || !location || !introduction)
      throw apiError.setBadRequest('All fields are required.');

    const communityId = uuidv4();

    await UserCommunity.create({
      owner: true,
      userId,
      communityId,
    });

    await Community.create({
      communityId,
      name,
      communityImage: location,
      introduction,
    });
  },

  async updateCommunity(userId, id, name, location, introduction) {
    if (!userId) throw apiError.setBadRequest('User token is required.');
    if (!id) throw apiError.setBadRequest('Community ID is required.');
    if (!name || !location || !introduction)
      throw apiError.setBadRequest('All fields are required.');

    await this.checkCommunityOwner(userId);

    await Community.update(
      { name, communityImage: location, introduction },
      { where: { id } },
    );
  },

  async removeCommunity(userId, id) {
    if (!userId) throw apiError.setBadRequest('User token is required.');
    if (!id) throw apiError.setBadRequest('Community ID is required.');

    await this.checkCommunityOwner(userId);

    await Community.destroy({ where: { id } });
  },

  async checkCommunityOwner(userId) {
    const isCommunityOwner = await UserCommunity.findOne({
      where: { owner: true, userId },
    });

    if (!isCommunityOwner)
      throw apiError.setBadRequest(
        'Only the community owner could change the contents.',
      );
  },

  async findCommunityWithID(id) {
    if (!id) throw apiError.setBadRequest('Commmunity ID is required.');

    const foundCommunity = await Community.findOne({
      where: { id },
    });

    if (!foundCommunity)
      throw apiError.setBadRequest('Community with the ID does not exist.');

    return foundCommunity;
  },

  async likeCommunity(userId, id) {
    if (!userId) throw apiError.setBadRequest('User token is required.');
    if (!id) throw apiError.setBadRequest('Community ID is required');

    const foundCommunity = await this.findCommunityWithID(id);

    const isLikeHistoryExist = await UserCommunity.findOne({
      where: { userId, communityId: foundCommunity.communityId },
    });

    if (isLikeHistoryExist)
      throw apiError.setBadRequest('This user already liked the community.');

    await UserCommunity.create({
      userId,
      communityId: foundCommunity.communityId,
    });

    await foundCommunity.increment('likeCnt');
  },

  async cancelLikeCommunity(userId, id) {
    if (!userId) throw apiError.setBadRequest('User token is required.');
    if (!id) throw apiError.setBadRequest('Community ID is required');

    const foundCommunity = await this.findCommunityWithID(id);

    await UserCommunity.destroy({
      where: { userId, communityId: foundCommunity.communityId },
    });

    if (!foundCommunity.likeCnt)
      throw apiError.setBadRequest('Like count cannot be a minus value.');

    await foundCommunity.decrement('likeCnt');
  },

  async createPost(userId, id, images, description) {
    if (!userId) throw apiError.setBadRequest('User ID is required');
    if (!id) throw apiError.setBadRequest('Community ID is required.');
    if (!images || !description)
      throw apiError.setBadRequest('All fields are required.');

    images = images.map((image) => image.location);

    return CommunityPost.create({
      id: uuidv4(),
      description,
      images,
      userId,
      communityId: id,
    });
  },

  async countFeedPage(id, page) {
    const totalPosts = await CommunityPost.count({
      where: { communityId: id },
    });

    if (totalPosts % FEED_PER_PAGE === 0) return totalPosts / FEED_PER_PAGE;
    return Math.floor(totalPosts / FEED_PER_PAGE) + 1;
  },

  async selectedPosts(id, page) {
    const foundPosts = await CommunityPost.findAll({
      where: { communityId: id },
      offset: (page - 1) * FEED_PER_PAGE,
      limit: FEED_PER_PAGE,
      order: [['createdAt', 'DESC']],
    });

    return foundPosts;
  },

  async getPost(id, postId) {
    if (!id) throw apiError.setBadRequest('Community ID is required.');
    if (!postId) throw apiError.setBadRequest('Post ID is required.');

    return CommunityPost.findOne({ where: { communityId: id, id: postId } });
  },
};
