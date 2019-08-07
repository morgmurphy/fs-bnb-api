const User = require("../models/user-model")

var booking = require("../models/booking-model");
var Auth = require("../database/database");

var fs = require("fs");

var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

module.exports = class BookingService {
  constructor() {}

  getBookings() {
    return new Promise((resolve, reject) => {
      User.getAllBookings((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  bookNow(authBooking) {
    return new Promise((resolve, reject) => {
      // if (!validationService.isValidRegisterBody(user)) {
      //   reject("Invalid payload")
      // }
      User.prototype.getAllBookings()
        .then(bookings => {
          let dbBooking = bookings.filter(booking => {
            return booking.date_from == authBooking.date_from;
          });
          if (dbBooking.length == 1) {
            reject("This date is already taken");
          }
          else {

            const bookingObj = {
              date_from: authBooking.date_from,
              date_to: authBooking.date_to,
              user_id: authBooking.user_id,
              listing_id: authBooking.listing_id,
            };
            const newBooking = new User(bookingObj);
            newBooking.createBooking(authBooking)
              .then(success => resolve(success))
              .catch(error => reject(error))
          }

        })
        .catch(err => reject(err))

      })

}

}