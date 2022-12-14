import { Community, CommunityPost, User, UserCommunity } from '../models';
import ApiError from '../utils/ApiError';

const apiError = new ApiError();

export default {
  async getLikedCommunities(userId) {
    if (!userId) throw apiError.setBadRequest('User ID required.');

    const likedCommunitiesID = await UserCommunity.findAll({
      where: { userId },
      attributes: ['communityId'],
      order: [['createdAt', 'DESC']],
      raw: true,
    });

    const likedCommunities = await Promise.all(
      likedCommunitiesID.map(({ communityId }) =>
        Community.findOne({
          where: { communityId },
          raw: true,
        }),
      ),
    );

    return likedCommunities;
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

  async getMyCommunities(userId) {
    if (!userId) throw apiError.setBadRequest('User Id ');

    const myCommunitiesID = await UserCommunity.findAll({
      where: { userId, owner: true },
      attributes: ['communityId'],
      order: [['createdAt', 'DESC']],
      raw: true,
    });

    const myCommunities = await Promise.all(
      myCommunitiesID.map(({ communityId }) =>
        Community.findOne({ where: { communityId }, raw: true }),
      ),
    );

    return myCommunities;
  },

  async myPosts(userId) {
    await CommunityPost.findAll({ where: { userId } });
  },
};
