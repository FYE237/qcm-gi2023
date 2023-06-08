const mongoose = require("./database")
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
})


module.exports = mongoose.model('User',userSchema)
