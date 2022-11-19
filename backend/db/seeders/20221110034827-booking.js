'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        userId: 1,
        spotId: 2,
        startDate: new Date(2023, 11, 1),
        endDate: new Date(2023, 11, 10)
      },
      {
        userId: 2,
        spotId: 1,
        startDate: '5/11/2022',
        endDate: '5/21/2022'
      },

    ], {});
  },


  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bookings', {
      where: {name: bookings.map( bookings=> bookings.id)}
    }, {});
  }
};
