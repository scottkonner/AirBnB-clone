'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ReviewImgs', [
      {
        reviewId: 1,
        url: *string for image*,
        preview: true,
      },
      {
        reviewId: 2,
        url: *string for image*,
        preview: true,
      },

    ], {});
  },


  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ReviewImgs', {
      where: {name: ReviewImgs.map( ReviewImgs=> ReviewImgs.url)}
    }, {});
  }
};
