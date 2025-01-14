'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner'
      }),
      Spot.hasMany(models.SpotImg, {
        foreignKey: 'spotId'
      }),
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId'
      }),
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId'
      })
    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    previewImage: {
      type:DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    city: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {

      }
    },
    state: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {

      }
    },
    country: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {

      }
    },
    lat: {
      type:DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: -90,
        max: 90,
      }
    },
    lng: {
      type:DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: -180,
        max: 180,
      }
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type:DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
