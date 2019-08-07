var User = require("../models/user-model");

module.exports = class UserService {
  constructor() {}

  getUsers() {
    return new Promise((resolve, reject) => {
      User.getAllUsers((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  getProviders() {
    return new Promise((resolve, reject) => {
      mysqlConn.query('SELECT * FROM provider', function(err, res) {
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
}