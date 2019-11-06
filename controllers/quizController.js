const db = require("../models/index");
const passport = require('passport');

const orm = {
    //Function to find one quiz and return it
    findQuizById: function(req, res){
        db.Quizzes.findOne({id: req.params.quizId}, function(err, data){
            if(err){
                console.log(err)
            }
            res.json(data)
        })
    },

    searchQuiz: function(req, res){
        console.log("hi")
        db.Quizzes.find(this.searchQuery(req))
            .then(data=>{
                res.json(data)
            })
            .catch(err=>{
                if (err) console.log(err)
            })
    },

    searchQuizByPopularity: function(req, res){
        db.Quizzes.find(this.searchQuery(req)).sort({plays: -1}).then(data=>{
            res.json(data)
        }).catch(err=>console.log(err))
    },

    searchQuizByOldest: function(req, res){
        db.Quizzes.find(this.searchQuery(req)).sort({quizCreatedAt: 1}).then(data=>{
            res.json(data)
        }).catch(err=>console.log(err))
    },

    searchQuizByNewest: function(req, res){
        db.Quizzes.find(this.searchQuery(req)).sort({quizCreatedAt: -1}).then(data=>{
            res.json(data)
        }).catch(err=>console.log(err))
    },

    //Constructor for search queries
    Search: function(){
        this.conditionAdder = function(req){
            if(req.query.category){
                this.category = req.query.category
            }

            if(req.query.name){
                this.name = req.query.name
            }

            if(req.query.author){
                this.author = req.query.author
            }
        };
    },

    searchQuery: function(req){
        let search = new this.Search()
        search.conditionAdder(req)
        return search
    },

    quizTake: function(req, res){
        db.TakenQuizzes.create(req.body).then(data=>{
            db.UserData.findOneAndUpdate({username: req.body.username}, { $push: { quizzesPlayed: dbTakenQuiz._id } }, { new: true }).then(dbUserData=>{
                db.Quizzes.find({_id: req.body.quizId}).then(dbQuiz=>{
                    let updateQuery = this.updateQueryMaker(req, dbQuiz)
                    db.Quizzes.findOneAndUpdate({_id: req.body.quizId}, updateQuery, {new: true})
                    .populate("TakenQuizzes")
                    .then(Quiz=>{
                        res.json(Quiz)
                    })
                } )
            })
        })
    },

    addQuiz: function(req, res){
        db.Quizzes.create(req.body)
        .then(dbQuiz=>{
            return db.UserData.findOneAndUpdate({username: req.body.username}, { $push: { createdQuizzes: dbQuiz._id } }, { new: true });
        })
        .then(dbUser=>{
            res.json(dbUser)
        })
        .catch(err=>console.log(err))
    },

    updateQueryMaker: function(req, dbTakenQuiz){
        let newUpdateQuery = new UpdateQuery(req, dbTakenQuiz)
        newUpdateQuery.$set(req, dbTakenQuiz)
        return newUpdateQuery
    },

    UpdateQuery: function(req, dbTakenQuiz){
        this.$push = {
            quizTakers: dbTakenQuiz._id
        }

        this.$set = function(){
            if(dbTakenQuiz.highScore.correct===req.body.correct && dbTakenQuiz.highScore.time > req.body.time){
                return(this.$set={
                    highScore: {
                        username: req.body.username,
                        correct: req.body.correct,
                        time: req.body.time
                    }
                })
            }
            else if(dbTakenQuiz.highScore.correct > req.body.correct){
                return(this.$set={
                    highScore: {
                        username: req.body.username,
                        correct: req.body.correct,
                        time: req.body.time
                    }
                })
            }
            else{
                return
            }
        }
    },

    userFinder: function(req, res){
        let user = req.params.user;
        db.UserData.findOne({username: user}).populate("Quizzes").then(data=>{
            res.json(data)
        })
    },

    

}

module.exports = orm