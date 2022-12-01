const { Question } = require("../models/Question")
const commentModel = require("../models/comment")
const comment = require("../models/comment")

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
const addComment = async (req, res) => {
   // let userId = await User.findOne({email : req.session.email})
    let newComment = new commentModel(req.body);
    newComment.owner = userId._id;
    newComment.questionId = req.params.id;
    newComment.save()
    .then( (comment) => {
        question.findById(req.params.id)
            .then( (qesut) => {
                qesut.comments.push(comment)
                qesut.save()
                res.redirect(`/question/${req.params.id}`)
            }).catch( (err) => {
                console.log(err)
            })
        
    }).catch( (err) => {
        console.log(err)
    })
}

const deleteComment = (req, res) => {
    comment.findByIdAndDelete({_id: req.params.id})
    .then(result =>res.redirect("/"))
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
