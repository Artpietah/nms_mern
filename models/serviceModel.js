const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
    serviceType: {
        type: String,
        enum: ['ppoe', 'vlan'],
        required: true
    },
    serviceName: {
        type: String,
    },
    password: {
        type: String,
    },
    vlanId: {
        type: String,
        required: function() {
            return this.serviceType === 'vlan';
        }
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    routerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Router',
        required: true
    },
    serviceIP: {
        type: String,
    },
    serviceGateway: {
        type: String,
    }
    ,
    serviceDNS: {
        type: String,
    },
    bytes: {
        type: String,
    },
    rate: {
        type: String,
    },
    amount: {
        type: Number,
    },
    cycle: {
        type: String,
    },
    balance: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'terminated'],
        default: 'active'
    }
}, {
    timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;