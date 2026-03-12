import * as modulModel from '../models/modulModel.js';


export const getModulByKelasId = async (req, res) => {
    try {
        const { kelas_id } = req.params; 
        const modul = await modulModel.getModulByKelas(kelas_id);
        
        if (modul.length === 0) {
            return res.status(404).json({ message: "Modul tidak ditemukan untuk kelas ini." });
        }
        
        res.status(200).json(modul);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addModul = async (req, res) => {
    try {
        const { name, kelas_id } = req.body;
        const result = await modulModel.createModul(name, kelas_id);
        res.status(201).json({ message: "Modul berhasil ditambahkan!", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const editModul = async (req, res) => {
    try {
        await modulModel.updateModul(req.params.id, req.body.name);
        res.json({ message: "Modul berhasil diupdate!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const removeModul = async (req, res) => {
    try {
        await modulModel.deleteModul(req.params.id);
        res.json({ message: "Modul berhasil dihapus!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};