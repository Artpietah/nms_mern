const router = require('express').Router();
const { createRouter, getAllRouters,getRouter,deleteRouter, updateRouter } = require('../../controllers/router/routerController');
const { verifyToken } = require('../../middleware/authMiddleware');
const {isRouterOwner} = require('../../middleware/routerMiddleware');

router.get('/', getAllRouters).post('/create', verifyToken, createRouter)
router.get('/:id', verifyToken, getRouter);
router.delete('/:id', verifyToken, isRouterOwner,deleteRouter);
router.put('/:id', verifyToken, updateRouter);


module.exports = router;