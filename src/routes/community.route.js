import { Router } from 'express';
import { communityCtrl } from '../controllers';
import tokenVerification from '../middlewares/tokenVerification';
import upload from '../middlewares/uploadImage';

const router = Router();

router.get('/', communityCtrl.getCommunityList);
router.post(
  '/',
  tokenVerification,
  upload.single('communityImage'),
  communityCtrl.createCommunity,
);
router.put('/:id', tokenVerification, communityCtrl.updateCommunity);
router.delete('/:id', tokenVerification, communityCtrl.removeCommunity);
router.post('/:id/like', tokenVerification, communityCtrl.likeCommunity);
router.post(
  '/:id/nolike',
  tokenVerification,
  communityCtrl.cancelLikeCommunity,
);
router.post('/:id', tokenVerification, communityCtrl.createPost);

export default router;
