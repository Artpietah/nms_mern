const User = require('../../models/userModel');
const Workspace = require('../../models/workspaceModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//getUser, getUserById, createUser, updateUser, deleteUser , loginUser

const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const workspaces = await Workspace.find({ users: id });
        user.workspaces = workspaces;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
}
const createUser = async (req, res) => {
    const {name, email, password, phone } = req.body;

    // Check if user already exists using email and phone
    const userExistsByEmail = await User.findOne({email});
    const userExistsByPhone = await User.findOne({phone});
    if (userExistsByEmail || userExistsByPhone) {
        return res.status(400).json({ message: 'User details already exists' });
    }
    // pass hashing password
    //generate salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    try {
        const newUser = new User({ name, email, password: hashedPassword, phone });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
 
}
const updateUser = async (req, res) => {

    //check if the user is the owner of the account
    if (req.user._id !== req.params.id) {
        return res.status(403).json({ message: 'You are not authorized to update this user' });
    }
    try {

        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}
const deleteUser = async (req, res) => {
    //check if the user is the owner of the account
    if (req.user._id !== req.params.id) {
        return res.status(403).json({ message: 'You are not authorized to delete this user' });
    }

    return res.status(403).json({ message: 'Deleting user is not allowed' });
    // try {
    //     const { id } = req.params;
    //     const user = await User.findById(id);
    //     if (!user) {
    //         return res.status(404).json({ message: 'User not found' });
    //     }
    //     await User.findByIdAndDelete(id);
    //     res.status(200).json(id);
    // } catch (error) {
    //     res.status(500).json({ message: 'Error deleting user', error });
    // }   
}
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Generate JWT token valid for 30minutes
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{ expiresIn: '30m' });
    res.status(200).json({token });
    // Set lastSeen to current date
    user.lastSeen = new Date();
    await user.save();
    // Set user status to active
    next();
}

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser ,
    loginUser   
}
