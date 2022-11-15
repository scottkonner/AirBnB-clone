const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// 16. Get all of the Current User's Bookings  INCOMPLETE

router.get('/bookings/current', async (req, res,) => {
    const userId = req.user.id
})

// 18. Edit a Booking  INCOMPLETE

router.put('/bookings/:bookingsId', async (req, res,) => {
    id = req.params.bookingsId
    const userId = req.user.id
    const { startDate, endDate } = req.body
    currentBooking = await Booking.findByPk(id)

    if(!currentBooking){
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }
    if(currentBooking.endDate < 'current date'){
        
    }


    if(userId === currentBooking.userId){
        currentBooking.set({
            startDate: startDate,
            endDate: endDate
        })


    }
})

// 20. Delete a Booking  INCOMPLETE   One more error message
router.delete('/:bookingId', async (req, res,) => {

    const id = req.params.bookingId;
    const userId = req.user.id
    const deleteBooking = await Booking.findByPk(id);

if (userId === deleteBooking.userId){
    if (deleteBooking) {
        deleteBooking.destroy();
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          });
    } else {
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }
}
})



module.exports = router;
