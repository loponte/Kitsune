const mongoose = require('mongoose');
let Schema = mongoose.Schema({
    guildId: String,
    channelId: String
})

module.exports = mongoose.model('welcomes', Schema);