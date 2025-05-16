import Pitch from "../models/pitch.js";

export const createPitch = async (req, res) => {
    try {   
        const { user_id, title, description, media_type, media_url, tags } = req.body;

        const newPitch = await Pitch.create({
            user_id,
            title,
            description,
            media_type,
            media_url,
            tags: Array.isArray(tags) ? tags : []
        });

        if (!newPitch) {
            return res.status(400).json({ message: "Failed to create pitch" });
        }

        return res.status(201).json({ message: "Pitch created successfully", pitch: newPitch });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const getPitchesByUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        const pitches = await Pitch.findAll({ where: { user_id } });

        return res.status(200).json({ pitches });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch pitches", error: error.message });
    }
};


export const updatePitch = async (req, res) => {
    try {
        const { pitch_id, user_id } = req.params;
        const { title, description, media_type, media_url, tags } = req.body;

        const pitch = await Pitch.findOne({ where: { id: pitch_id, user_id } });

        if (!pitch) {
            return res.status(404).json({ message: "Pitch not found or unauthorized" });
        }

        await pitch.update({
            title: title || pitch.title,
            description: description || pitch.description,
            media_type: media_type || pitch.media_type,
            media_url: media_url || pitch.media_url,
            tags: tags || pitch.tags
        });

        return res.status(200).json({ message: "Pitch updated successfully", pitch });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update pitch", error: error.message });
    }
};

export const deletePitch = async (req, res) => {
    try {
        const { pitch_id, user_id } = req.params;

        const pitch = await Pitch.findOne({ where: { id: pitch_id, user_id } });

        if (!pitch) {
            return res.status(404).json({ message: "Pitch not found or unauthorized" });
        }

        await pitch.destroy();

        return res.status(200).json({ message: "Pitch deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete pitch", error: error.message });
    }
};

