const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Maksym_Lohvinov:Max_240208@cluster0.ionvdvy.mongodb.net/?retryWrites=true&w=majority')

    .then( () => console.log('DB connected'))
    .catch( err => console.log(err))