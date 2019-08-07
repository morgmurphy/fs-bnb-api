const express = require("express")
const router = express.Router()

//const ListingService = require("../services/listing-service");
//const listingService = new ListingService();

const User = require('../models/booking-model')

router.get("/", (req, res) => {
    User.prototype
      .getBookings()
      .then(result => {
        //var parseData = JSON.parse(result);
        res.send(result);
      })
      .catch(err => {
        res.status(400).json({ msg: err.message });
      });
  });

  router.post('/create', function(req, res) {
    User.prototype
        .createBooking(req.body)
        .then(users =>{
            res.send(users);
        }).catch(err =>{
            res.status(400).send(err);
    })
});

router.get('/getAllBookings', function(req, res) {
  User.prototype
      .getAllBookings(req.body)
      .then(users =>{
          res.send(users);
      }).catch(err =>{
          res.status(400).send(err);
  })
});

router.post('/getBookingById', function(req, res) {
  User.prototype
      .getBookingById(parseInt(req.body.id))
      .then(users =>{
          res.send(users);
      }).catch(err =>{
          res.status(400).send(err);
  })
});

router.post('/updateBookingById', function(req, res) {
  User.prototype
      .updateBookingById(req.body.id, req.body)
      .then(users =>{
          res.send(users);
      }).catch(err =>{
          res.status(400).send(err);
  })
});
router.get('/getByListingId/:id', function(req, res) {
  User.prototype
      .getByListingId(parseInt(req.params.id))
      .then(users =>{
          res.send(users);
      }).catch(err =>{
          res.status(400).send(err);
  })
});

router.post('/removeBooking', function(req, res) {
  User.prototype
      .removeBooking(req.body.id)
      .then(users =>{
          res.send(users);
      }).catch(err =>{
          res.status(400).send(err);
      })
});

module.exports = router;