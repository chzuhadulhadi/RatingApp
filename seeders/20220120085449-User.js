'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     // Add seed commands here.
     
     //Example:
     await queryInterface.bulkInsert('Users', [{
        username: 'admin',
        email: 'admin@gmail.com',
        password:"admin",
        type:'admin',
      },{
        username: 'local',
        email: 'local@gmail.com',
        password:"local",
        type:'standard',

      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('Users', null, {});

  }
};
