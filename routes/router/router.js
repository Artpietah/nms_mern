const router = require('express').Router();
const { createRouter, getAllRouters,getRouter } = require('../../controllers/router/routerController');
const { verifyToken } = require('../../middleware/authMiddleware');

router.get('/', getAllRouters).post('/create', verifyToken, createRouter);
router.get('/:id', verifyToken, getRouter);


module.exports = router;