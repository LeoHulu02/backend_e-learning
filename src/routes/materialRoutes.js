import express from 'express';
import * as matController from '../controllers/materialController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, matController.addMaterial);
router.get('/modul/:modul_id', verifyToken, matController.getByModul);
router.put('/:id', verifyToken, matController.editMaterial);
router.delete('/:id', verifyToken, matController.removeMaterial);

export default router;