const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { noExtendLeft } = require('sequelize/lib/operators');
const newError = require('../../utils/newError.js')

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Please provide a first name with at least 2 characters.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Please provide a last name with at least 2 characters.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// 1. Sign up a User
router.post('/', validateSignup, async (req, res, next) => {
  const { email, password, username, firstName, lastName } = req.body;
  const duplicateEmail = await User.findOne({
    where: { email }
  })
  const duplicateUser = await User.findOne({
    where: { username }
  })

  // if (duplicateEmail) {
  //   return next(newError("User already exists", 403, [{
  //     "email": "User with that email already exists"
  //   }]))
  // }
  if (duplicateEmail) {
    return next(newError("User already exists", 403, ["User with that email already exists"
    ]))
  }
  // if (duplicateUser) {
  //   return next(newError("User already exists", 403, [{
  //     "username": "User with that username already exists"
  //   }]))
  // }
  if (duplicateUser) {
    return next(newError("User already exists", 403, ["User with that username already exists"
  ]))
  }

  const user = await User.signup({ email, firstName, lastName, username, password });

  await setTokenCookie(res, user);

  user.dataValues.token = req.cookies.token

  return res.json({
    user: user,
  });
}
);


module.exports = router;
