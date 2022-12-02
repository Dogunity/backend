import { Router } from 'express';
import { communityCtrl } from '../controllers';

const router = Router();

router.get('/', communityCtrl.getCommunityList);
router.post('/', communityCtrl.createCommunity);
router.put('/:id', communityCtrl.updateCommunity);
router.delete('/:id', communityCtrl.removeCommunity);

export default router;
