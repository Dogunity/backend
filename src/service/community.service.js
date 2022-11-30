import {
  Community,
  CommunityComment,
  CommunityImage,
  CommunityPost,
} from '../models';
import { COMMUNITY_PER_PAGE } from '../utils/constants';

class CommunityService {
  constructor(apiError) {
    this.apiError = apiError;
  }

  async countCommunityPage() {
    const totalCommunityCount = await Community.count();
    if (totalCommunityCount % COMMUNITY_PER_PAGE === 0)
      return totalCommunityCount / COMMUNITY_PER_PAGE;
    else return Math.floor(totalCommunityCount / COMMUNITY_PER_PAGE) + 1;
  }

  async getSelectedCommunities(page) {
    if (!page) throw this.apiError.setBadRequest('Page required.');
    const selectedCommunities = await Community.findAll({
      offset: (page - 1) * COMMUNITY_PER_PAGE,
      limit: COMMUNITY_PER_PAGE,
    });
    return selectedCommunities;
  }

  async createCommunity(name, communityImage, introduction) {
    return Community.create({ name, communityImage, introduction });
  }
}

Object.freeze(CommunityService);
export default CommunityService;
