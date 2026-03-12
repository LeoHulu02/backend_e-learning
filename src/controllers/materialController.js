import * as materialModel from '../models/materialModel.js';

export const addMaterial = async (req, res) => {
    try {
        await materialModel.createMaterial(req.body);
        res.status(201).json({ message: "Material berhasil ditambahkan!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const getByModul = async (req, res) => {
    try {
        const materials = await materialModel.getMaterialsByModul(req.params.modul_id);
        res.status(200).json(materials);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const editMaterial = async (req, res) => {
    try {
        await materialModel.updateMaterial(req.params.id, req.body);
        res.json({ message: "Material berhasil diupdate!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

export const removeMaterial = async (req, res) => {
    try {
        await materialModel.deleteMaterial(req.params.id);
        res.json({ message: "Material berhasil dihapus!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};