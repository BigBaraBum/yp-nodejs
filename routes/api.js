const router = require('express').Router();
const { createUser, getUsers, getUserById, updateProfile, updateAvatar } = require('../controllers/users');
const { createCard, getCards, deleteCardById, likeCard, dislikeCard } = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCardById);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', dislikeCard);

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.post('/users', createUser);

router.patch('/users/me', updateProfile)

router.patch('/users/me/avatar', updateAvatar)

router.get('/:any', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
