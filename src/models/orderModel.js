import db from '../config/db.js';

export const createOrder = async (userId, totalHarga, kelasId) => {
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        const [orderResult] = await connection.execute(
            'INSERT INTO orders (users_id, total_price, status) VALUES (?, ?, ?)',
            [userId, totalHarga, 'pending']
        );
        const orderId = orderResult.insertId;

        await connection.execute(
            'INSERT INTO orders_item (orders_id, kelas_id, price, quantity) VALUES (?, ?, ?, ?)',
            [orderId, kelasId, totalHarga, 1]
        );

        await connection.commit();
        return orderId;
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};