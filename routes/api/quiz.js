const router = require("express").Router();
const passport = require('passport');
const usersController = require("../../controllers/usersController");
const quiz = require("../../controllers/quizController");


//Route to take a quiz
router.route("/take/:id")
    .get(function(req, res){
        quiz.findQuizById(req, res)
    })

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
    .post(function(req, res){
        quiz.addQuiz(req, res)
    })

router.route("/submit")
    .post(function(req, res){
        quiz.takeQuiz(req, res)
    })

router.route("/user/:user")
    .get(function(req, res){
        quiz.userFinder(req, res)
    })


module.exports = router;