const userModel = require('../models/users')
const { Question } = require("../models/Question")
const bcrypt = require('bcrypt')
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

const getLogInPage = (req, res) => {
    res.render('logIn')
}
const getSignUpPage = (req, res) => {
    res.render('signUp')
}





const createNewUser = (req, res) => {
    if(req.body.password.length < 8){
        res.render('index', {
            err: "Password should be 8 or more",
            result: "",
            logInerr: ""
        })
    } else {
        let hashedPass = bcrypt.hashSync(req.body.password, 12);
        if(!hashedPass){
            res.render('index', {
                err: "Something wrong",
                result: "",
                logInerr: ""
            })
        } else {
            let userData = {
                ...req.body,
                password: hashedPass
            }
            let newUser = new userModel(userData)
            newUser.save()
                .then( (user) => {
                    res.render('index', {
                        err: "",
                        logInerr: ""
                    })
                })
                .catch( err => {
                    throw err;
                })
        }
    }
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

 module.exports = {
     getHomePage,
     getAddQuestionPage,
     getLogInPage,
     getSignUpPage,
     postQuestion,
     getOneQuestionPage,
     createNewUser,
     updateOneQuestion,
     deleteOneQuestion
 }
