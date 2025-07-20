const {HotspotProfile} = require('../../models/hotspotModel');


const getHotspotProfile = async (req, res) => {
    try {
        const profile = await HotspotProfile.find();
        if (!profile) {
            return res.status(404).json({ message: 'Hotspot profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotspot profile', error });
    }
};

const getHotspotProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await HotspotProfile.findById(id);
        if (!profile) {
            return res.status(404).json({ message: 'Hotspot profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotspot profile', error });
    }
};

const createHotspotProfile = async (req, res) => {
    const createdBy = req.user._id;
    const  data = req.body;
    try {
        const newProfile = new HotspotProfile({ ...data, createdBy });
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(500).json({ message: 'Error creating hotspot profile', error });
    }
};
const updateHotspotProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await HotspotProfile.findById(id);
        if (!profile) {
            return res.status(404).json({ message: 'Hotspot profile not found' });
        }
        const updatedProfile = await HotspotProfile.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: 'Error updating hotspot profile', error });
    }
};

const deleteHotspotProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await HotspotProfile.findById(id);
        if (!profile) {
            return res.status(404).json({ message: 'Hotspot profile not found' });
        }
        await HotspotProfile.findByIdAndDelete(id);
        res.status(200).json({ message: 'Hotspot profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting hotspot profile', error });
    }
    // logic to delete a hotspot profile mikrotik router
};


module.exports = {
    getHotspotProfile,
    getHotspotProfileById,
    createHotspotProfile,
    updateHotspotProfile,
    deleteHotspotProfile
};