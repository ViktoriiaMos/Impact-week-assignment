const express = require('express');
const app = express();
const router = require('./config/router');

app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))

require('./config/mongoose')

app.use(router)

app.listen(4200, ()=> console.log('Running on 4200'))