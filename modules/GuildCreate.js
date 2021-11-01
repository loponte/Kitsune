const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuildSchema = new Schema({
    guildID: {
        type: String,
        required: true
    },
    categoryID: {
        type: String,
        required: true
    },
    roleplacementID: {
        type: String,
        required: true
    }
})

mongoose.model('guilds', GuildSchema);