import { Router } from 'express';
import { userCtrl } from '../controllers';
import tokenVerification from '../middlewares/tokenVerification';
import upload from '../middlewares/uploadImage';

const router = Router();

router.get('/community/likes', tokenVerification, userCtrl.getLikedCommunities);
router.put(
  '/edit',
  tokenVerification,
  upload.single('profileImg'),
  userCtrl.updateUserInfo,
);
router.get('/info', tokenVerification, userCtrl.getUserInfo);
router.get('/community/own', tokenVerification, userCtrl.getMyCommunity);
router.get('/posts', tokenVerification, userCtrl.getMyPosts);
router.get('/post/likes', tokenVerification, userCtrl.getLikedPosts);

export default router;
