import { userService } from '../services';

export default {
  async likedCommunityList(req, res, next) {
    const { page } = req.query;
    const userId = req.userId;
    try {
      const totalLikedCommunityPage = await userService.countLikedCommunityPage(
        userId,
      );
      const selectedLikedCommunities =
        await userService.getSelectedLikedCommunities(page, userId);

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully GET liked community list.',
        result: { totalLikedCommunityPage, selectedLikedCommunities },
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

  async editUserInfo(req, res, next) {
    const userId = req.userId;
    const { nickname } = req.body;
    console.log(req.file);
    const { location } = req.file;

    try {
      await userService.editUserInfo(userId, nickname, location);

      return res.status(201).json({
        success: true,
        status: 200,
        message: 'Successfully UPDATE the user information.',
      });
    } catch (err) {
      next(err);
    }
  },
};
