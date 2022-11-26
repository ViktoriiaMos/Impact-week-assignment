const { Question } = require("../models/Question")

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
module.exports = {
    getHomePage,
    getAddQuestionPage,
    getLogInPage
}
