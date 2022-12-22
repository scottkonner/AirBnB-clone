'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImgs'
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://preview.redd.it/5840mmuhaeu81.gif?format=png8&s=5e77cb0d3ee545ec43c292831a49899159262654',
      },
      {
        reviewId: 2,
        url: 'https://upload.wikimedia.org/wikipedia/en/c/ca/742_Evergreen_Terrace.png',
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImgs'
    await queryInterface.bulkDelete(options,{});
  }
};
