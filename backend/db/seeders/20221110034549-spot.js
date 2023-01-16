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
        previewImage: 'https://preview.redd.it/5840mmuhaeu81.gif?format=png8&s=5e77cb0d3ee545ec43c292831a49899159262654',
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
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/c/ca/742_Evergreen_Terrace.png',
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
