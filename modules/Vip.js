const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VipSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
})

mongoose.model('vips', VipSchema);