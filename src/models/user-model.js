//const express = require('express');
//const router = express.Router();
var mysqlConn = require("../database/database")

fs = require("fs");

const roles = {
  ADMIN: "admin",
  PROVIDER: "provider",
  USER: "user"
}

module.exports = class User {

  constructor( newFirstName, newLastName, newCellPhone, newEmail, newPassword){
    this.id;
    this.firstName = newFirstName;
    this.LastName = newLastName;
    this.cellphone = newCellPhone;
    this.email = newEmail;
    this.password = newPassword;
    this.role = roles.USER;
  }

 
  getUsers() {
    return new Promise((resolve, reject) => {
      mysqlConn.query('SELECT * FROM user', function(err, res) {
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

  getUsersJSON() {
    return new Promise((resolve, reject) => {
      fs.readFile('./src/data/data.json', (err, data) => {
        if (err) {
          reject(err)
        } else {
          let users = JSON.parse(data).users
          resolve(users)
        }

      })
    })
  }

  createUser(AuthUser) {
    return new Promise((resolve, reject) => {
      mysqlConn.query("INSERT INTO user set ?", AuthUser, function(err, res) {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  createProvider(AuthUser) {
    return new Promise((resolve, reject) => {
      mysqlConn.query("INSERT INTO provider set ?", AuthUser, function(err, res) {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  createUserJSON(AuthUser) {
    return new Promise((resolve, reject) => {
      fs.readFile('./src/data/data.json', (err, data) => {
        if (err) {
          reject(err)
        } else {
          let users = JSON.parse(data).users;
          users.push(AuthUser);
          let dataObject = {
            "users": users
          }
          let userJSON = JSON.stringify(dataObject);
          fs.writeFile("./src/data/data.json", userJSON, (err) => {
            if (err){
              reject(err)
            } else {
              resolve(users)
            }
          })
        }

      })
    })
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      mysqlConn.query("Select * from user", function(err, res) {
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

  getAllProviders() {
    return new Promise((resolve, reject) => {
      mysqlConn.query("Select * from provider", function(err, res) {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          console.log("Providers : ", res);
          resolve(res);
        }
      });
    });
  };

  getUserById (userId) {
    return new Promise((resolve, reject) => {
    mysqlConn.query("Select * from user where id = ? ", userId, function(
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

  getProviderById (providerId) {
    return new Promise((resolve, reject) => {
    mysqlConn.query("Select * from provider where id = ? ", providerId, function(
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

  updateUserById (userId, user) {
    return new Promise((resolve, reject) => {
    mysqlConn.query(
      "UPDATE user SET firstName = ?, lastName = ?, cellPhone = ?, email = ?, password = ? WHERE id = ?",
      [user.firstName, user.lastName, user.cellPhone, user.email, user.password, userId],
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

  updateProviderById (providerId, provider) {
    return new Promise((resolve, reject) => {
    mysqlConn.query(
      "UPDATE provider SET firstName = ?, lastName = ?, cellPhone = ?, email = ?, password = ? WHERE id = ?",
      [provider.firstName, provider.lastName, provider.cellPhone, provider.email, provider.password, providerId],
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

  removeUser (userId) {
    return new Promise((resolve, reject) => {
    mysqlConn.query("DELETE FROM user WHERE id = ?", userId, function(err, res) {
      if (err) {
        console.log("error: ", err);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
  };

  removeProvider (providerId) {
    return new Promise((resolve, reject) => {
    mysqlConn.query("DELETE FROM provider WHERE id = ?", providerId, function(err, res) {
      if (err) {
        console.log("error: ", err);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
  };

};





