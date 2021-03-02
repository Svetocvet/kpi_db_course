class Client {
    static async createOne(name) {
        try {
            console.log("Creating")
            await global.client.query(`INSERT INTO clients (name) VALUES ('${name}')`)
                .then(() => console.log("\nSuccessfully created\n"))
        } catch (e) {
            console.log(e)
        }
    }

    static async getOne(id) {
        try {
            const result = await global.client.query(`SELECT * FROM clients WHERE id=${id}`);
            console.table(Object.assign({}, ...result.rows));
            return result
        } catch (err) {
            console.error(err.stack);
        }
    }

    static async getMany(limit) {
        try {
            let res = await global.client.query(`SELECT * FROM clients LIMIT ${limit}`)
            console.table(res.rows)
        } catch (e) {
            console.log(e)
        }
    }

    static async updateById(id, name) {
        try {
            await global.client.query(`UPDATE clients SET name = '${name}' WHERE id=${id}`);
            console.info("\nSuccessfully updated\n");
        } catch (err) {
            console.error(err.stack);
        }
    }

    static async removeById(id) {
        try {
            await global.client.query(`DELETE FROM trips WHERE client_id=${id}`);
            await global.client.query(`DELETE FROM clients WHERE id=${id}`);
            console.info("\nSuccessfully deleted");
        } catch (err) {
            console.error(err.stack);
        }
    }

    static async createRandom(limit) {
        try {
            await global.client.query(`            
            INSERT INTO clients(name, regdate) 
            SELECT randomValueFromList(ARRAY['Aaran', 'Aaren', 'Aarez', 'Aarman', 'Aaron', 'Aaron-James', 'Aarron', 'Aaryan', 'Aaryn', 'Aayan', 'Aazaan', 'Abaan', 'Abbas', 'Abdallah', 'Abdalroof', 'Abdihakim', 'Abdirahman', 'Abdisalam', 'Abdul', 'Abdul-Aziz', 'Abdulbasir', 'Abdulkadir', 'Abdulkarem', 'Abdulkhader', 'Abdullah', 'Abdul-Majeed', 'Abdulmalik', 'Abdul-Rehman', 'Abdur', 'Abdurraheem', 'Abdur-Rahman', 'Abdur-Rehmaan', 'Abel', 'Abhinav', 'Abhisumant', 'Abid', 'Abir', 'Abraham', 'Abu', 'Abubakar', 'Ace', 'Adain', 'Adam', 'Adam-James', 'Addison', 'Addisson', 'Adegbola', 'Adegbolahan', 'Aden', 'Adenn', 'Adie', 'Adil', 'Aditya', 'Adnan', 'Adrian', 'Adrien', 'Aedan', 'Aedin']) AS name,
            TO_DATE((TO_CHAR(CURRENT_TIMESTAMP,'J')::INTEGER + ROUND(randomNumber(1,365)))::TEXT,'J') AS regdate
            FROM GENERATE_SERIES(1, ${limit});`)
                .then(() => console.log("\nSuccessfully created\n"))
        } catch (e) {
            console.log(e);
        }

    }
}

module.exports = Client;



