import * as kelasModel from '../models/kelasModel.js';

export const getClasses = async (req, res) => {
    try {
        const classes = await kelasModel.getAllKelas();
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getClassById = async (req, res) => {
    try {
        const { id } = req.params;
        const kelas = await kelasModel.getKelasById(id);
        if (!kelas) {
            return res.status(404).json({ message: "Kelas tidak ditemukan." });
        }
        res.status(200).json(kelas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addClass = async (req, res) => {
    try {
        const { name, deskripsi, harga, kategori_id } = req.body;
        
        const tutor_id = req.user.id;

        const newClass = await kelasModel.createKelas({
            name, deskripsi, harga, kategori_id, tutor_id
        });

        res.status(201).json({ 
            message: "Kelas berhasil dibuat!", 
            classId: newClass.insertId 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, deskripsi, harga, kategori_id } = req.body;
        const result = await kelasModel.updateKelas(id, { name, deskripsi, harga, kategori_id });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Kelas tidak ditemukan." });
        }
        res.status(200).json({ message: "Kelas berhasil diperbarui!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await kelasModel.deleteKelas(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Kelas tidak ditemukan." });
        }
        res.status(200).json({ message: "Kelas berhasil dihapus!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};