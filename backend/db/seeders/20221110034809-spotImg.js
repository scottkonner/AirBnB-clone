'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImgs'
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://static.wikia.nocookie.net/simpsons/images/5/53/Fake_street.png/revision/latest?cb=20100904145952',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://static.wikia.nocookie.net/mycun-the-movie/images/4/4e/The_Simpsons_House_in_MYCUN_The_Movie.png/revision/latest?cb=20150926054636',
        preview: true,
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotsImg'
    await queryInterface.bulkDelete(options,{});
  }
};
