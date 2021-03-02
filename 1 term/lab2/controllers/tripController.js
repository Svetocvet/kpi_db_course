const Trip = require('../models/trip');
const prompt = require('prompt-sync')();

class tripController {
    static async createOne() {
        const driver_id = prompt(`Enter driver_id: `)
        const client_id = prompt(`Enter client_id: `)
        const price = prompt(`Enter price: `)
        const address = prompt(`Enter address: `)
        console.log();
        await Trip.createOne(driver_id, client_id, price, address)
    };

    static async getOne() {
        const id = prompt(`Enter id: `)
        console.log();
        const data = await Trip.getOne(id)
        console.table(Object.assign({}, ...data.rows));
    }

    static async getMany() {
        const limit = prompt(`Enter limit: `)
        console.log();
        await Trip.getMany(limit)

    }

    static async updateById() {
        const id = prompt(`Enter id: `)
        const name = prompt(`Enter name: `)
        const driver_id = prompt(`Enter driver_id: `)
        const client_id = prompt(`Enter client_id: `)
        const price = prompt(`Enter price: `)
        const address = prompt(`Enter address: `)
        console.log();
        await Trip.updateById(id, name, driver_id, client_id, price, address);
    }

    static async removeById() {
        const id = prompt(`Enter id: `)
        console.log();
        await Trip.removeById(id);
    }

    static async createRandom() {
        const limit = prompt(`Enter amount of random entities: `)
        await Trip.createRandom(limit)
    };

    static async complexSearch() {
        const client_name = prompt(`Enter client name: `);
        const driver_name = prompt(`Enter driver name: `);
        const price = prompt(`Enter driver price: `);
        await Trip.complexSearch(client_name, driver_name, price)
    };

}

module.exports = tripController;
