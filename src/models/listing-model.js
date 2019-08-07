var mysqlConn = require("../database/database");

module.exports = class User {
  constructor(newId, serviceProviderIdInput, nameInput, locationInput, priceInput, descriptionInput){
    this.id = newId
    this.serviceProviderId = serviceProviderIdInput;
    this.name = nameInput;
    this.location = locationInput;
    this.price = priceInput;
    this.description = descriptionInput;
    this.imgUrl = [];
  }

  getListings() {
    return new Promise((resolve, reject) => {
      mysqlConn.query('SELECT * FROM listing', function(err, res) {
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

  createListing(AuthListing) {
    return new Promise((resolve, reject) => {
      mysqlConn.query("INSERT INTO listing set ?", AuthListing, function(err, res) {
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

  getAllListings() {
    return new Promise((resolve, reject) => {
      mysqlConn.query("Select * from listing", function(err, res) {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          console.log("Listings : ", res);
          //resolve(res);
          let listings = res;
          mysqlConn.query(
            "Select * from listing_imgurl_mapping WHERE listingId in (select id FROM listing);",
            function(err, res) {
              if(err) {
                console.log("error: ", err);
                reject(err);
              } else {
                listings.forEach(listing => {
                  listing.imgUrl = [];

                  console.log(res)
                  res.forEach(obj => {
                    if(obj.listingId == listing.id) {
                      console.log(obj.imgUrl)
                      listing.imgUrl.push(obj.imgUrl);
                    }
                  });
                });
                console.log("Listings :", res);
                resolve(listings);
              }
            }
          )
        }
      });
    });
  };

  getListingById (userId) {
    return new Promise((resolve, reject) => {
    mysqlConn.query("Select * from listing where id = ? ", userId, function(
      err,
      res
    ) {
      if (err) {
        console.log("error: ", err);
        reject(err);
      } else {
        //resolve(res);
        console.log("Listings : ", res);
          //resolve(res);
          let listings = res;
          mysqlConn.query(
            "Select * from listing_imgurl_mapping WHERE listingId in (select id FROM listing);",
            function(err, res) {
              if(err) {
                console.log("error: ", err);
                reject(err);
              } else {
                listings.forEach(listing => {
                  listing.imgUrl = [];

                  console.log(res)
                  res.forEach(obj => {
                    if(obj.listingId == listing.id) {
                      console.log(obj.imgUrl)
                      listing.imgUrl.push(obj.imgUrl);
                    }
                  });
                });
                console.log("Listings :", res);
                resolve(listings);
            }
          }
          )
      }
    });
  });
  };


  getByProviderId (providerId) {
    return new Promise((resolve, reject) => {
    mysqlConn.query("Select * from listing where serviceProviderId = ? ", providerId, function(
      err,
      res
    ) {
      if (err) {
        console.log("error: ", err);
        reject(err);
      } else {
        //resolve(res);
        console.log("Listings : ", res);
          //resolve(res);
          let listings = res;
          mysqlConn.query(
            "Select * from listing_imgurl_mapping WHERE listingId in (select id FROM listing);",
            function(err, res) {
              if(err) {
                console.log("error: ", err);
                reject(err);
              } else {
                listings.forEach(listing => {
                  listing.imgUrl = [];

                  console.log(res)
                  res.forEach(obj => {
                    if(obj.listingId == listing.id) {
                      console.log(obj.imgUrl)
                      listing.imgUrl.push(obj.imgUrl);
                    }
                  });
                });
                console.log("Listings :", res);
                resolve(listings);
            }
          }
          )
        }
    });
  });
  };


  updateListingById (listingId, listing) {
    return new Promise((resolve, reject) => {
    mysqlConn.query(
      "UPDATE listing SET serviceProviderId = ?, name = ?, location = ?, price = ?, description = ? WHERE id = ?",
      [listing.serviceProviderId, listing.name, listing.location, listing.price, listing.description, listingId],
      function(err, res) {
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

  removeListing (userId) {
    return new Promise((resolve, reject) => {
    mysqlConn.query("DELETE FROM listing WHERE id = ?", userId, function(err, res) {
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
