const { Schema } = require("mongoose")
const mongoose = require("./database")
const uniqueValidator = require('mongoose-unique-validator')

const gameQcmSchema = mongoose.Schema({
    idGame: {
        type: Schema.Types.ObjectId,
        require: true,
    },
    questions: [
        {
          number:{
            type: Number,
            required: true
          },
          question: {
            type: String,
            required: true
          },
          possibleAnswers: [
            {
              number: {
                type: Number,
                required: true
              },
              answer: {
                type: String,
                required: true
              }
            }
          ],
          correctResponseNumber: {
            type: Number,
            required: true
          }
        }
      ]
    });



module.exports = mongoose.model('gameQcm',gameQcmSchema)
