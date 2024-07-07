console.log('Hi everybody')

const db = require('./src/db/models')

const dbCheck = async () => {
    try {
        await db.sequelize.authenticate();
        console.log(`Connection with DB <<<${process.env.DB_NAME.toUpperCase()}>>> has been successfully done`)
        
    } catch (error) {
        console.log('Cannot connect to DB: ', error.message)
    }
}
dbCheck()

const addType = async () => {
    const newType = {
        title: 'aaa',
        description: 'The work avto',
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    try {
        const type = await db.Type.create(newType, {
            returning: ['id', 'updatedAt']
        });
        console.log(type)
    } catch (error) {
        console.log('Cannot add item to table: ', error.message)
    }
}

addType()

/* const dropTypesTable = async () => {
    // console.log(db.Type.name)
    try {
        await db.Type.drop();
        console.log(`Table ${db.Type.name} has been droped`)
    } catch (error) {
        console.log(`Cannot drop table: `, error.message)
    }
    
}

dropTypesTable() */

/* const syncTypeTable = async () => {
    try {
        await db.Type.sync({alter: true});
        console.log('Sync table has been done')
    } catch (error) {
        console.log('Cannot sync table: ', error.message)
    }
} */

// syncTypeTable()