const mongoose = require("./database")
const uniqueValidator = require('mongoose-unique-validator')

const gameSchema = mongoose.Schema({
    nameCreator: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        require: true,
    },
    statut: {
        type: String,
    },
    duration: {
        type: Number,
        require: true
    },

});


module.exports = mongoose.model('Game',gameSchema)
