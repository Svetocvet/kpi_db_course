const Driver = require('../models/driver');
const prompt = require('prompt-sync')();

class driverController {
    static async createOne() {
        const name = prompt(`Enter name: `)
        const car = prompt(`Enter car: `)
        console.log();
        await Driver.createOne(name, car)
    };

    static async getOne() {
        const id = prompt(`Enter id: `)
        console.log();
        const data = await Driver.getOne(id)
        console.table(Object.assign({}, ...data.rows));
    }

    static async getMany() {
        const limit = prompt(`Enter limit: `)
        console.log();
        const result = await Driver.getMany(limit)
    }

    static async updateById() {
        const id = prompt(`Enter id: `)
        const name = prompt(`Enter name: `)
        const car = prompt(`Enter car: `)
        console.log();
        await Driver.updateById(id, name, car);
    }

    static async removeById() {
        const id = prompt(`Enter id: `)
        await Driver.removeById(id);
    }

    static async createRandom() {
        const limit = prompt(`Enter amount of random entities: `)
        await Driver.createRandom(limit)
    };

    static async complexSearch() {
    console.log("complex search is only for trips))0")
    };

}

module.exports = driverController;
