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
        previewImage: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/66eaeef6-d231-4003-8797-6bf55243e109/d6uj38u-b9d019bb-76ec-49c2-9aad-8b1a13f7d73d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY2ZWFlZWY2LWQyMzEtNDAwMy04Nzk3LTZiZjU1MjQzZTEwOVwvZDZ1ajM4dS1iOWQwMTliYi03NmVjLTQ5YzItOWFhZC04YjFhMTNmN2Q3M2QuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wfRyj6CSuyD5VJHa2EfNW4K_YGf2fbL10PnNWNLDKa0',
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
