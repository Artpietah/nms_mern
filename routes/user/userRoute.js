const router = require('express').Router();
const { getUser, getUserById, createUser, updateUser, deleteUser, loginUser } = require('../../controllers/user/userController');
const { verifyToken } = require('../../middleware/authMiddleware');

router.get('/', getUser).post('/create', createUser);
router.get('/:id', verifyToken, getUserById);
router.put('/:id',verifyToken, updateUser);

// admin rights required / user can only delete their own account
router.delete('/:id',verifyToken, deleteUser);

// frontend user login
router.post('/login', loginUser);

module.exports = router;