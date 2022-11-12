// backend/routes/index.js
const express = require('express');
const apiRouter = require('./api');
const router = express.Router();
const { Spot, SpotImg, Review, Booking, User } = require('../db/models');

router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

router.use('/api', apiRouter);

// 4. Get All Spots

// router.get('/api/spots', async (req,res) => {
//   allSpots = await Spot.findAll()
//   res.json(allSpots)
// })




module.exports = router;
