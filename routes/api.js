const router = require('express').Router();
const users = require('../data/users.json');
const cards = require('../data/cards.json');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/cards', (req, res) => {
  res.send(cards);
});

router.get('/users/:id', (req, res) => {
  const user = users.find((x) => x._id === req.params.id);
  if (!user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  } else {
    res.send(user);
  }
});

router.get('/:any', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
