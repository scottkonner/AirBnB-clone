'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users'
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Peetah',
        lastName: 'Griffen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Stu-ee',
        lastName: 'Griffen',
        hashedPassword: bcrypt.hashSync('password2')
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users'
    await queryInterface.bulkDelete(options,{});
  }
};
