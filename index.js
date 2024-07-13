const db = require('./src/db/models');

const {brands, types, countries} = require('./src/constants');
const { where } = require('sequelize');

const {Brand, Type, Country} = db;

const {Sequelize: {Op}} = db;

const newBrand = {
	title: 'ZAZ',
	description: 'Famous Ukranian avto brand',
	createdAt: new Date(),
	updatedAt: new Date(),
};

const dbCheck = async () => {
	try {
		await db.sequelize.authenticate();
		console.log(
			`Connection with DB <<<${process.env.DB_NAME.toUpperCase()}>>> has been successfully done`
		);
	} catch (error) {
		console.log('Cannot connect to DB: ', error.message);
	}
};
dbCheck();

const addItem = async (model, values) => {
	
	try {
		const type = await model.create(values, {
			returning: ['id', 'updatedAt'],
			raw: true,
		});
		console.log(type);
	} catch (error) {
		console.log('Cannot add item to table: ', error.message);
	}
};

// addItem(Brand, newBrand)

const deleteItem = async (model) => {
	try {
		const delAmount = await model.destroy({
			where: {
				title: 'ZAZ',
			},
		});
        console.log(`Number of deleting rows: ${delAmount}`)
	} catch (error) {
		console.log('Cannot delete item from table: ', error.message);
	}
};

// deleteItem(Brand);

// Insert many items
const addItems = async (model, values) => {
	try {
		await model.bulkCreate(values, {
			// fields: ['title', 'description'],
		})
	} catch (error) {
		console.log(error.message)
	}
}

// addItems(Type, types)

// Select items

const getItems = async (model) => {
	try {
		const gettingItems = await model.findAll({
			where: {
				title: {
					[Op.like]: 'L%'
				}
			},
			raw: true,
			// attributes: ['id', ['title', 'name']],
			group: 'id',
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
				include: [[db.sequelize.fn('SUM', db.sequelize.col('id')), 'total']],
			},
		})
		console.log(gettingItems);
		gettingItems.forEach(item => {
			console.log('Item is: --- ', item)
		})
	} catch (error) {
		console.log(error.message)
	}
}

getItems(Type)



const dropSomeTable = async (model) => {
    // console.log(db.Type.name)
    try {
        await model.drop();
        console.log(`Table has been droped`)
    } catch (error) {
        console.log(`Cannot drop table: `, error.message)
    }
    
}

// dropSomeTable(Country)

const syncSomeTable = async (model) => {
    try {
        await model.sync({alter: true});
        console.log('Sync table has been done')
    } catch (error) {
        console.log('Cannot sync table: ', error.message)
    }
}

// syncSomeTable(Country)