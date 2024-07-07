'use strict';

const {brands} = require('../../constants')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Brands', brands, {});
   
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Brands', null, {});
    
  }
};
