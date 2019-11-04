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
        db.Quizzes.find(this.searchQuery(req), function(err, data){
            if(err){
                console.log(err)
            }
            res.json(data)
        })
    },

    searchQuizByPopularity: function(req, res){
        db.Quizzes.find(this.searchQuery(req)).sort({plays: -1}).then(function(err, res){
            if(err) console.log(err);
            res.json(data)
        })
    },

    searchQuizByOldest: function(req, res){
        db.Quizzes.find(this.searchQuery(req)).sort({quizCreatedAt: 1}).then(function(err, res){
            if(err) console.log(err);
            res.json(data)
        })
    },

    searchQuizByNewest: function(req, res){
        db.Quizzes.find(this.searchQuery(req)).sort({quizCreatedAt: -1}).then(function(err, res){
            if(err) console.log(err);
            res.json(data)
        })
    },

    Search: function(){
        this.conditionAdder = function(req){
            if(req.query.category){
                this.category = req.params.category
            }

            if(req.query.name){
                this.name = req.params.name
            }

            if(req.query.author){
                this.author = req.params.author
            }
        };
    },

    searchQuery: function(req){
        let search = new this.Search()
        search.conditionAdder(req)
        return search
    },

    takeQuiz: function(req, res){
        db.TakenQuizzes.create(req.body, function(err){
            if(err){
                console.log(err)
            }
            db.Quizzes.findByIdAndUpdate(req.body.quizId, {$set: {plays: plays+1}}, function(err, data){

            })
        })
    }
}

module.exports = orm