const router = require("express").Router();
const passport = require('passport');
const usersController = require("../../controllers/usersController");
const quiz = require("../../controllers/quizController");


//Route to take a quiz
router.route("/take/:id")
    .post(passport.authenticate('local', { failureRedirect: '/login' }), quiz.findQuizById)

router.route("/search/")
    .get(function(req, res){
        quiz.searchQuiz(req, res)
    })

router.route("/searchByNewest/")
    .get(function(req, res){
        quiz.searchQuizByNewest(req, res)
    })

router.route("/searchByOldest/")
    .get(function(req, res){
        quiz.searchQuizByOldest(req, res)
    })

router.route("/searchByPopular/")
    .get(function(req, res){
        quiz.searchQuizByPopularity(req, res)
    })

router.route("/create")
    .get(function(req, res){
        quiz.addQuiz(req, res)
    })


module.exports = router;