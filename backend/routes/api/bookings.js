const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImg } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const newError = require('../../utils/newError.js');


const router = express.Router();

// 16. Get all of the Current User's Bookings

router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id

    const allBookings = await Booking.findAll({
        where: {
            userId
        },
        include: [
            {
                model: Spot
            }
        ]
    });

    return res.json(allBookings)
})


// 18. Edit a Booking

router.put('/:bookingsId', requireAuth, async (req, res, next) => {
    id = req.params.bookingsId
    const userId = req.user.id
    const { startDate, endDate } = req.body
    currentBooking = await Booking.findByPk(id)
    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)
    const conflictStart = await Booking.findOne({
        where: {
            startDate: startDateObj
        }
    })
    const conflictEnd = await Booking.findOne({
        where: {
            endDate: endDateObj
        }
    })


    if (!currentBooking) {
        const err = newError("Booking couldn't be found", 404)
        return next(err)
    }
    if (userId !== currentBooking.userId) {
        const err = newError("You do not have permission to edit this review", 403)
        return next(err)
    }
    if (new Date() > currentBooking.endDate) {
        const err = newError("Past bookings can't be modified", 403)
        return next(err)
    }
    if (startDateObj > endDateObj) {
        const err = newError("Validation error", 400, ["endDate : endDate cannot come before startDate"])
        return next(err)
    }
    if (conflictStart) {
        const err = newError("Sorry, this spot is already booked for the specified dates", 400, ["startDate : Start date conflicts with an existing booking"])
        return next(err)
    }
    if (conflictEnd) {
        const err = newError("Sorry, this spot is already booked for the specified dates", 400, ["endDate : End date conflicts with an existing booking"])
        return next(err)
    }

    currentBooking.set({
        startDate: startDate,
        endDate: endDate,
        updateAt: new Date()
    })
    await currentBooking.save()
    return res.json(currentBooking)


})

// 20. Delete a Booking  NEEDS TEST
router.delete('/:bookingId', requireAuth, async (req, res, next) => {

    const id = req.params.bookingId;
    const userId = req.user.id
    const deleteBooking = await Booking.findByPk(id);

    if (!deleteBooking) {
        const err = newError("Booking couldn't be found", 404)
        return next(err)
    }

    const bookedSpot = await Spot.findByPk(deleteBooking.spotId)

    if (!(userId !== deleteBooking.userId || userId !== bookedSpot.ownerId)) {
        const err = newError("You do not have permission to edit this booking", 403)
        return next(err)
    }
    if (new Date() > deleteBooking.startDate) {
        const err = newError("Bookings that have been started can't be deleted", 403)
        return next(err)
    }

    deleteBooking.destroy();
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });


})



module.exports = router;
