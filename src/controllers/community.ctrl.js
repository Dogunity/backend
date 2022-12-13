import { communityService } from '../services';

export default {
  async getCommunityList(req, res, next) {
    const { page, order } = req.query;
    try {
      const totalCommunityPage = await communityService.countCommunityPage();
      const selectedCommunities = await communityService.getSelectedCommunities(
        page,
        order,
      );

      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully GET community list pagination.',
        result: { totalCommunityPage, selectedCommunities },
      });
    } catch (err) {
      next(err);
    }
  },
  async createCommunity(req, res, next) {
    const userId = req.userId;
    const { name, introduction } = req.body;
    const { location } = req.file;
    try {
      await communityService.createCommunity(
        userId,
        name,
        location,
        introduction,
      );

      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully CREATE a new community.',
      });
    } catch (err) {
      next(err);
    }
  },

  async updateCommunity(req, res, next) {
    const userId = req.userId;
    const { id } = req.params;
    const { name, introduction } = req.body;
    const { location } = req.file;
    try {
      await communityService.updateCommunity(
        userId,
        id,
        name,
        location,
        introduction,
      );

      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully UPDATE the community.',
      });
    } catch (err) {
      next(err);
    }
  },

  async removeCommunity(req, res, next) {
    const userId = req.userId;
    const { id } = req.params;
    try {
      await communityService.removeCommunity(userId, id);

      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully DELETE the community.',
      });
    } catch (err) {
      next(err);
    }
  },

  async likeCommunity(req, res, next) {
    const userId = req.userId;
    const { id } = req.params;
    try {
      await communityService.likeCommunity(userId, id);
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully LIKE the community.',
      });
    } catch (err) {
      next(err);
    }
  },

  async cancelLikeCommunity(req, res, next) {
    const userId = req.userId;
    const { id } = req.params;
    try {
      await communityService.cancelLikeCommunity(userId, id);
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully UNDO LIKE the community.',
      });
    } catch (err) {
      next(err);
    }
  },

  async createPost(req, res, next) {
    const userId = req.userId;
    const { id } = req.params;
    const images = req.files;
    const { description } = req.body;
    try {
      await communityService.createPost(userId, id, images, description);
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully CREATE the post.',
      });
    } catch (err) {
      next(err);
    }
  },
};
