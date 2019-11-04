const router = require("express").Router();
const passport = require('passport');
const usersController = require("../../controllers/usersController");
const quiz = require("../../controllers/quizController");


//Route to take a quiz
router.route("/take/:id")
    .post(passport.authenticate('local', { failureRedirect: '/login' }), quiz.findQuizById)

router.route("/search/")
    .get(quiz.searchQuiz)


module.exports = router;