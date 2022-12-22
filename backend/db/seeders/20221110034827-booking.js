'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    return queryInterface.bulkInsert(options, [
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
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options,{});
  }
};
