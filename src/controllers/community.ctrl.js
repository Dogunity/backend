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
        message: 'Successfully GET Community pagination',
        result: { totalCommunityPage, selectedCommunities },
      });
    } catch (err) {
      next(err);
    }
  }
  async createCommunity(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

export default CommunityController;
