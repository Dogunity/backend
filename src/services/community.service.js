import { Community, User, UserCommunity } from '../models';
import ApiError from '../utils/ApiError';
import { COMMUNITY_PER_PAGE } from '../utils/constants';
import { v4 as uuidv4 } from 'uuid';

const apiError = new ApiError();

export default {
  async countCommunityPage() {
    const totalCommunityCount = await Community.count();
    if (totalCommunityCount % COMMUNITY_PER_PAGE === 0)
      return totalCommunityCount / COMMUNITY_PER_PAGE;
    else return Math.floor(totalCommunityCount / COMMUNITY_PER_PAGE) + 1;
  },

  async getSelectedCommunities(page) {
    if (!page) throw apiError.setBadRequest('Page number is required.');
    const selectedCommunities = await Community.findAll({
      offset: (page - 1) * COMMUNITY_PER_PAGE,
      limit: COMMUNITY_PER_PAGE,
      order: [['createdAt', 'DESC']],
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

  async updateCommunity(id, name, communityImage, introduction) {
    if (!id) throw apiError.setBadRequest('Community ID is required.');
    if (!name || !introduction)
      throw apiError.setBadRequest('All fields are required.');
    await Community.update(
      { name, communityImage, introduction },
      { where: { id } },
    );
  },

  async removeCommunity(id) {
    if (!id) throw apiError.setBadRequest('Community ID is required.');
    await Community.destroy({ where: { id } });
  },

  async likeCommunity(userId, communityId) {
    if (!userId) throw apiError.setBadRequest('User token is required.');
    if (!communityId) throw apiError.setBadRequest('Community ID is required');

    await UserCommunity.create({ userId, communityId });
  },
};
