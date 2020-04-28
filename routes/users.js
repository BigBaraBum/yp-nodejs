const router = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');
const { userIdValidator, userPatchValidator, avatarPatchValidator } = require('../middlewares/validation');

router.get('/', getUsers);

router.get('/:userId', userIdValidator, getUserById);

router.patch('/me', userPatchValidator, updateProfile);

router.patch('/me/avatar', avatarPatchValidator, updateAvatar);

module.exports = router;
