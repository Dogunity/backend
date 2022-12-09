import { Router } from 'express';
import { communityCtrl } from '../controllers';
import tokenVerification from '../middlewares/tokenVerification';

const router = Router();

router.get('/', communityCtrl.getCommunityList);
router.post('/', tokenVerification, communityCtrl.createCommunity);
router.put('/:id', communityCtrl.updateCommunity);
router.delete('/:id', communityCtrl.removeCommunity);
router.post('/:id/like', tokenVerification, communityCtrl.likeCommunity);

export default router;
