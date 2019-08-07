const express = require('express');
const router = express.Router();
const User = require('../models/user-model')
const AuthService = require("../services/auth-service");
const authService = new AuthService();


router.post('/register/user', function (req, res) {
  console.log("registering user")
  authService
    .register(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ mesg: err });
    });
});

router.post('/register/provider', function (req, res) {
  console.log("registering provider")
  authService
    .registerProvider(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ mesg: err });
    });
});

router.post('/login/user', function (req, res) {
  console.log("this wasfhgs run")
  AuthService.prototype
    .login(req.body.email, req.body.password)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(400).send({ err });
    });
});

router.post('/login/provider', function (req, res) {
  console.log("this wasfhgs run")
  AuthService.prototype
    .loginProvider(req.body.email, req.body.password)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(400).send({ err });
    });
});
module.exports = router;

//this is under user.prototype.then().
// const dbUser = users.filter(user => {
//     return user.email == authUser.email;
// });
// if (dbUser) {
//     if (dbUser[0].password ==authUser.password) {
//         res.send(dbUser[0]);
//     } else{
//         res.status(400)
//     }
// }else {
//     res.status(400).send("user not found")
// }


//alternative
// User.prototype.getUsers().then(users => {
//     const authUser = req.body;
//     //loop through users
//     users.filter(user => {
//         if (user.email == authUser.email) {
//             if (user.password == authUser.password) {
//                 res.send(user)
//             }
//             else {
//                 res.status(400).send("Password incorrect")
//             }
//         } else {
//             res.status(400).send("User not found")
//         }
//     })
// })

