'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */ await queryInterface.bulkInsert('Restuarants', [{
        rest_name: 'Haq Bahoo Food',
      },{rest_name:'KFC'}], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */ await queryInterface.bulkDelete('People', null, {});
     
  }
};
