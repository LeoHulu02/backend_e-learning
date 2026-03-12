import * as orderModel from '../models/orderModel.js';

export const checkout = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { total_harga, kelas_id } = req.body;

        const orderId = await orderModel.createOrder(userId, total_harga, kelas_id);
        
        res.status(201).json({ 
            message: "Order berhasil dibuat, silakan lakukan pembayaran!", 
            orderId 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};