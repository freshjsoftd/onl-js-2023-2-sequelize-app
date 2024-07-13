'use strict';

const { brands } = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Brands', brands, {});
		// await queryInterface.sequelize.query(
		// 	`ALTER SEQUENCE "Brands_id_seq" RESTART WITH 2;`
		// );
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Brands', null, {});
		// await queryInterface.sequelize.query(
		// 	`ALTER SEQUENCE "Brands_id_seq" RESTART WITH 1;`
		// );
	},
};

// 'use strict';

// const { brands } = require('../../constants');

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {

//   async up (queryInterface, Sequelize) {
//     await queryInterface.bulkInsert('Brands', brands, {});
//     await queryInterface.sequelize.query(ALTER SEQUENCE "Brands_id_seq" RESTART WITH 2;);
//   },

//   async down (queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('Brands', null, {});
//     await queryInterface.sequelize.query(ALTER SEQUENCE "Brands_id_seq" RESTART WITH 1;);
//   }

// };
