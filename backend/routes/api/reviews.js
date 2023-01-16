const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, ReviewImg, User, Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const newError = require('../../utils/newError.js');

const router = express.Router();

const reviewValidators = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check('stars')
    .exists({ checkFalsy: true })
    .withMessage("A star rating is required"),
  check('stars')
  .isFloat({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
];

// 11. Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const id = req.params.reviewId
  const { url } = req.body
  const currentReview = await Review.findByPk(id)

  if (!currentReview) {
    const err = newError("Review couldn't be found", 404)
    return next(err)
  }
  const allReviewImages = await ReviewImg.findAll({
    where: {
      reviewId: currentReview.id
    }
  })
  if (allReviewImages.length > 10) {
    const err = newError("Maximum number of images for this resource was reached", 403)
    return next(err)
  }

  const newImage = await ReviewImg.create({
    reviewId: currentReview.id,
    url: url,
  });
  return res.json(newImage)
})

// 12. Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  const userId = req.user.id

  const allReviews = await Review.findAll({
    where: {
      userId
    },
    include: [{
      model: User
    },
    {
      model: Spot
    },
    {
      model: ReviewImg
    }]
  });

  return res.json(allReviews)
})

// 14. Edit a Review
router.put('/:reviewId', requireAuth, reviewValidators, async (req, res, next) => {
  const id = req.params.reviewId
  const { review, stars } = req.body
  const userId = req.user.id

  const updateReview = await Review.findByPk(id)
  if (!updateReview) {
    const err = newError("Review couldn't be found", 404)
    return next(err)
  }

  if (userId !== updateReview.userId) {
    const err = newError("You do not have permission to edit this review", 403)
    return next(err)
  }

  updateReview.set({
    review: review,
    stars: stars,
    updatedAt: new Date()
  })
  await updateReview.save()

  return res.json(updateReview)
})

// 21. Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {

  const id = req.params.reviewId;
  const userId = req.user.id
  const deleteReview = await Review.findByPk(id);

  if (!deleteReview) {
    const err = newError("Review couldn't be found", 404)
    return next(err)
  }
  if (userId !== deleteReview.userId) {
    const err = newError("You do not have permission to edit this review", 403)
    return next(err)
  }

  if (userId === deleteReview.userId) {
    deleteReview.destroy();
    return res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    });
  }
})
module.exports = router;
