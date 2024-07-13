'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Countries', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			description: {
				type: Sequelize.TEXT,
			},
			created_at: {
				// allowNull: false,
				defaultValue: Sequelize.NOW,
				type: Sequelize.DATE,
			},
			updated_at: {
				// allowNull: false,
				defaultValue: Sequelize.NOW,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Countries');
	},
};
