const Router = require('../../models/routerModel');
const {apiRequest} = require('../controllers/api/requestController');
const router = require('../routes/hotspot/hotspot');


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

module.exports = { pingRouter };