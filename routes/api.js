const router = require('express').Router();
const users = require('../data/users.json');
const cards = require('../data/cards.json');

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/cards', (req, res) => {
  res.send(cards);
});

router.get('/users/:id', (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const user = users.find((x) => x._id === req.params.id);
  if (!user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
  res.send(user);
});

router.get('/:any', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
