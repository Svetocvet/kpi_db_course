const prompt = require('async-prompt');
const crud = require('../views/crudMenu');
const tableMenu = require('../views/tableMenu');
const Clientmodel = require('../models/client')

module.exports = async function () {
    const entity = tableMenu();
    console.log(`\nWorking with ${entity}...\n`);

    console.log('1) CRUD');
    console.log('2) Generate random data');
    console.log('3) Complex search');
    console.log();

    const choice = await prompt('Enter Operation: ');
    console.log();
    switch (choice) {
        case 1:
            crud(entity);
            break;
        case 2:
            console.log('random gener')
            break;
        case 3:
            console.log('search')
            break;
        default:
            break;
    }
};
