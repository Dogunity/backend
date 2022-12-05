import { Router } from 'express';
import authCtrl from '../controllers/auth.ctrl';

const router = Router();

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.post('/reissue', authCtrl.reissueToken);

export default router;
