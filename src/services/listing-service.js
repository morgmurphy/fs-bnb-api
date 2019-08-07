var Listing = require("../models/listing-model");

module.exports = class ListingService {
  constructor() {}

  getListings() {
    return new Promise((resolve, reject) => {
      Listing.getAllListings((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}