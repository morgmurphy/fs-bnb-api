//const ValidationService = require("../services/validation-service");
//const validationService = new ValidationService();

const User = require("../models/user-model")

var Auth = require("../database/database");

var fs = require("fs");

var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

const roles = {
  ADMIN: "admin",
  PROVIDER: "provider",
  USER: "user"
}

module.exports = class AuthService {
  constructor() { }

  hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt)
  }

  register(AuthUser) {
    return new Promise((resolve, reject) => {
      // if (!validationService.isValidRegisterBody(user)) {
      //   reject("Invalid payload")
      // }
      User.prototype.getAllUsers()
        .then(users => {
          let dbUser = users.filter(user => {
            return user.email == AuthUser.email;
          });
          if (dbUser.length == 1) {
            reject("This email address already has been used");
          }
          else {
            const hashPassword = this.hashPassword(AuthUser.password);

            const userObj = {
              firstName: AuthUser.firstName,
              lastName: AuthUser.lastName,
              cellPhone: AuthUser.cellPhone,
              email: AuthUser.email,
              password: hashPassword,
              role: roles.USER,
            };
            const newUser = new User(userObj);
            newUser.createUser(AuthUser)
              .then(success => resolve(success))
              .catch(error => reject(error))
          }

        })
        .catch(err => reject(err))

      })

}

registerProvider(AuthUser) {
  return new Promise((resolve, reject) => {
    // if (!validationService.isValidRegisterBody(user)) {
    //   reject("Invalid payload")
    // }
    User.prototype.getAllProviders()
      .then(users => {
        let dbUser = users.filter(user => {
          return user.email == AuthUser.email;
        });
        if (dbUser.length == 1) {
          reject("This email address already has been used");
        }
        else {
          const hashPassword = this.hashPassword(AuthUser.password);

          const userObj = {
            firstName: AuthUser.firstName,
            lastName: AuthUser.lastName,
            cellPhone: AuthUser.cellPhone,
            email: AuthUser.email,
            password: hashPassword,
            role: roles.USER,
          };
          const newUser = new User(userObj);
          newUser.createProvider(AuthUser)
            .then(success => resolve(success))
            .catch(error => reject(error))
        }

      })
      .catch(err => reject(err))

    })

}


login(authEmail, authPassword) {
  console.log(authEmail)
  return new Promise((resolve, reject) => {
    User.prototype.getAllUsers().then(users => {
      let dbUser = users.filter(user => {
        return user.email == authEmail;
      });
      if (dbUser.length == 1) {
        const match = bcrypt.compare(dbUser[0].password, authPassword)
        if (match) {
          // const jwt = this.getJwtToken(dbUser[0], )
          resolve(dbUser[0]);
        } else {
          reject(new Error("Incorrect Password"))
        }
      } else {
        reject(new Error("User does not exist"))
      }
    });
  });

}

loginProvider(authEmail, authPassword) {
  console.log(authEmail)
  return new Promise((resolve, reject) => {
    User.prototype.getAllProviders().then(users => {
      let dbUser = users.filter(user => {
        return user.email == authEmail;
      });
      if (dbUser.length == 1) {
        const match = bcrypt.compare(dbUser[0].password, authPassword)
        if (match) {
          // const jwt = this.getJwtToken(dbUser[0], )
          resolve(dbUser[0]);
        } else {
          reject(new Error("Incorrect Password"))
        }
      } else {
        reject(new Error("User does not exist"))
      }
    });
  });

}

async getJwtToken(user, rememberUser) {
  let jwtObject = {}
  jwtObject.id = user.id;
  jwtObject.firstName = user.firstName;
  jwtObject.lastName = user.lastName;
  jwtObject.cellPhone = user.cellPhone;
  jwtObject.email = user.email;
  jwtObject.role = user.role;
  jwtObject.remember = user.remember;



  return await jwt.sign(Object.assign({}, jwtObject), "secret-key", {
    expiresIn: "1"
  });
}
verifyToken(token) {
  return jwt.verify(token, "secret-key");
}

}



// login() {
  //   return new Promise((resolve, reject) => {
  //     User.login((err, res) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(res);
  //     });
  //   });
  // }

  // async login(user) {
  //   return new Promise((resolve, reject) => {
  //     var found = false;
  //     User.getAll((err, dbUsers) => {
  //       if (err) reject(err);
  //       let dbUser = dbUsers.filter(dbUser => {
  //         return dbUser.email === user.email;
  //       });
  //       if (dbUser.length) {
  //         if (dbUser[0].password != user.password) {
  //           reject("Incorrect password");
  //         } else {
  //           resolve(dbUser[0]);
  //         }
  //       }
  //     })
  //   })
  // }