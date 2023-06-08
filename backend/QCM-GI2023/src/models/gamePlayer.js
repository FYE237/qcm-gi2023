const { Schema } = require("mongoose")
const mongoose = require("./database")
const uniqueValidator = require('mongoose-unique-validator')

const gamePlayerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    idGame: {
        type: Schema.Types.ObjectId,
        require: true,
    },
    points: {
        type: Number,
    },
    idSocket: {
        type: String,
        required: true,
        unique: true
    }
})


module.exports = mongoose.model('gamePlayer',gamePlayerSchema)
