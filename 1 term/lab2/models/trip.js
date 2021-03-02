class Trip {
    static async createOne(driver_id, client_id, price, address) {
        try {
            await global.client.query(`INSERT INTO trips (driver_id, client_id, price, address) VALUES ('${driver_id}', '${client_id}', '${price}', '${address}')`)
                .then(() => console.log("\nSuccessfully created\n"))
        } catch (e) {
            console.log(e)
        }

    }

    static async getOne(id) {
        try {
            const result = await global.client.query(`SELECT * FROM trips WHERE id=${id}`);
            if (result.rows.length === 0) {
                console.info("No trip with this id");
                return null;
            } else {
                return result;
            }
        } catch (err) {
            console.log(err.stack);
        }
    }

    static async getMany(limit) {
        try {
            await global.client.query(`SELECT * FROM trips LIMIT ${limit}`)
                .then(result => {
                    console.table(result.rows)
                })
        } catch (e) {
            console.log(e);
        }

    }

    static async updateById(id, name, driver_id, client_id, price, address) {
        try {
            await global.client.query(`UPDATE trips SET (name, driver_id, client_id, price, address) = ('${name}','${driver_id}','${client_id}','${price}','${address}',) WHERE id=${id}`,
            );
            console.info("\nSuccessfully updated\n");

        } catch (err) {
            console.log(err);
        }
    }

    static async removeById(id) {
        try {
            await global.client.query(`DELETE FROM trips WHERE id=${id}`);
            console.info("\nSuccessfully deleted");
        } catch (err) {
            console.log(err);
        }
    }

    static async createRandom(limit) {
        try {
            let i = 0;
            while (i < limit) {
                await global.client.query(`            
            INSERT INTO trips(driver_id, client_id, price, address) 
            SELECT 
                (SELECT id FROM drivers ORDER BY RANDOM() LIMIT 1) as driver_id,
                (SELECT id FROM clients ORDER BY RANDOM() LIMIT 1) as client_id,
                randomNumber(50,400)::INTEGER as price,
                randomValueFromList(ARRAY['7989 Rockville St.','7142 Ocean Street','7206 Cypress Street','4 Woodland Street','5 Pineknoll Ave','N. William St.','5 Applegate St.','502 Wagon Street','8455 Glendale Ave.','9959 Yukon Dr.','13 Indian Summer St.','52 North James St.']) as address;`)
                    .then(() => {
                        console.log("\nSuccessfully created\n")
                        i++
                    })
            }
        } catch (e) {
            console.log(e);
        }
    }

    static async complexSearch(client_name, driver_name, price) {
        try {
            await global.client.query(`            
        SELECT trips.id,
            clients.name AS client_name,
            drivers.name AS driver_name,
            trips.price,
            trips.address
                 FROM
                        trips, clients, drivers
                 WHERE 
                        trips.client_id = clients.id 
                        AND trips.driver_id = drivers.id 
                        AND drivers.name = '${driver_name}'
                        AND clients.name = '${client_name}'
                        AND trips.price = '${price}'
                        
            `).then(result => {
                if (result.rows.length === 0) {
                    console.log("No trip with found\n");
                    return null;
                } else {
                    console.table(result.rows)
                }
            })
        } catch (e) {
            console.log(e);
        }

    }
}

module.exports = Trip;
