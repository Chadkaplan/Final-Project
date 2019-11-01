const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TakenQuizzes = new Schema ({

    //The username of the person who took the quiz
    username: {
        type: String,
        default: "Anonymous"
    },

    quizCategory: {
        type: String
    },

    quizID: {
        type: String,
    },

    correctPerTotal: {
        type: String
    },

    time: {
        type: Number
    },

    quizTakenAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("TakenQuizzes", TakenQuizzes)