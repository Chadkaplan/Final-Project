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

    takeQuiz: function(req, res){
        db.TakenQuizzes.create(req.body, function(err){
            if(err){
                console.log(err)
            }
            db.Quizzes.findByIdAndUpdate(req.body.quizId, {$set: {plays: plays+1}}, function(err, data){

            })
        })
    },

    addQuiz: function(req, res){
        db.Quizzes.create(req.body).then(data=>res.json(data)).catch(err=>console.log(err))
    }
}

module.exports = orm