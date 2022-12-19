const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers')
const authController = require('../controllers/authController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');


router.get('/', controller.getHomePage);
//add
router.get('/addQuestion/',requireAuth, controller.getAddQuestionPage);
router.post('/', controller.postQuestion);
//add
router.get('/question/:id', requireAuth, controller.getOneQuestionPage);
router.all('/question/edit/:id', controller.updateOneQuestion)
router.get('/question/delete/:id', controller.deleteOneQuestion)

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

router.post('/add/:id/comments/comments/create', controller.addComment);
router.post('/delete/:commentId/:postId/comment', controller.deleteComment);


module.exports = router;