import { User, UserCommunity } from '../models';
import ApiError from '../utils/ApiError';
import { LIKED_COMMUNITY_PER_PAGE } from '../utils/constants';

const apiError = new ApiError();

export default {
  async countLikedCommunityPage(userId) {
    if (!userId) throw apiError.setBadRequest('User ID required.');

    const totalCommunityCount = await UserCommunity.count({
      where: { userId },
    });

    if (totalCommunityCount % LIKED_COMMUNITY_PER_PAGE === 0)
      return totalCommunityCount / LIKED_COMMUNITY_PER_PAGE;
    return Math.floor(totalCommunityCount / LIKED_COMMUNITY_PER_PAGE) + 1;
  },

  async getSelectedLikedCommunities(page, userId) {
    if (!page) throw apiError.setBadRequest('Page number is required.');

    const selectedLikedCommunitiesID = await UserCommunity.findAll({
      where: { userId },
    });

    console.log(selectedLikedCommunitiesID);
  },
};
