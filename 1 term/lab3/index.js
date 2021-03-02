const prompt = require('prompt-sync')();
const {Client} = require('pg');
const clientController = require('./controllers/clientController')
const driverController = require('./controllers/driverController')
const tripController = require('./controllers/tripController')
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:wertyQ123@127.0.0.1:5432/taxi')

sequelize.sync()
    .then()
    .catch(console.error);
//require('dotenv').config()

/*const client = new Client(
    {
        database: "taxi",
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
);

client.connect()
global.client = client;*/
/*global.client.query(`
        CREATE FUNCTION randomValueFromList(valueList IN TEXT[])
        RETURNS TEXT AS
        $$
        WITH base AS (
           SELECT val
             FROM UNNEST(valueList) val
        )
        SELECT val
          FROM base
         ORDER BY RANDOM()
         LIMIT 1
        $$
        LANGUAGE 'sql'
        VOLATILE;

        CREATE FUNCTION randomNumber(startingValue IN NUMERIC, endingValue IN NUMERIC)
        RETURNS NUMERIC AS
        $$
           SELECT (startingValue + (endingValue - startingValue) * RANDOM())::NUMERIC;
        $$
        LANGUAGE 'sql'
        VOLATILE;
`)*/
console.clear()
main(sequelize)

function main(sequelize) {
    const syncWait = ms => {
        const end = Date.now() + ms
        while (Date.now() < end) continue
    }
    console.log("Program started");
    console.log("Command type: entity commandOperation");
    console.log("Entities: clients, drivers, trips");
    console.log("Command Operations: create, readone, readmany, update, delete, search, generate");
    let command = String(prompt("Enter the command to execute: "))

    command = command.split(" ")

    let entity = command[0];
    let operation = command[1];
    let currentEntity;

    if (entity === 'clients') {
        currentEntity = clientController;
    } else if (entity === 'drivers') {
        currentEntity = driverController;
    } else if (entity === 'trips') {
        currentEntity = tripController;
    } else {
        console.log("Error: Missing entity");
        syncWait(2000);
        main();
    }

    if (operation === 'create') {
        currentEntity.createOne(sequelize).then(r =>main(sequelize));
    } else if (operation === 'readone') {
        currentEntity.getOne(sequelize).then(r=>main(sequelize));
    } else if (operation === 'readmany') {
        currentEntity.getMany(sequelize).then(r => main(sequelize));
    } else if (operation === 'update') {
        currentEntity.updateById(sequelize).then(r => main(sequelize));
    } else if (operation === 'delete') {
        currentEntity.removeById(sequelize).then(r => main(sequelize));
    } else if (operation === 'search') {
        currentEntity.complexSearch(sequelize).then(r => main(sequelize));
    } else if (operation === 'generate') {
        currentEntity.createRandom(sequelize).then(r => main(sequelize))
    } else {
        console.log("Error: Missing operation");
        syncWait(2000);
        main(sequelize);
    }
}

