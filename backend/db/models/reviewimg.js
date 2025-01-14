'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReviewImg.belongsTo(models.Review, {
        foreignKey: 'reviewId'
      })
    }
  }
  ReviewImg.init({
    reviewId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type:DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ReviewImg',
  });
  return ReviewImg;
};
