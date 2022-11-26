const express = require('express');
const app = express();
const router = require('./config/router');

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}))

require('./config/mongoose')

app.use(router)

app.listen(4200, ()=> console.log('Running on 4200'))