const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, ReviewImg } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const newError = require('../../utils/newError.js');

const router = express.Router();


// 11. Add an Image to a Review based on the Review's id  INCOMPLETE
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const id = req.params.reviewId
  const { url } = req.body
  const currentReview = await Review.findByPk(id)

  if (!currentReview) {
    const err = newError("Review couldn't be found", 404)
    next(err)
}
const allReviewImages = await ReviewImg.findAll({
  where: {
    reviewId: currentReview.id
  }
})
if(allReviewImages.length > 10){
  const err = newError("Maximum number of images for this resource was reached", 403)
  next(err)
}

  const newImage = await ReviewImg.create({
    reviewId: currentReview.id,
    url: url,
});
res.json(newImage)
})

// 12. Get all Reviews of the Current User  INCOMPLETE


// 14. Edit a Review  INCOMPLETE


// 21. Delete a Review
router.delete('/:reviewId', async (req, res,) => {

const id = req.params.reviewId;
const userId = req.user.id
const deleteReview = await Review.findByPk(id);

if (userId === deleteReview.userId) {
    deleteReview.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      });
} else {
    res.json({
        "message": "Review couldn't be found",
        "statusCode": 404
      })
}
})
module.exports = router;
