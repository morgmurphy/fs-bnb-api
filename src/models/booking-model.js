const express = require('express');
const router = express.Router();
var mysqlConn = require("../database/database");

module.exports = class User {
  constructor(newId, date_fromInput, date_toInput, user_idInput, listing_idInput) {
    this.id = newId
    this.date_from = date_fromInput;
    this.date_to = date_toInput;
    this.user_id = user_idInput;
    this.listing_id = listing_idInput;
  }


  getBookings() {
    return new Promise((resolve, reject) => {
      mysqlConn.query('SELECT * FROM booking', function (err, res) {
        if (err) {
          console.log("error: ", err)
          reject(err)
        } else {
          console.log("Users: ", res)
          resolve(res)
        }

      })
    })
  }

  createBooking(AuthBooking) {
    return new Promise((resolve, reject) => {
      mysqlConn.query("INSERT INTO booking set ?", AuthBooking, function (err, res) {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          console.log(res);
          resolve(res);
        }
      });
    });
  }

  getAllBookings() {
    return new Promise((resolve, reject) => {
      mysqlConn.query("Select * from booking", function (err, res) {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          console.log("Users : ", res);
          resolve(res);
        }
      });
    });
  };

  getBookingById(userId) {
    return new Promise((resolve, reject) => {
      mysqlConn.query("Select * from booking where id = ? ", userId, function (
        err,
        res
      ) {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };

  getByListingId (listing_id) {
    return new Promise((resolve, reject) => {
    mysqlConn.query("Select * from booking where listing_id = ? ", listing_id, function(
      err,
      res
    ) {
      if (err) {
        console.log("error: ", err);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
  };

  // getByListingId(listingId) {
  //   return new Promise((resolve, reject) => {
  //     mysqlConn.query("Select * from booking WHERE listingId in (select id FROM listing);", listingId, function (
  //       err,
  //       res
  //     ) {
  //       if (err) {
  //         console.log("error: ", err);
  //         reject(err);
  //       } else {
  //         resolve(res);
  //       }
  //     });
  //   });
  // };

  // getByListingId() {
  //   return new Promise((resolve, reject) => {
  //     mysqlConn.query("Select * from provider", function (err, res) {
  //       if (err) {
  //         console.log("error: ", err);
  //         reject(err);
  //       } else {
  //         console.log("Bookings : ", res);
  //         //resolve(res);
  //         let bookings = res;
  //         mysqlConn.query(
  //           "Select * from booking WHERE listing_id in (select id FROM listing);",
  //           function (err, res) {
  //             if (err) {
  //               console.log("error: ", err);
  //               reject(err);
  //             } else {
  //               bookings.forEach(listing => {
  //                 booking.status = [];

  //                 console.log(res)
  //                 res.forEach(obj => {
  //                   if (obj.listingId == listing.id) {
  //                     console.log(obj.status)
  //                     listing.imgUrl.push(obj.status);
  //                   }
  //                 });
  //               });
  //               console.log("Bookings :", res);
  //               resolve(bookings);
  //             }
  //           }
  //         )
  //       }
  //     });
  //   });
  // };

  updateBookingById(bookingId, booking) {
    return new Promise((resolve, reject) => {
      mysqlConn.query(
        "UPDATE booking SET date_from = ?, date_to = ?, user_id = ?, listing_id = ?, status = ? WHERE id = ?",
        [booking.date_from, booking.date_to, booking.user_id, booking.listing_id, bookingId],
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  };

  removeBooking(userId) {
    return new Promise((resolve, reject) => {
      mysqlConn.query("DELETE FROM booking WHERE id = ?", userId, function (err, res) {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };


}
