import { userService } from '../services';

export default {
  async getLikedCommunities(req, res, next) {
    const userId = req.userId;
    try {
      const likedCommunities = await userService.getLikedCommunities(userId);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully GET liked community list.',
        result: likedCommunities,
      });
    } catch (err) {
      next(err);
    }
  },

  async getUserInfo(req, res, next) {
    const userId = req.userId;
    try {
      const foundUser = await userService.getUserInfo(userId);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully GET the user information.',
        result: foundUser,
      });
    } catch (err) {
      next(err);
    }
  },

  async updateUserInfo(req, res, next) {
    const userId = req.userId;
    const { nickname } = req.body;
    console.log(req.file);
    const { location } = req.file;

    try {
      await userService.updateUserInfo(userId, nickname, location);

      return res.status(201).json({
        success: true,
        status: 200,
        message: 'Successfully UPDATE the user information.',
      });
    } catch (err) {
      next(err);
    }
  },

  async getMyCommunity(req, res, next) {
    const userId = req.userId;
    try {
      const myCommunities = await userService.getMyCommunities(userId);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully GET my community list.',
        result: myCommunities,
      });
    } catch (err) {
      next(err);
    }
  },

  async getMyPosts(req, res, next) {
    const userId = req.userId;
    try {
      const foundPosts = await userService.getMyPosts(userId);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully GET my post list.',
        result: foundPosts,
      });
    } catch (err) {
      next(err);
    }
  },

  async getLikedPosts(req, res, next) {
    const userId = req.userId;
    try {
      const foundLikedPosts = await userService.getLikedPosts(userId);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully GET liked post list.',
        result: foundLikedPosts,
      });
    } catch (err) {
      next(err);
    }
  },
};
