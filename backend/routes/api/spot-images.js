const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { SpotImg, Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const newError = require('../../utils/newError.js');

const router = express.Router();


// 19. Delete an Image
router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const id = req.params.imageId;
    const userId = req.user.id
    const deleteImage = await SpotImg.findByPk(id);

    if (!deleteImage) {
      const err = newError("Image couldn't be found", 404)
      return next(err)
    }

    const imageOwner = await Spot.findOne({
      where: {
          ownerId: userId,
          id: deleteImage.spotId
      }
  })

    if (userId !== imageOwner.ownerId) {
      const err = newError("You do not have permission to delete this image", 403)
      return next(err)
    }

      deleteImage.destroy();
      return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      });

  })




module.exports = router;
