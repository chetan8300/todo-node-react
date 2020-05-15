const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const { registerValidationSchema, loginValidationSchema, changePasswordValidationSchema } = require('./../helpers/validation');
const { collectErrors, customErrors } = require('./../helpers/collectErrors');

exports.signup = (req, res) => {
  // Save User to Database

  // Validate before create
  const validation = registerValidationSchema(req.body);

  if (validation.error) {
    const errors = collectErrors(validation.error);
    return res.status(422).send(errors)
  };

  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      return res.status(500).send(customErrors([{ field: "email", message: err.message }]));
    });
};

exports.signin = (req, res) => {

  const { error } = loginValidationSchema(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send(customErrors([{ field: "email", message: "User Not found." }]));
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send(customErrors([{ field: "password", message: "Invalid Password!" }]));
      }

      var token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user.id,
        email: user.email,
        accessToken: token
      });
    })
    .catch(err => {
      return res.status(500).send(customErrors([{ field: "email", message: err.message }]));
    });
};

exports.changepassword = (req, res) => {

  const { error } = changePasswordValidationSchema(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  User.findOne({
    where: {
      id: req.userId
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send(customErrors([{ field: "email", message: "User Not found." }]));
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.oldPassword,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send(customErrors([{ field: "oldPassword", message: "Invalid Password!" }]));
      }

      User.update({ id: req.userId }, {
        where: {
          password: bcrypt.hashSync(req.body.newPassword, 8)
        }
      })
        .then(user => {
          return res.status(200).send({
            message: "Password updated successfully"
          });
        })
        .catch(err => {
          return res.status(500).send(customErrors([{ field: "oldPassword", message: err.message }]));
        });
    })
    .catch(err => {
      return res.status(500).send(customErrors([{ field: "email", message: err.message }]));
    });

};