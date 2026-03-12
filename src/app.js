import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import kelasRoutes from './routes/kelasRoutes.js';
import modulRoutes from './routes/modulRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import materialRoutes from './routes/materialRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json()); 
app.use('/api/auth', authRoutes);
app.use('/api/kelas', kelasRoutes);
app.use('/api/modul', modulRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/material', materialRoutes);



app.get('/', (req, res) => {
    res.send('Server E-Learning sudah berjalan!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});