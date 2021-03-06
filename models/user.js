const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const CustomError = require('../errors/custom-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /https?:\/\/(www\.)?(([a-z]+\.[a-z]+)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?([\/a-z0-9]+#?)?/.test(v);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return /[\w-]+@[\w]+\.\w+/.test(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new CustomError('Неправильные почта или пароль', 401));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new CustomError('Неправильные почта или пароль', 401));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
