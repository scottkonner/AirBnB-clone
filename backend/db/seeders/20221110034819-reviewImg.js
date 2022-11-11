'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ReviewImgs', [
      {
        reviewId: 1,
        url: 'https://preview.redd.it/5840mmuhaeu81.gif?format=png8&s=5e77cb0d3ee545ec43c292831a49899159262654',
        preview: true,
      },
      {
        reviewId: 2,
        url: 'https://upload.wikimedia.org/wikipedia/en/c/ca/742_Evergreen_Terrace.png',
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
