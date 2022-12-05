import { Community } from '../models';
import ApiError from '../utils/ApiError';
import { COMMUNITY_PER_PAGE } from '../utils/constants';

const apiError = new ApiError();

export default {
  async countCommunityPage() {
    const totalCommunityCount = await Community.count();
    if (totalCommunityCount % COMMUNITY_PER_PAGE === 0)
      return totalCommunityCount / COMMUNITY_PER_PAGE;
    else return Math.floor(totalCommunityCount / COMMUNITY_PER_PAGE) + 1;
  },

  async getSelectedCommunities(page) {
    if (!page) throw apiError.setBadRequest('Page required');
    const selectedCommunities = await Community.findAll({
      offset: (page - 1) * COMMUNITY_PER_PAGE,
      limit: COMMUNITY_PER_PAGE,
    });
    return selectedCommunities;
  },

  async createCommunity(name, communityImage, introduction) {
    if (!name || !introduction)
      throw apiError.setBadRequest('All fields required');

    await Community.create({ name, communityImage, introduction });
  },

  async updateCommunity(id, name, communityImage, introduction) {
    if (!id) throw apiError.setBadRequest('Community ID required');
    if (!name || !introduction)
      throw apiError.setBadRequest('All fields required');
    await Community.update(
      { name, communityImage, introduction },
      { where: { id } },
    );
  },

  async removeCommunity(id) {
    if (!id) throw apiError.setBadRequest('Community ID required');
    await Community.destroy({ where: { id } });
  },
};
