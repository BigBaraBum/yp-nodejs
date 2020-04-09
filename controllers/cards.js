const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) { // карточка найдена
        if (card.owner === req.user) { // пользователь создатель карточки
          Card.findByIdAndRemove(req.params.cardId) // удаляем карточку
            .then((deletedCard) => {
              res.send({ data: deletedCard });
            })
            .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
        } else { // пользователь не создатель карточки
          res.status(401).send({ message: 'У вас нет прав для удаления этой карточки' });
        }
      } else { // карточка не найдена
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
