'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        userId: 1,
        spotId: 2,
        startDate: 2023-1-1,
        endDate: 2023-1-8
      },
      {
        userId: 2,
        spotId: 1,
        startDate: 2022-12-5,
        endDate: 2022-12-14
      },

    ], {});
  },


  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bookings', {
      where: {name: bookings.map( bookings=> bookings.id)}
    }, {});
  }
};
