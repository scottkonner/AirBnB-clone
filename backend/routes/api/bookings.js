const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// 16. Get all of the Current User's Bookings  INCOMPLETE

// 18. Edit a Booking  INCOMPLETE

// 20. Delete a Booking  INCOMPLETE   'if' statement needs to check userId match
router.delete('/:bookingId', async (req, res,) => {
    // need to be logged in

    const id = req.params.bookingId;
    const deleteBooking = await Booking.findByPk(id);
    if (deleteBooking) {
        deleteBooking.destroy();
        res.json({
            statusCode: 200,
            message: 'Successfully deleted'
        });
    } else {
        res.json({
            status: 'not-found',
            message: `Could not remove booking`,
            details: 'This booking does not show up in the database'
        })
    }
})



module.exports = router;
