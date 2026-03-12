import db from '../config/db.js';

export const processPayment = async (req, res) => {
    try {
        const { order_id } = req.body;
        
        const [result] = await db.execute(
            'UPDATE orders SET status = ? WHERE id = ?',
            ['success', order_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Order tidak ditemukan!" });
        }

        res.status(200).json({ message: "Pembayaran berhasil! Akses kelas terbuka." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};