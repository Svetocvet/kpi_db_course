const Driver = require('../models/driver');
const prompt = require('prompt-sync')();

class driverController {
    static async createOne(sequelize) {
        const name = prompt(`Enter name: `)
        const car = prompt(`Enter car: `)
        console.log();
        await Driver(sequelize).createOne(name, car)
    };

    static async getOne(sequelize) {
        const id = prompt(`Enter id: `)
        console.log();
        const data = await Driver(sequelize).getOne(id)
        console.table(Object.assign({}, ...data.rows));
    }

    static async getMany(sequelize) {
        const limit = prompt(`Enter limit: `)
        console.log();
        const result = await Driver(sequelize).getMany(limit)
    }

    static async updateById(sequelize) {
        const id = prompt(`Enter id: `)
        const name = prompt(`Enter name: `)
        const car = prompt(`Enter car: `)
        console.log();
        await Driver(sequelize).updateById(id, name, car);
    }

    static async removeById(sequelize) {
        const id = prompt(`Enter id: `)
        await Driver(sequelize).removeById(id);
    }

    static async createRandom(sequelize) {
        console.log("Complex search")
    };

    static async complexSearch(sequelize) {
    console.log("complex search is only for trips))0")
    };

}

module.exports = driverController;
