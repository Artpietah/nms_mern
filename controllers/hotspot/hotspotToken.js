const {HotspotToken} = require('../../models/hotspotModel');

const getHotspotToken = async (req, res) => {
    try {
        const tokens = await HotspotToken.find();
        res.status(200).json(tokens);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotspot tokens', error });
    }
}

const getHotspotTokenById = async (req, res) => {
    try {
        const { id } = req.params;
        const token = await HotspotToken.findById(id);
        if (!token) {
            return res.status(404).json({ message: 'Hotspot token not found' });
        }
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotspot token', error });
    }
}
const createHotspotToken = async (req, res) => {
    try {
        const { token, userId } = req.body;
        const existingToken = await HotspotToken.find
        ({ token });
        if (existingToken) {
            return res.status(400).json({ message: 'This token already exists.' });
        }
        const newToken = new HotspotToken({ token, userId });
        await newToken.save();
        res.status(201).json(newToken);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating hotspot token', error });
    }
}
const updateHotspotToken = async (req, res) => {
    try {
        const { id } = req.params;
        const token = await HotspotToken.findById(id);
        if (!token) {
            return res.status(404).json({ message: 'Hotspot token not found' });
        }
        const updatedToken = await HotspotToken.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedToken);
    } catch (error) {
        res.status(500).json({ message: 'Error updating hotspot token', error });
    }
}

const deleteHotspotToken = async (req, res) => {
    try {
        const { id } = req.params;
        const token = await HotspotToken.findById(id);
        if (!token) {
            return res.status(404).json({ message: 'Hotspot token not found' });
        }
        await HotspotToken.findByIdAndDelete(id);
        res.status(200).json(id);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting hotspot token', error });
    }
}

module.exports = {
    getHotspotToken,
    getHotspotTokenById,
    createHotspotToken,
    updateHotspotToken,
    deleteHotspotToken
}