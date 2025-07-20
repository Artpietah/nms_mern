const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/authMiddleware');

const { getHotspotUser, getHotspotUserById,createHotspotUser,updateHotspotUser,deleteHotspotUser} = require('../../controllers/hotspot/hotspotUserController');
const { getHotspotProfile,createHotspotProfile,updateHotspotProfile,deleteHotspotProfile} = require('../../controllers/hotspot/hotspotProfileController');
const { getHotspotToken, createHotspotToken, updateHotspotToken, deleteHotspotToken } = require('../../controllers/hotspot/hotspotToken');
const { verifyProfileCreator } = require('../../middleware/profileMiddleware');

router.get('/user',  getHotspotUser).post('/user', verifyToken, createHotspotUser);
router.get('/user/:id', getHotspotUserById);
router.put('/user/:id', verifyToken, updateHotspotUser);
router.delete('/user/:id', verifyToken, deleteHotspotUser);

router.get('/profile', verifyToken, getHotspotProfile).post('/profile', verifyToken, createHotspotProfile);
router.put('/profile/:id', verifyToken, verifyProfileCreator ,updateHotspotProfile);
router.delete('/profile/:id', verifyToken, verifyProfileCreator ,deleteHotspotProfile);

// TODO: add middleware to verify token creator of workspace later
router.get('token/',  getHotspotToken).post('token/', verifyToken, createHotspotToken);
router.put('token/:id', verifyToken, updateHotspotToken);
router.delete('token/:id', verifyToken, deleteHotspotToken);

module.exports = router;

