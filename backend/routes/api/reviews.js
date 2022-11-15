const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// 11. Add an Image to a Review based on the Review's id  INCOMPLETE


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
