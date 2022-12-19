const express = require('express');
const mongoose = require('mongoose');
const router = require('./config/router');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

app.use('/public', express.static('public'));

app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))

require('./config/mongoose')



app.listen(4200, ()=> console.log('Running on 4200'))

// routes
app.get('*', checkUser);
// app.get('/addQuestion', requireAuth, (req, res) => res.render('addQuestion'));
app.use(router)