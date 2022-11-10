'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SpotImg.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })
    }
  }
  SpotImg.init({
    id: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    preview: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SpotImg',
  });
  return SpotImg;
};
