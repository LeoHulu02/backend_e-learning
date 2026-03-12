import db from '../config/db.js';

export const createMaterial = async (data) => {
    const { name, tipe, url, modul_id } = data;
    return await db.execute(
        'INSERT INTO material (name, tipe, url, modul_id) VALUES (?, ?, ?, ?)',
        [name, tipe, url, modul_id]
    );
};

export const getMaterialsByModul = async (modul_id) => {
    const [rows] = await db.execute('SELECT * FROM material WHERE modul_id = ?', [modul_id]);
    return rows;
};

export const updateMaterial = async (id, data) => {
    const { name, tipe, url } = data;
    return await db.execute(
        'UPDATE material SET name = ?, tipe = ?, url = ? WHERE id = ?',
        [name, tipe, url, id]
    );
};

export const deleteMaterial = async (id) => {
    return await db.execute('DELETE FROM material WHERE id = ?', [id]);
};