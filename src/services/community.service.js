import {
  Community,
  UserCommunity,
  CommunityPost,
  CommunityImage,
} from '../models';
import ApiError from '../utils/ApiError';
import { COMMUNITY_PER_PAGE } from '../utils/constants';
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

  async createCommunity(userId, name, communityImage, introduction) {
    if (!userId) throw apiError.setBadRequest('User token is required.');
    if (!name || !introduction)
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
      communityImage,
      introduction,
    });
  },

  async updateCommunity(userId, id, name, communityImage, introduction) {
    if (!userId) throw apiError.setBadRequest('User token is required.');
    if (!id) throw apiError.setBadRequest('Community ID is required.');
    if (!name || !introduction)
      throw apiError.setBadRequest('All fields are required.');

    await this.checkCommunityOwner(userId);

    await Community.update(
      { name, communityImage, introduction },
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

    const createdPost = await CommunityPost.create({
      id: uuidv4(),
      userId,
      communityId: id,
      description,
    });

    await CommunityImage.create({ images, communityPostId: createdPost.id });
  },
};
