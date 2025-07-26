const mongoose = require('mongoose');
const { Schema } = mongoose;

const kopokopoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    tillNumber: {
        type: String,
        required: true
    },
    consumerKey: {
        type: String,
        required: true
    },
    consumerSecret: {
        type: String,
        required: true
    },
    passKey: {
        type: String,
        required: true
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkSpace',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

const  mpesaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    shortCode: {
        type: String,
        required: true
    },
    partyB: {
        type: Number,
        required: true
    },
    consumerKey: {
        type: String,
        required: true
    },
    consumerSecret: {
        type: String,
        required: true
    },
    passKey: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['paybill', 'till'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

const Kopokopo = mongoose.model('Kopokopo', kopokopoSchema);
const MpesaBuyGoods = mongoose.model('MpesaBuyGoods', mpesaBuyGoodsSchema);
const MpesaPaybill = mongoose.model('MpesaPaybill', mpesaPaybillSchema);
module.exports = {
    Kopokopo,
    mpesaSchema
};