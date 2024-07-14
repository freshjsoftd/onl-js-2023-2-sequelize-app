'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Country extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Country.hasMany(models.Brand, {
				foreignKey: 'countryId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			})
		}
	}
	Country.init({
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: {
						msg: 'Must be more then 5',
						args: [1,5]
					}
				},
			},
				description: DataTypes.TEXT,
			},
		{
			sequelize,
			modelName: 'Country',
      tableName: 'Countries',
    //   timestamps: false,
      underscored: true,
		}
	);
	return Country;
};
