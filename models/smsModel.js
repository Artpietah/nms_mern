const mongoose = require('mongoose');
const { Schema } = mongoose;

const smsSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    message: {
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
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Sms', smsSchema);
