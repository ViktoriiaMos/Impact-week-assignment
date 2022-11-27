const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers')

router.get('/', controller.getHomePage);
router.get('/addQuestion', controller.getAddQuestionPage)
router.get('/auth', controller.getLogInPage)


module.exports = router;