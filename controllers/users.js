require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret');
      res.cookie('jwt', token, { maxAge: 604800000, httpOnly: true }).end();
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email,
  } = req.body;
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
        res.status(500).send({ message: `Имейл ${err.keyValue.email} уже зарегистрирован` });
      } else {
        res.status(500).send({ message: err });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  // eslint-disable-next-line eqeqeq
  if (req.params.id == req.user._id) {
    User.findByIdAndUpdate(req.params.id, { name, about })
      .then((user) => {
        if (user) {
          res.send({ data: user });
        } else {
          res.status(404).send({ message: 'Пользователь не найден' });
        }
      })
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  } else {
    res.status(401).send({ message: 'У вас нет прав для изменения данного пользователя' });
  }
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  // eslint-disable-next-line eqeqeq
  if (req.params.id == req.user._id) {
    User.findByIdAndUpdate(req.user._id, { avatar })
      .then((user) => {
        if (user) {
          res.send({ data: user });
        } else {
          res.status(404).send({ message: 'Пользователь не найден' });
        }
      })
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  } else {
    res.status(401).send({ message: 'У вас нет прав для изменения данного пользователя' });
  }
};
