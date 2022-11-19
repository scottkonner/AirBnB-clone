'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 2,
        review: 'Who paints their house this color?',
        stars: 2
      },
      {
        userId: 2,
        spotId: 1,
        review: 'What a lovely concrete building',
        stars: 5
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews',{});
  }

};
