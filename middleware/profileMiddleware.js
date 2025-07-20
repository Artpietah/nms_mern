const {HotspotProfile} = require('../models/hotspotModel');

const verifyProfileCreator = async (req, res, next) => {
    const userId = req.user._id;
    const profileId =  req.params.id; // Assuming createdBy is in the request body or params

    const profile = await HotspotProfile.findById(profileId);
    if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
    }
    if(!profile.createdBy === userId) {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
    }
    // If the user is the creator of the profile, proceed to the next middleware
    next();
}

module.exports = {
    verifyProfileCreator,
};