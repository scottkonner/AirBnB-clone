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
    spotId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    preview: {
      type:DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'SpotImg',
  });
  return SpotImg;
};
