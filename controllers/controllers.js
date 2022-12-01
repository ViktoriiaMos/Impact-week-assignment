const { Question } = require("../models/Question");
const User = require("../models/User");
const {Comment} = require('../models/Comment');

const getHomePage = (req, res) => {
    Question.find()
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
    // Question.findById({_id: req.params.id}).populate('comments')
    // .then(result =>
    //     res.render('oneQuestion', { result , email: req.email}))
    // .catch(err => console.log(err))
   
}


const postQuestion = (req, res) => {
    // console.log(req.body)
     const question = new Question(req.body)
     question.save()
         .then( result => res.redirect('/'))
         .catch(err =>res.render('index', {err}))
 }
 
 const getOneQuestionPage = (req, res) => {
    Question.findById({ _id: req.params.id})
    .then(result =>
    res.render('oneQuestion', { result }))
    .catch(err => console.log(err))  
 }
 
 const updateOneQuestion = (req, res) => {
    if (req.method === 'GET') {
        Question.findById({ _id: req.params.id })
            .then(result =>
                res.render('editQuestion', { result }))
            .catch(err => console.log(err))
    }
    if (req.method === 'POST') {
        Question.findByIdAndUpdate({ _id: req.params.id })
            .then(result => {
                result.title = req.body.title
                result.message = req.body.message
                result.save()
                    .then(() =>
                     res.render('oneQuestion', { result }))
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
    const comment = new Comment({
    author: User.email,
    comment: req.body.comment
 });
comment.save((err, result) => {
    if(err) {
        console.log(err)
    }else{
        Question.findById(req.params.id, (err, question) =>{
            if(err){
                console.log(err)
            }else{
                console.log(question.comments)
                question.comments.push(result);
                question.save();
                res.redirect('oneQuestion')
            }
        })
        console.log(result);
        res.redirect('oneQuestion')
    }
})
 }

const deleteComment = (req, res) => {
    Comment.findByIdAndDelete({_id: req.params.id})
    .then(result =>res.redirect('/'))
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
