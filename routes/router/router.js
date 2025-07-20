const router = require('express').Router();
const { createRouter, getAllRouters } = require('../../controllers/router/routerController');
const { verifyToken } = require('../../middleware/authMiddleware');

router.get('/', getAllRouters).post('/create', verifyToken, createRouter);

module.exports = router;