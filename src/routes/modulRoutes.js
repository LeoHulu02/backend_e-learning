import express from 'express';
import { getModulByKelasId } from '../controllers/modulController.js';
import { addModul, editModul, removeModul } from '../controllers/modulController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/', verifyToken, addModul);
router.get('/:kelas_id', verifyToken, getModulByKelasId);
router.put('/:id', verifyToken, editModul);
router.delete('/:id', verifyToken, removeModul);

export default router;