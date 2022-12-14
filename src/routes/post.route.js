import { Router } from 'express';
import { postCtrl } from '../controllers';
import tokenVerification from '../middlewares/tokenVerification';

const router = Router();

router.post('/:id', tokenVerification, postCtrl.createComment);
router.get('/:id', postCtrl.getComments);
router.delete('/:id', tokenVerification, postCtrl.deleteComment);
router.post('/:id/like', tokenVerification, postCtrl.likePost);
router.post('/:id/nolike', tokenVerification, postCtrl.cancelLikePost);

export default router;
