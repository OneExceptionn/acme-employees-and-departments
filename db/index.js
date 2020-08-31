const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/employeedb')
const faker = require('faker')

const Employees = db.define('employees', {
    name: {
        type: Sequelize.STRING,
    },
    department: {
        type: Sequelize.INTEGER
    }
})

const syncAndSeed = async () => {
    await db.sync( {force: true} )
    const promises = [];
    while (promises.length < 50) {
        promises.push(
            Employees.create({
                name: faker.name.firstName(),
                department: faker.random.number( {min:1, max: 4} )
            })
        )
    }
}

module.exports = {
    syncAndSeed,
    Employees
}