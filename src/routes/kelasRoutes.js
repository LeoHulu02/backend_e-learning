import express from 'express';
import { getClasses } from '../controllers/kelasController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { addClass } from '../controllers/kelasController.js';
import { updateClass, deleteClass, getClassById } from '../controllers/kelasController.js';

const router = express.Router();

router.get('/', verifyToken, getClasses);
router.get('/:id', verifyToken, getClassById);
router.post('/', verifyToken, addClass);
router.put('/:id', verifyToken, updateClass);
router.delete('/:id', verifyToken, deleteClass);

export default router;