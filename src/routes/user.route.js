import { Router } from 'express';
import { userCtrl } from '../controllers';
import tokenVerification from '../middlewares/tokenVerification';

const router = Router();

router.get('/community/likes', tokenVerification, userCtrl.likedCommunityList);

export default router;
