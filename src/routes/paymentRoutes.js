import express from 'express';
import { processPayment } from '../controllers/paymentController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/bayar', verifyToken, processPayment);

export default router;