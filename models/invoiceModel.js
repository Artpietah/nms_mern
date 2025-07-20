const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
    },
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['paid', 'unpaid', 'overdue'],
        default: 'unpaid'
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkSpace',
        required: true
    }
}, {
    timestamps: true
}); 

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;
