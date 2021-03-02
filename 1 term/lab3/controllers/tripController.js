const Trip = require('../models/trip');
const prompt = require('prompt-sync')();

class tripController {
    static async createOne(sequelize) {
        const driver_id = prompt(`Enter driver_id: `)
        const client_id = prompt(`Enter client_id: `)
        const price = prompt(`Enter price: `)
        const address = prompt(`Enter address: `)
        console.log();
        await Trip(sequelize).createOne(driver_id, client_id, price, address)
    };

    static async getOne(sequelize) {
        const id = prompt(`Enter id: `)
        console.log();
        const data = await Trip(sequelize).getOne(id)
    }

    static async getMany(sequelize) {
        const limit = prompt(`Enter limit: `)
        console.log();
        await Trip(sequelize).getMany(limit)

    }

    static async updateById(sequelize) {
        const id = prompt(`Enter id: `)
        const driver_id = prompt(`Enter driver_id: `)
        const client_id = prompt(`Enter client_id: `)
        const price = prompt(`Enter price: `)
        const address = prompt(`Enter address: `)
        console.log();
        await Trip(sequelize).updateById(id, driver_id, client_id, price, address);
    }

    static async removeById(sequelize) {
        const id = prompt(`Enter id: `)
        console.log();
        await Trip(sequelize).removeById(id);
    }

    static async createRandom(sequelize) {
        console.log("123")
    };

    static async complexSearch(sequelize) {
        console.log("123")
    };

}

module.exports = tripController;
