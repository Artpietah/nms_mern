const Workspace = require("../models/workspaceModel")

const isWorkspaceMember = async (req, res, next) => {
    try {
        const workspaceId = req.params.id;
        const user = req.user;

        const workspace = await Workspace.findById(workspaceId);    
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }
       
        const isMember = workspace.members.some(member => member.userId.toString() === user._id.toString());
        if (!isMember && workspace.userId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'You are not a member of this workspace' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking workspace membership', error });
    }
};

const isWorkspaceOwner = async (req, res, next) => {
    
    try {
        const workspaceId = req.body.workspaceId ;
        const user = req.user;
        // console.log(workspaceId)

        const workspace = await Workspace.findById(workspaceId.toString());
        // console.log(workspace)

        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        if (workspace.userId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'You are not the owner of this workspace' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking workspace ownership', error });
    }
};

// Middleware to limit members to 4 per workspace and make sure we only have one per role
const limitWorkspaceMembers = async (req, res, next) => {
    const rolesAllowed = ['technitian', 'accountant', 'user'];
    const workspaceId = req.body.workspaceId ;
    const user = req.user;
   try {
    // console.log(workspaceId)

    const workspace = await Workspace.findById(workspaceId.toString());
    // console.log(workspace)
    if (!workspace) {
        return res.status(404).json({ message: 'Workspace not found' });
    }
    const members = workspace.members || [];
    // Check if the number of members exceeds the limit
    if (members && members.length > 4) {
        return res.status(400).json({ message: 'Workspace can have a maximum of 4 members' });
    }
    // check if the role provided in the request body is valid
    if (!req.body.role || !rolesAllowed.includes(req.body.role)) {
        return res.status(400).json({ message: 'Invalid role provided' });
    }
    // add the user to the workspace members array
    
    members.push({ userId: user._id, role: req.body.role });
    workspace.members = members;

    // Check if there are more than one member with the same role
    const roleCounts = {};
    for (const member of members) {
        if (rolesAllowed.includes(member.role)) {
            roleCounts[member.role] = (roleCounts[member.role] || 0) + 1;
            if (roleCounts[member.role] > 1) {
                return res.status(400).json({ message: `Only one member can have the role of ${member.role}` });
            }
        }
    }
    
    // Check if the user is already a member of the workspace
        next();
        
    } catch (error) {
        res.status(500).json({ message: "Error checking workspace membership.", error });
    }

}


module.exports = { isWorkspaceMember, isWorkspaceOwner ,limitWorkspaceMembers};