const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Quizzes = new Schema({
    //Name of the quiz
    name: {
        type: String
    },

    //A list of the questions and their answers
    contents: {
        type: Array
    },

    //This is the amount of time the user has to complete the quiz
    timeLimit: {
        type: String
    },

    //The type of quiz it is
    quizType: {
        type: String,
        default: "Multiple Choice"
    },

    category: {
        type: String,
    },

    //The author of the quiz
    author: {
        type: String,
        default: "Anonymous"
    },

    //The number of times the quiz has been played
    plays: {
        type: Number,
        default: 0
    },

    //This will populate with every submitted attempt at the quiz. It will allow us to create leaderboards
    quizTakers: {
        type: Schema.Types.ObjectId,
        ref: "TakenQuizzes"
    },

    //This is when the quiz was created
    quizCreatedAt: {
        type: Date,
        default: Date.now()
    },

    highScore: {
        type: Object,
        default: {
            username: undefined,
            correct: 0,
            time: 1000000
        }
    },

    description: {
        type: String,
    }
})

module.exports = mongoose.model("Quizzes", Quizzes)