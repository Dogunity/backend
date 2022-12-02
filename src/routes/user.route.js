import { Router } from 'express';
import userCtrl from '../controllers/user.ctrl';

const router = Router();

router.post('/register', userCtrl.register);

export default router;
