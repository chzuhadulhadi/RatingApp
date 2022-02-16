'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Restuarant_Id: {
        type: Sequelize.INTEGER,
        references:{model:'restuarants',
        key:'id'}
      
      },
      User_Id: {
        type: Sequelize.INTEGER,
        references:{model: 'users', // <<< Note, its table's name, not object name
        key: 'id'} // <<< Note, its a column name
  },
      Rated: {
        type: Sequelize.FLOAT
      },
      DOV: {
        type: Sequelize.DATEONLY
      },
      Comment: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rratings');
  }
};