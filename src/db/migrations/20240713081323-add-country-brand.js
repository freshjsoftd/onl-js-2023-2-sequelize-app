'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.addColumn('Brands', 'country_id', {
      type: Sequelize.INTEGER,
     });
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.removeColumn('Brands', 'country_id');
    
  }
};
