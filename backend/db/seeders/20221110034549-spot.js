'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        previewImage: 'https://static.simpsonswiki.com/images/thumb/5/53/Fake_street.png/250px-Fake_street.png',
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
        previewImage: 'https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg',
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
      options.tableName = 'Spots'
      await queryInterface.bulkDelete(options,{});
    }
};
