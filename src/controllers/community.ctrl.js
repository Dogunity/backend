class CommunityController {
  constructor(communityService) {
    this.communityService = communityService;
  }

  async getCommunityList(req, res, next) {
    const { page } = req.query;
    try {
      const totalCommunityPage =
        await this.communityService.countCommunityPage();
      const selectedCommunities =
        await this.communityService.getSelectedCommunities(page);
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Successfully GET community pagination',
        result: { totalCommunityPage, selectedCommunities },
      });
    } catch (err) {
      next(err);
    }
  }
  async createCommunity(req, res, next) {
    const { name, communityImage, introduction } = req.body;
    try {
      const createdCommunity = await this.communityService.createCommunity(
        name,
        communityImage,
        introduction,
      );
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Successfully CREATE a new community',
        result: createdCommunity,
      });
    } catch (err) {
      next(err);
    }
  }
}

Object.freeze(CommunityController);
export default CommunityController;
