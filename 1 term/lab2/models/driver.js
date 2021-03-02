class Driver {
    static async createOne(name, car) {
        try {
            await global.client.query(`INSERT INTO drivers (name, car) VALUES ('${name}', '${car}')`)
                .then(() => console.log("\nSuccessfully created\n"))
        } catch (e) {
            console.log(e)
        }
    }

    static async getOne(id) {
        try {
            const result = await global.client.query(`SELECT * FROM drivers WHERE id=${id}`);
            if (result.rows.length === 0) {
                console.info("No driver with this id");
                return null;
            } else {
                return result;
            }
        } catch (err) {
            console.error(err.stack);
        }
    }

    static async getMany(limit) {
        try {
            await global.client.query(`SELECT * FROM drivers LIMIT ${limit}`)
                .then(result => console.table(result.rows))
        } catch (e) {
            console.log(e);
        }
    }

    static async updateById(id, name, car) {
        try {
            await global.client.query(`UPDATE drivers SET (name, car) = ('${name}', '${car}' ) WHERE id=${id}`);
            console.info("\nSuccessfully updated\n");
        } catch (err) {
            console.error(err.stack);
        }
    }

    static async removeById(id) {
        try {
            await global.client.query(`DELETE FROM trips WHERE driver_id=${id}`);
            await global.client.query(`DELETE FROM drivers WHERE id=${id}`);
            console.info("\nSuccessfully deleted");
        } catch (err) {
            console.error(err.stack);
        }
    }

    static async createRandom(limit) {
        try {
            await global.client.query(`            
            INSERT INTO drivers(name, car) 
            SELECT randomValueFromList(ARRAY['Conner', 'Connolly', 'Connor', 'Connor-David', 'Conor', 'Conrad', 'Cooper', 'Copeland', 'Coray', 'Corben', 'Corbin', 'Corey', 'Corey-James', 'Corey-Jay', 'Cori', 'Corie', 'Corin', 'Cormac', 'Cormack', 'Cormak', 'Corran', 'Corrie', 'Cory', 'Cosmo', 'Coupar', 'Craig', 'Craig-James', 'Crawford', 'Creag', 'Crispin', 'Cristian', 'Crombie', 'Cruiz', 'Cruz', 'Cuillin', 'Cullen', 'Cullin', 'Curtis', 'Cyrus', 'Daanyaal', 'Daegan', 'Daegyu', 'Dafydd', 'Dagon', 'Dailey', 'Daimhin', 'Daithi', 'Dakota', 'Daksh', 'Dale', 'Dalong', 'Dalton', 'Damian', 'Damien', 'Damon', 'Dan', 'Danar', 'Dane', 'Danial', 'Daniel', 'Daniele', 'Daniel-James', 'Daniels', 'Daniil', 'Danish', 'Daniyal', 'Danniel', 'Danny', 'Dante', 'Danyal', 'Danyil', 'Danys', 'Daood', 'Dara', 'Darach', 'Daragh', 'Darcy', 'Darcy', 'Dareh', 'Daren', 'Darien', 'Darius', 'Darl', 'Darn', 'Darrach', 'Darragh', 'Darrel', 'Darrell', 'Darren', 'Darrie', 'Darrius', 'Darroch']) AS name,
                    randomValueFromList(ARRAY['Alfa Romeo','Aston Martin','Audi','Bentley','BMW','Bugatti','Cadillac','Chevrolet','Chrysler','Citroën','Dacia','Daewoo','Daihatsu','Dodge','Donkervoort','DS','Ferrari','Fiat','Fisker','Ford','Honda','Hummer','Hyundai','Infiniti','Iveco','Jaguar','Jeep','Kia','KTM','Lada','Lamborghini','Lancia','Land Rover','Landwind','Lexus','Lotus','Maserati','Maybach','Mazda','McLaren','Mercedes-Benz','MG','Mini','Mitsubishi','Morgan','Nissan','Opel','Peugeot','Porsche','Renault','Rolls-Royce','Rover','Saab','Seat','Skoda','Smart','SsangYong','Subaru','Suzuki','Tesla','Toyota','Volkswagen','Volvo']) AS car
            FROM GENERATE_SERIES(1, ${limit});`)
                .then(() => console.log("\nSuccessfully created\n"))
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = Driver;
