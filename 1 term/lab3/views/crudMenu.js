const prompt = require('async-prompt');
const clientController = require('../controllers/clientController');
const driverController = require('../controllers/driverController');
const tripController = require('../controllers/tripController');
const Client = require('../models/client');

module.exports = async function (entity) {
    let currentEntity;
    if (entity === 'clients') {
        currentEntity = clientController;
    } else if (entity === 'drivers') {
        currentEntity = driverController;
    } else if (entity === 'trips') {
        currentEntity = tripController;
    }
    while (true) {
        console.log(currentEntity);
        console.log('1) Create');
        console.log('2) Read');
        console.log('3) Update');
        console.log('4) Delete');
        console.log('5) Select by Id');
        console.log();

        const choice = await prompt('Choose operation: ');

        if (choice < 1 && choice > 5) {
            console.error("\nWRONG INPUT\n");
            continue;
        }
        console.log();

        switch (choice) {
            case 1:
                currentEntity.createOne()
                break;
            case 2:
                currentEntity.getMany()
                break;
            case 3:
                currentEntity.updateById()
                break;
            case 4:
                currentEntity.removeById()
                break;
            case 5:
                Client.getOne();
                break
            default:
                break;
        }
    }
};
