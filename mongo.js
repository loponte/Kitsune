const mongoose = require('mongoose')

const mongoPath = 'mongodb+srv://loponte:lolarato@kitsune.ubj6p.mongodb.net/vips?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose
}