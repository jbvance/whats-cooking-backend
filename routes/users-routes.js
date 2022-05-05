const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controller');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  [
    check('name').not().isEmpty().withMessage('cannot be empty'),
    check('email').normalizeEmail().isEmail().withMessage('not a valid email'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('must be at least 8 characters'),
  ],
  usersController.signup
);

router.post('/login', usersController.login);

module.exports = router;
