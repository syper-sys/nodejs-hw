import { Router } from 'express';
// import { celebrate } from 'celebrate';

import { authenticate } from '../middleware/authenticate.js';
import { updateUserAvatar } from '../controllers/userControllers.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.use(authenticate);

router.patch('/users/me/avatar', upload.single('avatar'), updateUserAvatar);

export default router;
