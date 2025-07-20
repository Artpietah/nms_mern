const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    workspaces: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace'
        }],
        default: []
    },
    lastSeen: Date, // Add the lastSeen
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;