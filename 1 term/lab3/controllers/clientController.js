
const Client = require('../models/client');
const prompt = require('prompt-sync')();

class clientController {
    static async createOne(sequelize) {
        const name = prompt(`Enter name: `)
        await Client(sequelize).createOne(name)
    };

    static async getOne(sequelize) {
        const id =  prompt(`Enter id: `)
        return await Client(sequelize).getOne(id)
    }

    static async getMany(sequelize) {
        const limit =  prompt(`Enter limit: `)
        console.log();
        await Client(sequelize).getMany(limit);
    }

    static async updateById(sequelize) {
        const id =  prompt(`Enter id: `)
        const name =  prompt(`Enter name: `)
        console.log();
        await Client(sequelize).updateById(id, name);
    }

    static async removeById(sequelize) {
        const id =  prompt(`Enter id: `)
        await Client(sequelize).removeById(id);
    }

    static async createRandom(sequelize) {
        const limit = prompt(`Enter amount of random entities: `)
        await Client(sequelize).createRandom(limit)
    };
    static async complexSearch(sequelize) {
        console.log("complex search is only for trips))0")
    };

}

module.exports = clientController;
