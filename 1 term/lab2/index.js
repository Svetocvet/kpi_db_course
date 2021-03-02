const prompt = require('prompt-sync')();
const {Client} = require('pg');
const clientController = require('./controllers/clientController')
const driverController = require('./controllers/driverController')
const tripController = require('./controllers/tripController')
require('dotenv').config()

const client = new Client(
    {
        database: "taxi",
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
);

client.connect()
global.client = client;
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
main()

function main() {
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
        console.log("Missing entity");
        syncWait(2000);
        main();
    }

    if (operation === 'create') {
        currentEntity.createOne().then(r =>main());
    } else if (operation === 'readone') {
        currentEntity.getOne().then(r=>main());
    } else if (operation === 'readmany') {
        currentEntity.getMany().then(r => main());
    } else if (operation === 'update') {
        currentEntity.updateById().then(r => main());
    } else if (operation === 'delete') {
        currentEntity.removeById().then(r => main());
    } else if (operation === 'search') {
        currentEntity.complexSearch().then(r => main());
    } else if (operation === 'generate') {
        currentEntity.createRandom().then(r => main())
    } else {
        console.log("Missing operation");
        syncWait(2000);
        main();
    }
}

