const mongoose = require('mongoose');
const { Schema } = mongoose;

const hotspotUserSchema = new Schema({
        name: {
            type: String,
           
        },
        phone: {
            type: String,
            unique: true,
            required: true
       
        },
        
        email: {
            type: String,
        
        },
        password: {
            type: String,
        
        },
        lastSeen: Date, // Add the lastSeen
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        },
        
        
    }, 
    {
        timestamps: true
    }
);

const hotspotTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    routerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Router',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HotspotUser',
        required: true
    },
    isShared: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    expiry: {
        type: Date,
    },
    resource: {
        name: {
            type: String,
            required: true
        },
        alocated: {
            type: String,
            required: true
        },
        consumed:{
            type: String,
            required: true
        },
        usage: {
            device : { mac: String, name: String ,data: String}
        }
    },
    comment: {
        type: String
    },

}, {
    timestamps: true
});

const hotspotProfileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price:{
        type: Number
    },
    validity: {
        type: String
    },
    bytes: {
        type: String
    },
    rate: {
        type: String
    },
    
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkSpace',
        required: true
    },
    sales: {
        count:{
            type: Number,
            default: 0
        },
        amount: {
            type: Number,
            default: 0
        }
    },
    impression: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
const HotspotUser = mongoose.model('HotspotUser', hotspotUserSchema);
const HotspotToken = mongoose.model('HotspotToken', hotspotTokenSchema);
const HotspotProfile = mongoose.model('HotspotProfile', hotspotProfileSchema);

module.exports = {
    HotspotUser,
    HotspotToken,
    HotspotProfile
};