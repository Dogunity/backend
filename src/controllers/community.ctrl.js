import { communityService } from '../services';

export default {
  async getCommunityList(req, res, next) {
    const { page } = req.query;
    try {
      const totalCommunityPage = await communityService.countCommunityPage();
      const selectedCommunities = await communityService.getSelectedCommunities(
        page,
      );
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully GET community pagination',
        result: { totalCommunityPage, selectedCommunities },
      });
    } catch (err) {
      next(err);
    }
  },
  async createCommunity(req, res, next) {
    const { name, communityImage, introduction } = req.body;
    try {
      await communityService.createCommunity(
        name,
        communityImage,
        introduction,
      );
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully CREATE a new community',
      });
    } catch (err) {
      next(err);
    }
  },

  async updateCommunity(req, res, next) {
    const { id } = req.params;
    const { name, communityImage, introduction } = req.body;
    try {
      await communityService.updateCommunity(
        id,
        name,
        communityImage,
        introduction,
      );
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully UPDATE the community',
      });
    } catch (err) {
      next(err);
    }
  },

  async removeCommunity(req, res, next) {
    const { id } = req.params;
    try {
      await communityService.removeCommunity(id);
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully DELETE the community',
      });
    } catch (err) {
      next(err);
    }
  },
};
