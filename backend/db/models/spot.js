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
        foreignKey: 'ownerId'
      }),
      Spot.hasMany(models.SpotImg, {
        foreignKey: 'spotId'
      })
    }
  }
  Spot.init({
    ownersId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    previewImage: {
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    city: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type:DataTypes.DECIMAL(9,6),
      allowNull: false,
    },
    lng: {
      type:DataTypes.DECIMAL(9,6),
      allowNull: false,
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
      type:DataTypes.DECIMAL(6,2),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
