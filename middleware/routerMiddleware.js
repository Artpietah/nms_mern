const Router = require('../models/routerModel');
const {apiRequest} = require('../controllers/api/requestController');


const pingRouter = async (req, res, next) => {
    //send ping request to router
     const router = {
        router_ip: '237.84.2.178',
        router_username: 'admin',
        router_password: 'admin',
        type: 'GET',
        data: {}
    };

     const ping = await apiRequest(router)
     console.log(ping)
     next();
}

const checkRouter = async (req, res, next) => {
    const id  = req.routerId;
    try {
        const router = await Router.findById(id);
        if (!router) {
            return res.status(404).json({ message: 'Router not found' });
        }
        req.router = router;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking router', error });
    }
}


module.exports = { pingRouter, checkRouter};