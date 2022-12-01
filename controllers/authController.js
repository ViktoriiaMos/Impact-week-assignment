// const userModel = require('../models/User')
// const bcrypt = require('bcrypt')

// const getLogInPage = (req, res) => {
//     res.render('logIn')
// }
// const getSignUpPage = (req, res) => {
//     res.render('signUp')
// }
// const createNewUser = (req, res) => {
//     if(req.body.password.length < 8){
//         res.render('index', {
//             err: "Password should be 8 or more",
//             result: "",
//             logInerr: ""
//         })
//     } else {
//         let hashedPass = bcrypt.hashSync(req.body.password, 12);
//         if(!hashedPass){
//             res.render('index', {
//                 err: "Something wrong",
//                 result: "",
//                 logInerr: ""
//             })
//         } else {
//             let userData = {
//                 ...req.body,
//                 password: hashedPass
//             }
//             let newUser = new userModel(userData)
//             newUser.save()
//                 .then( (user) => {
//                     res.render('index', {
//                         err: "",
//                         logInerr: ""
//                     })
//                 })
//                 .catch( err => {
//                     throw err;
//                 })
//         }
//     }
// }

// module.exports = {
//     getLogInPage,
//     getSignUpPage,
//     createNewUser
// }

const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secret', {
    expiresIn: maxAge
  });
};

// controller actions
const signup_get = (req, res) => {
  res.render('signup');
}

const login_get = (req, res) => {
  res.render('login');
}

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

const logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post,
  logout_get
}