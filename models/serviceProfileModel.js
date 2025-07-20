const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceProfileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    validity: {
        type: String,
        required: true
    },
    bytes: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkSpace',
        required: true

    },
    sales: {
        count: {
            type: Number,
            default: 0
        },
        amount: {
            type: Number,
            default: 0
        }
    },
    serviceType: {
        type: String,
        enum: ['pppoe', 'vlan'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'disabled'],
        default: 'active'
    }
}, 
{
        timestamps: true
});
    
const ServiceProfile = mongoose.model('ServiceProfile', serviceProfileSchema);
module.exports = ServiceProfile;


    