import { Community, User, UserCommunity } from '../models';
import ApiError from '../utils/ApiError';
import {
  LIKED_COMMUNITY_PER_PAGE,
  MY_COMMUNITY_PER_PAGE,
} from '../utils/constants';

const apiError = new ApiError();

export default {
  async countLikedCommunityPage(userId) {
    if (!userId) throw apiError.setBadRequest('User ID is required.');

    const totalCommunityCount = await UserCommunity.count({
      where: { userId },
    });

    if (totalCommunityCount % LIKED_COMMUNITY_PER_PAGE === 0)
      return totalCommunityCount / LIKED_COMMUNITY_PER_PAGE;
    return Math.floor(totalCommunityCount / LIKED_COMMUNITY_PER_PAGE) + 1;
  },

  async getSelectedLikedCommunities(page, userId) {
    if (!page) throw apiError.setBadRequest('Page number is required.');
    if (!userId) throw apiError.setBadRequest('User ID required.');

    const selectedLikedCommunitiesID = await UserCommunity.findAll({
      where: { userId },
      attributes: ['communityId'],
      order: [['createdAt', 'DESC']],
      raw: true,
    });

    const selectedLikedCommunities = await Promise.all(
      selectedLikedCommunitiesID.map(({ communityId }) =>
        Community.findAll({
          where: { communityId },
          raw: true,
        }),
      ),
    );

    const arrangedSelectedLikedCommunities = [];
    selectedLikedCommunities.forEach(([community]) => {
      arrangedSelectedLikedCommunities.push(community);
    });

    return arrangedSelectedLikedCommunities;
  },

  async getUserInfo(userId) {
    if (!userId) throw apiError.setBadRequest('User ID is required.');

    const foundUser = await User.findOne({ where: { id: userId }, raw: true });

    if (!foundUser)
      throw apiError.setBadRequest('User with the ID does not exist.');

    return foundUser;
  },

  async editUserInfo(userId, nickname, location) {
    if (!userId) throw apiError.setBadRequest('User ID is required.');

    if (!nickname && !location)
      throw apiError.setBadRequest('At least one field is required.');

    await User.update(
      { nickname, profileImg: location },
      { where: { id: userId } },
    );
  },

  async countMyCommunityPage(page, userId) {
    if (!page) throw apiError.setBadRequest('Page number is required.');
    if (!userId) throw apiError.setBadRequest('User ID is required.');

    const totalMyCommunity = await UserCommunity.count({ where: { userId } });

    if (totalMyCommunity % MY_COMMUNITY_PER_PAGE === 0)
      return totalMyCommunity / MY_COMMUNITY_PER_PAGE;
    return Math.floor(totalMyCommunity / MY_COMMUNITY_PER_PAGE) + 1;
  },

  async getMyCommunities(userId) {
    if (!userId) throw apiError.setBadRequest('User Id ');

    const selectedMyCommunitiesID = await UserCommunity.findAll({
      where: { userId, owner: true },
      attributes: ['communityId'],
      order: [['createdAt', 'DESC']],
      raw: true,
    });

    const myCommunities = await Promise.all(
      selectedMyCommunitiesID.map(({ communityId }) =>
        Community.findAll({ where: { communityId }, raw: true }),
      ),
    );

    const arrangedMyCommunities = [];
    myCommunities.forEach(([community]) => {
      arrangedMyCommunities.push(community);
    });

    return arrangedMyCommunities;
  },
};
