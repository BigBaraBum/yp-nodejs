require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const CustomError = require('../errors/custom-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret');
      res.cookie('jwt', token, { maxAge: 604800000, httpOnly: true }).end();
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  if (req.body.password.length < 8) {
    throw new CustomError('Пароль должен состоять из более чем 8 символов', 400);
  } else {
    bcrypt.hash(req.body.password, 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      }))
      .then((user) => res.send({
        data: {
          id: user._id, name: user.name, about: user.about, avatar: user.avatar,
        },
      }))
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          const dublicateEmailError = err;
          dublicateEmailError.message = `Имейл ${err.keyValue.email} уже зарегистрирован`;
          dublicateEmailError.statusCode = 400;
          next(dublicateEmailError);
        } else {
          next(err);
        }
      });
  }
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new CustomError('Пользователь не найден', 404);
      }
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new CustomError('Пользователь не найден', 404);
      }
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new CustomError('Пользователь не найден', 404);
      }
    })
    .catch(next);
};
