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
  res.send(users.find((x) => x._id === req.params.id));
});
module.exports = router;
