const { HotspotUser} = require('../../models/hotspotModel');

const getHotspotUser = async (req, res) => {
    try {
        const users = await HotspotUser.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotspot users', error });
    }
    }   
const getHotspotUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await HotspotUser.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Hotspot user not found' });
        }
       
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotspot user', error });
    }
}
const createHotspotUser = async (req, res) => {
    try {
        const { phone} = req.body;
         const userExists = await HotspotUser.findOne({ phone });
        if (userExists) {
            return res.status(400).json({ message: 'This phone number already has an account. Please login.' });
        }
        // Logic to create a new hotspot user
        const newUser = new HotspotUser({ phone });
        await newUser.save();
        res.status(201).json( newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating hotspot user', error });
    }
}
const updateHotspotUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await HotspotUser.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Hotspot user not found' });
        }
        const updteUser = await HotspotUser.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updteUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating hotspot user', error });
    }
}
const deleteHotspotUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await HotspotUser.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Hotspot user not found' });
        }
        await HotspotUser.findByIdAndDelete(id);
        res.status(200).json(id);
       
    } catch (error) {
        res.status(500).json({ message: 'Error deleting hotspot user', error });
    }
}
module.exports = {
    getHotspotUser,
    getHotspotUserById,
    createHotspotUser,
    updateHotspotUser,
    deleteHotspotUser
}