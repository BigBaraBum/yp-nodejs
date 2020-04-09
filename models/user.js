const mongoose = require('mongoose');

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
    retuired: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?(([a-z]+\.[a-z]+)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?([/a-z0-9]+#?)?/.test(v);
      },
    },
  },
});

module.exports = mongoose.model('user', userSchema);
