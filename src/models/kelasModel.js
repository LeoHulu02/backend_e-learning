import db from '../config/db.js';

export const getAllKelas = async () => {
    const [rows] = await db.execute(`
        SELECT kelas.*, kategori.name as kategori_name 
        FROM kelas 
        LEFT JOIN kategori ON kelas.kategori_id = kategori.id
    `);
    return rows;
};

export const getKelasById = async (id) => {
    const [rows] = await db.execute(`
        SELECT kelas.*, kategori.name as kategori_name 
        FROM kelas 
        LEFT JOIN kategori ON kelas.kategori_id = kategori.id
        WHERE kelas.id = ?
    `, [id]);
    return rows[0];
};

export const createKelas = async (data) => {
    const { name, deskripsi, harga, kategori_id, tutor_id } = data;
    const [result] = await db.execute(
        'INSERT INTO kelas (name, deskripsi, harga, kategori_id, tutor_id) VALUES (?, ?, ?, ?, ?)',
        [name, deskripsi, harga, kategori_id, tutor_id]
    );
    return result;
};

export const updateKelas = async (id, data) => {
    const { name, deskripsi, harga, kategori_id } = data;

    const [result] = await db.execute(
        'UPDATE kelas SET name=?, deskripsi=?, harga=?, kategori_id=? WHERE id=?',
        [
            name ?? null,
            deskripsi ?? null,
            harga ?? null,
            kategori_id ?? null,
            id
        ]
    );

    return result;
};

export const deleteKelas = async (id) => {
    const [result] = await db.execute('DELETE FROM kelas WHERE id=?', [id]);
    return result;
};