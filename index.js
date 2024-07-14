const db = require('./src/db/models');

const bcrypt = require('bcrypt')

const {brands, types, countries} = require('./src/constants');
const { where } = require('sequelize');

const {Brand, Type, Country, User } = db;

const {Sequelize: {Op}} = db;

const newBrand = {
	title: 'ZAZ',
	description: 'Famous Ukranian avto brand',
	createdAt: new Date(),
	updatedAt: new Date(),
};

const newCountry = {
	title: 'JP',
	description: 'Japane',
	created_at: new Date(),
	updatedAt: new Date(),
}

const newUser = {
	full_name: 'Petr Pyatochkin',
	email: 'p_p@gmail.com',
	password: 'QWERTY',
	created_at: new Date(),
	updated_at: new Date(),
}

const updatedCountry = {
	description: 'Unknown',
}

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
			returning: ['id'],
			// raw: true,
			// validate: false,
		});
		console.log(type);
	} catch (error) {
		console.log('Cannot add item to table: ', error.message);
	}
};

// addItem(User, newUser)

const deleteItem = async (model) => {
	try {
		const delAmount = await model.destroy({
			where: {}
		});
        console.log(`Number of deleting rows: ${delAmount}`)
	} catch (error) {
		console.log('Cannot delete item from table: ', error.message);
	}
};

// deleteItem(User);

// Update
const changeItems = async (model, values) => {
	try {
		const [number, result] = await model.update(values, {
			where: {
				title: {
					[Op.like]: 'U%'
				}
			},
			returning: ['*'],
			raw: true,
		})
		// console.log(updatedItems)
		console.log(number)
		console.log(result)
	} catch (error) {
		console.log(error.message)
	}
}

// changeItems(Country, updatedCountry)



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
				full_name: {
					[Op.like]: 'vas%'
				}
			},
			returning: 'full_name',
			// raw: true,
			// attributes: ['id', ['title', 'name']],
			// group: 'id',
			// attributes: {
			// 	exclude: ['createdAt', 'updatedAt'],
			// 	include: [[db.sequelize.fn('SUM', db.sequelize.col('id')), 'total']],
			// },
		})
		console.log(gettingItems);
		gettingItems.forEach(item => {
			console.log('Item is: --- ', item.full_name)
		})
	} catch (error) {
		console.log(error.message)
	}
}

// getItems(User)



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

syncSomeTable(Brand)


// Crypt test

const cryptTest = async () => {
	const password = 'ASDFGHJ';
	const anotherOnePassword = 'JHGFDSA';
	const hash = await bcrypt.hash(password, 10)
	console.log('Hash is --- ', hash)
	const compareResult = await bcrypt.compare(password, hash)
	console.log('Right', compareResult)
	const otherCompareResult = await bcrypt.compare(anotherOnePassword, hash)
	console.log('Error', otherCompareResult)

}

// cryptTest()