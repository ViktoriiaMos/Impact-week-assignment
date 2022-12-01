const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers')
const authController = require('../controllers/authController')

router.get('/', controller.getHomePage);
router.get('/addQuestion', controller.getAddQuestionPage);
router.post('/', controller.postQuestion);
router.get('/question/:id', controller.getOneQuestionPage);
router.all('/question/edit/:id', controller.updateOneQuestion)
router.get('/question/delete/:id', controller.deleteOneQuestion)

// router.get('/auth', authController.getLogInPage);
// router.get('/signup',authController.getSignUpPage);
// router.post('/create-new-user', authController.createNewUser);

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

router.post('/add/:id/comments/comments/create', controller.addComment)
router.post('/delete/:id/comment', controller.deleteComment)

module.exports = router;