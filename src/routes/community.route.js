import { Router } from 'express';
import ApiError from '../utils/ApiError';
import CommunityService from '../service/community.service';
import CommunityController from '../controllers/community.ctrl';

const apiError = new ApiError();
const communityService = new CommunityService(apiError);
const communityController = new CommunityController(communityService);

const communityRouter = Router();

communityRouter.get('/', communityController.getCommunityList);

export default communityRouter;
