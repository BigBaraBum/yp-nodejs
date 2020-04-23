const { celebrate, Joi } = require('celebrate');

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/https?:\/\/(www\.)?(([a-z]+\.[a-z]+)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?([/a-z0-9]+#?)?/, 'link'),
  }),
});
const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
});
const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
});
const userPatchValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});
const avatarPatchValidator = celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(/https?:\/\/(www\.)?(([a-z]+\.[a-z]+)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?([\/a-z0-9]+#?)?/, 'avatar').required(),
  }),
});
const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
});
const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8).max(30),
    about: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().regex(/https?:\/\/(www\.)?(([a-z]+\.[a-z]+)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?([\/a-z0-9]+#?)?/, 'avatar'),
  }),
});

module.exports = {
  createCardValidator,
  cardIdValidator,
  userIdValidator,
  userPatchValidator,
  avatarPatchValidator,
  signinValidator,
  signupValidator,
};
