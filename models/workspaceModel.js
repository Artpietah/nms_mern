
const mongoose = require('mongoose');
const { Schema } = mongoose;

const workspaceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workspaceLevel: {
        type: String,
        enum: ['starter', 'standard', 'premium'],
        default: 'starter'

    },
    balance: {
        type: Number,
        default: 0
    },
    billing: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        interval: {
            type: String,
            enum: ['day', 'week', 'month', 'year'],
            default: 'month'
        },
        
    },
    members: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        role: {
            type: String,
            enum: ['admin', 'technitian', 'accountant', 'user'],
            default: 'admin'
        },
    
        dateCreated: {
            type: Date,
            default: Date.now
        },
        dateJoined: {
            type: Date,
        },
        lastSeen: {
            type: Date,
        },
        status: {
            type: String,
            enum: ['pending', 'active', 'suspended'],
            default: 'pending'
        }
    }],
    notification: [
        {
            tittle: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            type: {
                type: String,
                enum: ['info', 'warning', 'error'],
                default: 'info'
            },
            status: {
                type: String,
                enum: ['read', 'unread'],
                default: 'unread'
            },
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'active', 'expired', 'suspended', 'cancelled'],
        default: 'pending'
    },
}, {
    timestamps: true
});

const WorkSpace = mongoose.model('WorkSpace', workspaceSchema);

module.exports = WorkSpace;