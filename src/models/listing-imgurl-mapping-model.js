var mysqlConn = require("../database/database");
module.exports = class User {
    constructor(newId, listingIdInput, imgUrlInput) {
        this.id = newId,
        this.listingId = listingIdInput,
        this.imgUrl = imgUrlInput
    }


    getImages() {
        return new Promise((resolve, reject) => {
            mysqlConn.query('SELECT * FROM listing_imgurl_mapping', function (err, res) {
                if (err) {
                    console.log("error: ", err)
                    reject(err)
                } else {
                    console.log("Images: ", res)
                    resolve(res)
                }

            })
        })
    }

    createImgage(AuthImage) {
        return new Promise((resolve, reject) => {
          mysqlConn.query("INSERT INTO listing_imgurl_mapping set ?", AuthImage, function(err, res) {
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

      getAllImages() {
        return new Promise((resolve, reject) => {
          mysqlConn.query("Select * from listing_imgurl_mapping", function(err, res) {
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

      getImageById (imageId) {
        return new Promise((resolve, reject) => {
        mysqlConn.query("Select * from listing_imgurl_mapping where id = ? ", imageId, function(
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

      removeImage (imageId) {
        return new Promise((resolve, reject) => {
        mysqlConn.query("DELETE FROM listing_imgurl_mapping WHERE id = ?", imageId, function(err, res) {
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
