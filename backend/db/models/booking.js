'use strict';
const {
  Model
} = require('sequelize');
const newError = require('../../utils/newError.js')
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: 'userId'
      }),
        Booking.belongsTo(models.Spot, {
          foreignKey: 'spotId'
        })
    }
  }
  Booking.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        noPastDates(value) {
          if (new Date(value) < new Date()) {
            const e = new Error('You can only select future dates as your starting date.')
            return next(e)
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        endBeforeStart(value) {
          if (value < this.startDate) {
            throw new Error('Your end date must be after your start date')
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
