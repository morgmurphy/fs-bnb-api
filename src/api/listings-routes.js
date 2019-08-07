const express = require("express")
const router = express.Router()

//const ListingService = require("../services/listing-service");
//const listingService = new ListingService();

const User = require('../models/listing-model')

router.get("/", (req, res) => {
    User.prototype
      .getListings()
      .then(result => {
        //var parseData = JSON.parse(result);
        res.send(result);
      })
      .catch(err => {
        res.status(400).json({ msg: err.message });
      });
  });

  router.post('/', function(req, res) {
    User.prototype
        .createListing(req.body)
        .then(users =>{
            res.send(users);
        }).catch(err =>{
            res.status(400).send(err);
    })
});

router.get('/getAllListings', function(req, res) {
  User.prototype
      .getAllListings(req.body)
      .then(users =>{
          res.send(users);
      }).catch(err =>{
          res.status(400).send(err);
  })
});

router.get('/:id', function(req, res) {
  User.prototype
      .getListingById(parseInt(req.params.id))
      .then(users =>{
          res.send(users);
      }).catch(err =>{
          res.status(400).send(err);
  })
});

router.get('/getByProviderId/:id', function(req, res) {
  User.prototype
      .getByProviderId(parseInt(req.params.id))
      .then(users =>{
          res.send(users);
      }).catch(err =>{
          res.status(400).send(err);
  })
});

router.post('/update/:id', function(req, res) {
  User.prototype
      .updateListingById(req.params.id, req.body)
      .then(users =>{
          res.send(users);
      }).catch(err =>{
          res.status(400).send(err);
  })
});

router.post('/remove/:id', function(req, res) {
  User.prototype
      .removeListing(parseInt(req.params.id))
      .then(users =>{
          res.send(users);
      }).catch(err =>{
          res.status(400).send(err);
      })
});

module.exports = router;
