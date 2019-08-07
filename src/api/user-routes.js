const express = require('express');
const router = express.Router();
//const UserService = require("../services/user-service");
//const userService = new UserService();


const User = require('../models/user-model')


router.get("/", (req, res) => {
    User.prototype
      .getUsers()
      .then(result => {
        //var parseData = JSON.parse(result);
        res.send(result);
      })
      .catch(err => {
        res.status(400).json({ msg: err.message });
      });
  });

// router.get('/', function(req, res) {
//     User.prototype
//     .getUsers()
//     .then(users =>{
//         res.send(users);
//     }).catch(err =>{
//         res.status(400).send(err);
//     })
// });

router.post('/', function(req, res) {
    User.prototype
        .createUser(req.body)
        .then(users =>{
            res.send(users);
        }).catch(err =>{
            res.status(400).send(err);
    })
});

router.get('/getAllUsers', function(req, res) {
  User.prototype
      .getAllUsers(req.body)
      .then(users =>{
          res.send(users);
      }).catch(err =>{
          res.status(400).send(err);
  })
});

router.get('/:id', function(req, res) {
  User.prototype
      .getUserById(req.params.id)
      .then(users =>{
          res.send(users);
      }).catch(err =>{
          res.status(400).send(err);
  })
});

router.post('/updateUserById', function(req, res) {
  User.prototype
      .updateUserById(req.body.id, req.body)
      .then(users =>{
          res.send(users);
      }).catch(err =>{
          res.status(400).send(err);
  })
});

router.post('/removeUser', function(req, res) {
  User.prototype
      .removeUser(req.body.id)
      .then(users =>{
          res.send(users);
      }).catch(err =>{
          res.status(400).send(err);
  })
});







module.exports = router;

