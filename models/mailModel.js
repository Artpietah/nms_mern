const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mailSchema = new Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    sendCount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['sent', 'failed'],
        default: 'sent'
    }  
}, {
    timestamps: true
});

module.exports = mongoose.model('Mail', mailSchema);
