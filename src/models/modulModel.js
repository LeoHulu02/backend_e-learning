import db from '../config/db.js';

export const createModul = async (name, kelas_id) => {
    const [result] = await db.execute(
        'INSERT INTO modul (name, kelas_id) VALUES (?, ?)',
        [name, kelas_id]
    );
    return result;
};

export const getModulByKelas = async (kelas_id) => {
    const [rows] = await db.execute('SELECT * FROM modul WHERE kelas_id = ?', [kelas_id]);
    return rows;
};

export const updateModul = async (id, name) => {
    return await db.execute('UPDATE modul SET name = ? WHERE id = ?', [name, id]);
};

export const deleteModul = async (id) => {
    return await db.execute('DELETE FROM modul WHERE id = ?', [id]);
};