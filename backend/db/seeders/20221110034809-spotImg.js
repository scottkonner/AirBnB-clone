'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImgs', [
      {
        spotId: 1,
        url: *string for image*,
        preview: true,
      },
      {
        spotId: 2,
        url: *string for image*,
        preview: true,
      },

    ], {});
  },


  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SpotImgs', {
      where: {name: spotImgs.map( spotImgs=> spotImgs.url)}
    }, {});
  }
};
