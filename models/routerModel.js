const mongoose = require('mongoose');
const { Schema } = mongoose;

const routerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    serial: {
        type: String,
    },
    ip: {
        type: String,
    },
    dns: {
        type: String,
    },
    accountUser: {
        type: String,
    },
    accountPass: {
        type: String,
    },
    vpnUser: {
        type: String,
    },
    vpnPass: {
        type: String,
    },
    useRadius: {
        type: Boolean,
        default: false
    },
    workspaceId: {
        type: String,
        required: true
    },
    model: {
        type: String,
    },
    location: {
        type: String
    },
    lastseen: {
        type: Date
    },
    bulkSms: [
        {
        
            bulkSmsId: {
                type : String,
                required: true
            }
        }
    ],
    paymentGateway: [
        {
            paymentGatewayId: {
                type : String,
                required: true
            }
        }
    ],
    status: {
        type: String,
        enum: ['inactive', 'provisioning', 'active', 'suspended'],
        default: 'provisioning'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Router = mongoose.model('Router', routerSchema);
module.exports = Router;