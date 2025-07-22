const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workspaceBillingSchema = new Schema({
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
   status: {
       type: String,
       enum: ['active', 'suspended', 'cancelled'],
       default: 'active'
   },
   workspaceId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'WorkSpace',
       required: true
   }
}, {
    timestamps: true
});

const WorkspaceBilling = mongoose.model('WorkspaceBilling', workspaceBillingSchema);
module.exports = WorkspaceBilling;