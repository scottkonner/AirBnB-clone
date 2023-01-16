const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImg, Review, ReviewImg, Booking, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const newError = require('../../utils/newError.js');
const { application } = require('express');
const { Op } = require('sequelize')


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
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    check('price')
        .isFloat({ min: 0.01 })
        .withMessage("Price must be more than 0"),
    handleValidationErrors
];

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

const queryValidators = [
    check('page')
        .optional(true)
        .isFloat({ min: 0 })
        .withMessage("Page must be greater than or equal to 0"),
    check('size')
        .optional(true)
        .isFloat({ min: 0 })
        .withMessage("Size must be greater than or equal to 0"),
    check('lat')
        .optional(true)
        .isFloat({ lte: 90 })
        .withMessage("Maximum latitude is invalid"),
    check('lat')
        .optional(true)
        .isFloat({ gte: -90 })
        .withMessage("Minimum latitude is invalid"),
    check('lng')
        .optional(true)
        .isFloat({ lte: 180 })
        .withMessage("Maximum longitude is invalid"),
    check('lng')
        .optional(true)
        .isFloat({ gte: -180 })
        .withMessage("Minimum longitude is invalid"),
    check('price')
        .optional(true)
        .isFloat({ gte: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),
    check('price')
        .optional(true)
        .isFloat({ gte: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    handleValidationErrors
];
// 4. Get All Spots
// 23. Add Query Filters to get all Spots

router.get('/', queryValidators, async (req, res, next) => {
    const queryObj = req.query;
    let { page, size } = queryObj;

    page = req.query.page || 0
    size = req.query.size || 20

    page = Number(page);
    size = Number(size);

    let limit;
    let offset;

    if (page === 0) {
        limit = null;
        offset = null;
    } else {
        limit = size;
        offset = size * (page - 1);
    }

    allSpots = await Spot.findAll({
        limit: limit,
        offset: offset
    })
    return res.json({ allSpots, page, size })
})

// 5. Create A Spot

router.post('/', requireAuth, spotsValidators, async (req, res, next) => {
    const { previewImage, address, city, state, country, lat, lng, name, description, price } = req.body
    const userId = req.user.id

    const newSpot = await Spot.create({
        ownerId: userId,
        previewImage: previewImage,
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

// 7. Get all Spots owned by the Current User

router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    //Need average star rating in future

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

// 8. Get details for a Spot from an id

router.get('/:spotId', async (req, res, next) => {

    const queriedSpot = req.params.spotId

    currentSpot = await Spot.findByPk(queriedSpot, {

        include: [{
            model: SpotImg,
            attributes: ['id', 'url', 'preview']
        },
        {
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
        }]
    })
    if (!currentSpot) {
        const err = newError("Spot couldn't be found", 404)
        return next(err);
    }
    const currentSpotData = await currentSpot.toJSON();
    const numReviews = await Review.count({
        where: {
            spotId: queriedSpot
        }
    });
    const avgStarTotal = await Review.sum('stars', {
        where: {
            spotId: queriedSpot
        }
    });
    const avgStarRating = avgStarTotal / numReviews


    currentSpotData.numReviews = numReviews

    currentSpotData.avgStarRating = avgStarRating


    if (currentSpot) {
        return res.json(currentSpotData)
    }
})


// 9. Edit a Spot


router.put('/:spotId', requireAuth, spotsValidators, async (req, res, next) => {
    const currentSpot = req.params.spotId
    const { address, city, state, country, lat, lng, name, previewImage, description, price } = req.body
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
        previewImage: previewImage,
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
    const alreadyReviewed = await Review.findOne({
        where: {
            [Op.and]: [{ userId }, { spotId: reviewedSpot.id }]
        }
    })
    if (alreadyReviewed) {
        const err = newError("User already has a review for this spot", 403)
        return next(err)
    }


    const newReview = await Review.create({
        userId: userId,
        spotId: reviewedSpot.id,
        review: review,
        stars: stars
    })
    return res.json(newReview)



})


// 13. Get all Reviews by a Spot's id

router.get('/:spotId/reviews', async (req, res, next) => {
    const queriedSpot = req.params.spotId

    const anyReviews = await Spot.findByPk(queriedSpot)

    const allReviews = await Review.findAll({
        where: {
            spotId: queriedSpot
        },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    })

    if (!anyReviews) {
        const err = newError("Spot couldn't be found", 404)
        return next(err)
    }

    return res.json(allReviews)
})


// 15. Create a Booking from a Spot based on the Spot's id

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
    if (userId !== deleteSpot.ownerId) {
        const err = newError("You cannot delete a spot you don't own", 403)
        return next(err)
    }

    deleteSpot.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
})

module.exports = router;
