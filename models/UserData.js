const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserData = new Schema({
    //Username
    username: {
        type: String
    },

    //Quizzes they created
    createdQuizzes: {
        type: Schema.Types.ObjectId,
        ref: "Quizzes"
    },

    //A list of every quiz they've taken and how they did
    quizzesPlayed: {
        type: Schema.Types.ObjectId,
        ref: "TakenQuizzes"
    },

    userJoinedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("UserData", UserData)