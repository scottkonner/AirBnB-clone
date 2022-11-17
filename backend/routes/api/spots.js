const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImg, Review, ReviewImg, Booking, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const newError = require('../../utils/newError.js');
const { application } = require('express');


const router = express.Router();

const spotsValidators = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude is not valid"),
    check('lng')
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .isFloat({ min: 0.01 })
        .withMessage("Price per day is required"),
    handleValidationErrors
];

const reviewValidators = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];
// 4. Get All Spots

router.get('/', async (req, res) => {
    allSpots = await Spot.findAll()
    return res.json(allSpots)
})

// 5. Create A Spot

router.post('/', requireAuth, spotsValidators, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const userId = req.user.id

    const newSpot = await Spot.create({
        ownerId: userId,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })
    return res.json(newSpot)
})

// 6. Add an Image to a Spot based on the Spot's id

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const currentSpotId = req.params.spotId
    const { url, previewImage } = req.body

    const currentSpot = await Spot.findByPk(currentSpotId)

    if (!currentSpot) {
        const err = newError("Spot couldn't be found", 404)
        return next(err)
    }

    const newImage = await SpotImg.create({
        spotId: currentSpot.id,
        url: url,
        preview: previewImage || false
    });

    if (previewImage) {
        currentSpot.previewImage = url;
        await currentSpot.save()
    }

    return res.json(newImage)
})

// 7. Get all Spots owned by the Current User  INCOMPLETE

router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    //Need average star rating

    const spotAvgStars = await Spot.findByPk(userId, {
        // include: {
        //     model: Review,
        //     attributes: ['stars']
        // },
        // attributes: [
        //     [sequelize.fn('AVG', sequelize.col('Review.stars')), 'averageStars'],
        // ],
        // raw: true
    })
    // for 'Get details'
    // const reviews = spotAvgStars.dataValues.Reviews.length
    // spotAvgStars.dataValues.numReviews = reviews

    userSpots = await Spot.findAll({
        where: {
            ownerId: userId
        },
        include: {
            model: Review
        }
    })
    return res.json(userSpots)
})

// 8. Get details for a Spot from an id  INCOMPLETE  check scorecard for details

router.get('/:spotId', async (req, res, next) => {
    // Need average star rating, num of reveiws, SpotImgs, and User Info

    const queriedSpot = req.params.spotId

    currentSpot = await Spot.findByPk(queriedSpot, {
        include: {
            model: Review,
            attributes: []
        },
    })
    if (!currentSpot) {
        const err = newError("Spot couldn't be found", 404)
        next(err);
    }

    if (currentSpot) {
        return res.json(currentSpot)
    }
})


// 9. Edit a Spot  NEEDS TEST


router.put('/:spotId', requireAuth, spotsValidators, async (req, res, next) => {
    const currentSpot = req.params.spotId
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const userId = req.user.id

    const updateSpot = await Spot.findByPk(currentSpot)
    if (!updateSpot) {
        const err = newError("Spot couldn't be found", 404)
        return next(err)
    }
    if (userId !== updateSpot.ownerId) {
        const err = newError("You do not have permission to edit this review", 403)
        return next(err)
    }

    updateSpot.set({
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price,
        updatedAt: new Date()
    })
    await updateSpot.save()
    return res.json(updateSpot)
})

// 10. Create a Review for a Spot based on the Spot's id

router.post('/:spotId/reviews', requireAuth, reviewValidators, async (req, res, next) => {
    const currentSpot = req.params.spotId
    const userId = req.user.id
    const { review, stars } = req.body

    const reviewedSpot = await Spot.findByPk(currentSpot)
    if (!reviewedSpot) {
        const err = newError("Spot couldn't be found", 404)
        return next(err)
    }
    const alreadyReviewed = await Review.findAll({
        where: {
            userId: userId
        }
    })
    if (alreadyReviewed.length > 0) {
        const err = newError("User already has a review for this spot", 403)
        return next(err)
    }


    const newReview = await Review.create({
        userId: reviewedSpot.ownerId,
        spotId: reviewedSpot.id,
        review: review,
        stars: stars
    })
    return res.json(newReview)



})


// 13. Get all Reviews by a Spot's id

router.get('/:spotId/reviews', async (req, res, next) => {
    const queriedSpot = req.params.spotId

    const anyReviews = await Review.findByPk(queriedSpot)

    const allReviews = await Review.findAll({
        where: {
            spotId: queriedSpot
        },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    })

    if(!anyReviews){
        const err = newError("Spot couldn't be found", 404)
        return next(err)
    }

        return res.json(allReviews)
})


// 15. Create a Booking from a Spot based on the Spot's id  NEEDS TEST

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const id = req.params.spotId
    const userId = req.user.id
    const { startDate, endDate } = req.body
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

    const bookingSpot = await Spot.findByPk(id)

    if (!bookingSpot) {
        const err = newError("Spot couldn't be found", 404)
        return next(err)
    }
    if (userId === bookingSpot.ownerId) {
        const err = newError("You can not book dates for a spot you own", 403)
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

    const newBooking = await Booking.create({
        userId: userId,
        spotId: bookingSpot.id,
        startDate: startDate,
        endDate: endDate

    })
    return res.json(newBooking)


})

// 17. Get all Bookings for a Spot based on the Spot's id

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const id = req.params.spotId
    const userId = req.user.id

    const currentSpot = await Spot.findByPk(id)
    if (!currentSpot) {
        const err = newError("Spot couldn't be found", 404)
        return next(err)
    }

    if (userId !== currentSpot.ownerId) {
        const allBookingsBasic = await Booking.findAll({
            attributes: ['spotId', 'startDate', 'endDate']
        })
        return res.json(allBookingsBasic)
    }
    const allBookings = await Booking.findAll({
        where: {
            spotId: currentSpot.id
        },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    })
    return res.json(allBookings)

})

// 22. Delete a Spot

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const id = req.params.spotId;
    const deleteSpot = await Spot.findByPk(id);
    const userId = req.user.id

    if (!deleteSpot) {
        const err = newError("Spot couldn't be found", 404)
        return next(err)
      }
      if(userId !== deleteSpot.ownerId){
        const err = newError("You cannot delete a spot you don't own", 403)
        return next(err)
      }

      deleteSpot.destroy();
      res.json({
          "message": "Successfully deleted",
          "statusCode": 200
      });
})


// 23. Add Query Filters to get all Spots  INCOMPLETE


module.exports = router;
