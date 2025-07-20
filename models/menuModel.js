const mongoose = require('mongoose');
const { Schema } = mongoose;

const menuSchema = new Schema({
    tittle: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    icon: {
        type: String,
    },
    access : {
        type: String,
        enum: ['admin', 'technitian', 'accountant', 'user', 'all'],
        default: 'all'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
   