const {Question}   = require("../models/Question");
const User = require("../models/User");
const Comment = require('../models/Comment');

const getHomePage = (req, res) => {
    Question.find().populate('user')
        .then(result => {
            const x = result.forEach(element => {
               console.log(element)
            });
            res.render('index', {result})}
        )
        .catch( err => console.log(err))   
};

const getAddQuestionPage = (req, res) => {
    res.render('addQuestion')
}


const postQuestion = (req, res) => {
     const question = new Question(req.body)
     question.save()
         .then( result => res.redirect('/'))
         .catch(err =>res.render('index', {err}))
 }


    
 const getOneQuestionPage = (req, res) => {
    Question.findById({ _id: req.params.id})
    .populate("comments").populate("user")
    .then(result => {
        res.render('oneQuestion', { result })
    })
    .catch(err => console.log(err))  
 } 

 const updateOneQuestion = (req, res) => {
    if (req.method === 'GET') {
        Question.findById({ _id: req.params.id })
            .then(result =>
                res.render('editQuestion', { result}))
            .catch(err => console.log(err))
    }
    if (req.method === 'POST') {
        Question.findByIdAndUpdate({ _id: req.params.id })
            .then(result => {
                result.title = req.body.title
                result.message = req.body.message
                result.save()
                    .then(() =>
                     res.redirect('/'))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
 }

 const deleteOneQuestion = (req, res) => {
    Question.findByIdAndDelete({_id: req.params.id})
    .then(result =>res.redirect('/'))
    .catch( err => console.log(err))
}
const addComment = (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, result) => {
        if(err) {
            console.log(err)
        }else{
            Question.findById(req.params.id, (err, question) =>{
                if(err){
                    console.log(err)
                }else{
                    question.comments.push(result);
                    question.save();
                    res.redirect(`/question/${question._id}`)
                }
            })
        }
    })
 }

const deleteComment = (req, res) => {
    Comment.findByIdAndDelete({_id: req.params.commentId})
    .then(result =>{
        res.redirect(`/question/${req.params.postId}`)
    })
    .catch( err => console.log(err))
}



 module.exports = {
     getHomePage,
     getAddQuestionPage,
     postQuestion,
     getOneQuestionPage,
     updateOneQuestion,
     deleteOneQuestion,
     addComment,
     deleteComment
 }
