import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // 1. Ambil token dari header 'Authorization'
    // Biasanya dikirim dengan format: Bearer <token>
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // 2. Jika token tidak ada
    if (!token) {
        return res.status(401).json({ message: "Akses ditolak! Anda belum login." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        
        next(); 
    } catch (err) {
        res.status(403).json({ message: "Token tidak valid atau sudah kadaluwarsa!" });
    }
};