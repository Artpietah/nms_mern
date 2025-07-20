const router = require('express').Router();
const { getWorkSpace,getMyWorkSpaces, getWorkSpaceById, createWorkSpace, updateWorkSpace, deleteWorkSpace,inviteToWorkspace,revokeInvite} = require('../../controllers/workspace/workspaceController');
const { verifyToken } = require('../../middleware/authMiddleware');
const { isWorkspaceMember, isWorkspaceOwner,limitWorkspaceMembers } = require('../../middleware/workspaceMiddleware');

router.get('/',  verifyToken,getWorkSpace);
router.get('/me',  verifyToken,getMyWorkSpaces).post('/create', verifyToken, createWorkSpace);
router.post('/invite', verifyToken,isWorkspaceOwner,limitWorkspaceMembers, inviteToWorkspace);
router.post('/invite/revoke', verifyToken,isWorkspaceOwner, revokeInvite);
router.get('/:id', verifyToken, getWorkSpaceById);
router.put('/:id', verifyToken,isWorkspaceOwner, updateWorkSpace);
router.delete('/:id', verifyToken,isWorkspaceOwner, deleteWorkSpace);


module.exports = router;