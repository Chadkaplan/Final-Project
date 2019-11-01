const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Quizzes = new Schema({
    //A list of the questions and their
    contents: {
        type: Array
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
    }
})

module.exports = mongoose.model("Quizzes", Quizzes)