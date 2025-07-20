const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
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
    },
    address: {
        type: String,
    },
    service: [
        {
            serviceId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Service',
                required: true
            }
    }],
    balance: {
        type: Number,
        default: 0
    },
    notification: [
        {   
            workspaceId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'WorkSpace',
            },
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
            dateCreated: {
                type: Date,
                default: Date.now
            }
        }
    ],
    lastSeen: Date, // Add the lastSeen
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;