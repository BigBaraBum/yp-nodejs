const Card = require('../models/card');
const CustomError = require('../errors/custom-error');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) { // карточка найдена
        if (card.owner.toString() === req.user._id) { // пользователь создатель карточки
          Card.findByIdAndRemove(req.params.cardId) // удаляем карточку
            .then((deletedCard) => {
              res.send({ data: deletedCard });
            })
            .catch(next);
        } else { // пользователь не создатель карточки
          throw new CustomError('У вас нет прав для удаления этой карточки', 401);
        }
      } else { // карточка не найдена
        throw new CustomError('Карточка не найдена', 404);
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new CustomError('Карточка не найдена', 404);
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new CustomError('Карточка не найдена', 404);
      }
    })
    .catch(next);
};
