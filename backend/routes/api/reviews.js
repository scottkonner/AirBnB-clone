const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// 11. Add an Image to a Review based on the Review's id  INCOMPLETE


// 12. Get all Reviews of the Current User  INCOMPLETE


// 14. Edit a Review  INCOMPLETE


// 21. Delete a Review  INCOMPLETE    'if' statement needs to check userId match
router.delete('/:reviewId', async (req, res,) => {
    // need to be logged in

const id = req.params.reviewId;
const deleteReview = await Review.findByPk(id);
if (deleteReview) {
    deleteReview.destroy();
    res.json({
        statusCode: 200,
        message: 'Successfully deleted'
    });
} else {
    res.json({
        status: 'not-found',
        message: `Could not remove review`,
        details: 'This review does not show up in the database'
    })
}
})
module.exports = router;
