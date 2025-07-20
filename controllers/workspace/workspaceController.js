//getWorkSpace, getWorkSpaceById, createWorkSpace, updateWorkSpace, deleteWorkSpace, inviteToWorkspace, getMyWorkSpaces
const WorkSpace = require('../../models/workspaceModel');
const User = require('../../models/userModel');

const getWorkSpace = async (req, res) => {
    try {
        const workspaces = await WorkSpace.find();
        res.status(200).json(workspaces);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching workspaces', error });
    }
}

const getMyWorkSpaces = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const workspaces = await WorkSpace.find({ members: { $elemMatch: { userId: user._id } } });
        if (!workspaces) {
            return res.status(404).json({ message: 'No workspaces found' });
        }
        res.status(200).json(workspaces);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching workspaces', error });
    }
}


const inviteToWorkspace = async (req, res) => {
    try {
        const {  email, role,user} = req.body;
        const workspaceId = req.body.workspaceId;
        const workspace = await WorkSpace.findById(workspaceId);
        const userExists = await User.findOne({ email });
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }
        //check if user is already a member of the workspace
       const index = workspace.members.findIndex(member => member.userId.toString() === userExists._id.toString());
        if (index !== -1) {
            return res.status(400).json({ message: 'User is already a member of this workspace' });
        }
        workspace.members.push({userId: userExists._id,role: role});
        await workspace.save();
        res.status(200).json({ message: 'User invited to workspace', workspace });
       
    } catch (error) {
        res.status(500).json({ message: 'Error inviting user to workspace', error });
    }
}
const revokeInvite = async (req, res) => {
    try {   
        const { email } = req.body;
        const workspaceId = req.body.workspaceId;
        const workspace = await WorkSpace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }
        console.log(workspace.members[0])
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }
        //check if user is already a member of the workspace
        const index = workspace.members.findIndex(member => member.userId.toString() === userExists._id.toString());
        if (index === -1) {
            return res.status(400).json({ message: 'User is not a member of this workspace' });
        }
        workspace.members.splice(index, 1);
        await workspace.save();
        res.status(200).json({ message: 'User removed from workspace', workspace });
       
    } catch (error) {
        res.status(500).json({ message: 'Error removing user from workspace', error });
    }
}

const getWorkSpaceById = async (req, res) => {
    try {
        const { id } = req.params;
        const workspace = await WorkSpace.findById(id);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }
        res.status(200).json(workspace);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching workspace', error });
    }
}
const createWorkSpace = async (req, res) => {
    console.log(req.body)
    try {
        const { name, description ,billing} = req.body;
        const userId = req.user._id;
        //add workspace owner to the members array
        const workspace = await WorkSpace.create({ name, description ,userId,billing});
        res.status(201).json(workspace);
    } catch (error) {
        res.status(500).json({ message: 'Error creating workspace', error });
    }
}
const updateWorkSpace = async (req, res) => {
    try {
        const { id } = req.params;
        const workspace = await WorkSpace.findById(id);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }
        
        const updatedWorkspace = await WorkSpace.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedWorkspace);
    } catch (error) {
        res.status(500).json({ message: 'Error updating workspace', error });
    }
}
const deleteWorkSpace = async (req, res) => {
    try {
        const { id } = req.params;          
        const workspace = await WorkSpace.findById(id);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }
        await WorkSpace.findByIdAndDelete(id);
        res.status(200).json(id);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting workspace', error });
    }
}
module.exports = {
    getWorkSpace,
    getWorkSpaceById,
    createWorkSpace,
    updateWorkSpace,
    deleteWorkSpace,
    inviteToWorkspace,
    getMyWorkSpaces,
    revokeInvite
}