const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImg, Review, Booking, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

// 4. Get All Spots

router.get('/', async (req,res) => {
    allSpots = await Spot.findAll()
    res.json(allSpots)
})

// 5. Create A Spot  INCOMPLETE

router.post('/', async (req,res) => {
// need to be logged in

const userId = req.user.id
if (userId === Spot.ownerId){
    // insert code in here.   Test this, may be the best way to check if logged in
}

// for errors, need title, status, message, and errors(array)
//  err.status  err.title   err.message  err.errors = [''] next(err)  ADD 'next' to (req, res)

//


    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const newSpot = await Spot.create({
        address:address,
        city:city,
        state:state,
        country:country,
        lat:lat,
        lng:lng,
        name:name,
        description:description,
        price:price
    })

    res.json(newSpot)
})

// 6. Add an Image to a Spot based on the Spot's id  INCOMPLETE

// need to be logged in

router.post('/:spotId/images', async (req,res) => {
    const currentSpot = req.params.spotId
    const { url } = req.body

    const newImage = await SpotImg.create({
        spotId: currentSpot,
        url: url,
        preview: true
    })
    res.json(newImage)
})

// 7. Get all Spots owned by the Current User  INCOMPLETE

// need to be logged in

router.get('/current', async (req,res) => {
    userSpots = await Spot.findAll({
        where: {
            ownerId: 'Needs to access current user'
        }
    })
    res.json(userSpots)
})

// 8. Get details for a Spot from an id  INCOMPLETE  check scorecard for details

router.get('/:spotId', async (req,res) => {

    const queriedSpot = req.params.spotId

    currentSpot = await Spot.findByPk(queriedSpot)
    if(currentSpot){
        res.json(currentSpot)
    } else {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          });
    }
})


// 9. Edit a Spot  INCOMPLETE  'if' statement needs to check userId match

// need to be logged in

router.put('/:spotId', async (req,res) => {
    const currentSpot = req.params.spotId
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const updateSpot = await Spot.findByPk(currentSpot)
    if(!updateSpot){
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    }
    updateSpot.set({
        address:address,
        city:city,
        state:state,
        country:country,
        lat:lat,
        lng:lng,
        name:name,
        description:description,
        price:price,
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
    })
    await updateSpot.save()
    res.json({
        "id": id,
        "ownerId": ownerId,
        "address": address,
        "city": city,
        "state": state,
        "country": country,
        "lat": lat,
        "lng": lng,
        "name": name,
        "description": description,
        "price": price,
        "createdAt": createdAt,
        "updatedAt": updatedAt
      })



})

// 10. Create a Review for a Spot based on the Spot's id  INCOMPLETE

// need to be logged in

router.post('/:spotId/reviews', async (req,res) => {
    const currentSpot = req.params.spotId
    const { review, stars } = req.body

    const reviewedSpot = await Spot.findByPk(currentSpot)

    const newReview = await Review.create({
        userId: reviewedSpot.ownerId,
        spotId: reviewedSpot.id,
        review: review,
        stars: stars
    })

    res.json(newReview)
})


// 13. Get all Reviews by a Spot's id  INCOMPLETE  Second half not working

router.get('/:spotId/reviews', async (req,res) => {

    const queriedSpot = req.params.spotId

    allReviews = await Review.findAll({
        where: {
            spotId : queriedSpot
        },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    })

    if(allReviews){
        res.json(allReviews)
    } else{
        res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
        })
    }
})


// 15. Create a Booking from a Spot based on the Spot's id  INCOMPLETE


// 17. Get all Bookings for a Spot based on the Spot's id  INCOMPLETE


// 22. Delete a Spot  INCOMPLETE       'if' statement needs to check userId match

// needs to be logged in

router.delete('/:spotId', async (req,res) => {
    const id = req.params.spotId;
    const deleteSpot = await Spot.findByPk(id);
    if (deleteSpot) {
        deleteSpot.destroy();
        res.json({
            statusCode: 200,
            message: 'Successfully deleted'
        });
    } else {
        res.json({
            status: 'not-found',
            message: `Could not remove spot ${id}`,
            details: 'This spot does not show up in the database'
        })
    }
    })


// 23. Add Query Filters to get all Spots  INCOMPLETE


module.exports = router;
