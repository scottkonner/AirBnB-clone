'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        previewImage: *url from SpotImg*,
        address: '123 Fake St.',
        city: 'Springfield',
        state: 'IL',
        country: 'United States',
        lat: 6.444545,
        lng: 103.666666,
        name: "Fat Tony's hideout",
        description: "A lovely location in downtown Springfield",
        price: 123
      },
      {
        ownerId: 2,
        previewImage: *url from SpotImg*,
        address: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'IL',
        country: 'United States',
        lat: -5.186684,
        lng: 89.646246,
        name: "Simpson's Residence",
        description: "A familiar location in Springfield",
        price: 89.99
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Spots', {
        where: {name: spots.map( spot=> spot.name)}
      }, {});
    }
};
