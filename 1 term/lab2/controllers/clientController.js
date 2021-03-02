const Client = require('../models/client');
const prompt = require('prompt-sync')();

class clientController {
    static async createOne() {
        const name = prompt(`Enter name: `)
        await Client.createOne(name)
    };

    static async getOne() {
        const id =  prompt(`Enter id: `)
        return await Client.getOne(id)
    }

    static async getMany() {
        const limit =  prompt(`Enter limit: `)
        console.log();
        await Client.getMany(limit);
    }

    static async updateById() {
        const id =  prompt(`Enter id: `)
        const name =  prompt(`Enter name: `)
        console.log();
        await Client.updateById(id, name);
    }

    static async removeById() {
        const id =  prompt(`Enter id: `)
        await Client.removeById(id);
    }

    static async createRandom() {
        const limit = prompt(`Enter amount of random entities: `)
        await Client.createRandom(limit)
    };
    static async complexSearch() {
        console.log("complex search is only for trips))0")
    };

}

module.exports = clientController;
