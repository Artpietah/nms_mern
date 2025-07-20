const mongoose = require('mongoose');
const { Schema } = mongoose;


const notificationSchema = new Schema({
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkSpace',
    },
    recipientId : {
        type: String
    },
    title: {
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
}, {
    timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;