const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { SpotImg } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// 19. Delete an Image  INCOMPLETE





module.exports = router;
