const Router = require('../../models/routerModel');

const createRouter = async (req, res) => {
    var {name, description, workspaceId} = req.body;
    const createdBy = req.user._id
    if (!name || !workspaceId) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const router = await Router.create({ name, description, workspaceId, createdBy });
        res.status(201).json(router);
    } catch (error) {
        res.status(500).json({ message: 'Error creating router', error });
    }
};

const getAllRouters = async (req, res) => {
    try {
        const router = await Router.find();
        res.status(200).json(router);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching router', error });
    }
};

const getRouter= async (req, res) => {
    const { id } = req.params;
    try {
        const router = await Router.findById(id);
        if (!router) {
            return res.status(404).json({ message: 'Routernot found' });
        }
        res.status(200).json(router);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching router', error });
    }
};
const getRoutersByWorkspace= async (req, res) => {
    const workspaceId = req.params.id;
    console.log(workspaceId);
    try {
        const router = await Router.find({workspaceId:workspaceId});
        console.log(router)
        if (!router) {
            return res.status(404).json({ message: 'Routernot found' });
        }
        res.status(200).json(router);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching router', error });
    }
};

const updateRouter = async (req, res) => {
    const { id } = req.params;
    const { name, description, workspaceId } = req.body;
    try {
        const router = await Router.findByIdAndUpdate(id, { name, description, workspaceId }, { new: true });
        if (!router) {
            return res.status(404).json({ message: 'Router not found' });
        }
        res.status(200).json(router);
    } catch (error) {
        res.status(500).json({ message: 'Error updating router', error });
    }
};

const deleteRouter = async (req, res) => {
    const { id } = req.params;
    try {
        const router = await Router.findByIdAndDelete(id);
        if (!router) {
            return res.status(404).json({ message: 'Router not found' });
        }
        res.status(200).json({ message: 'Router deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting router', error });
    }
};  

module.exports = { createRouter, getAllRouters, getRouter,getRoutersByWorkspace, updateRouter, deleteRouter };