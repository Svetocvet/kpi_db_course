const Sequelize = require("sequelize");
module.exports = function (sequelize) {
    const Client = sequelize.define("clients", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        regdate : {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    Client.createOne = async (name) => {
        await Client.create({name})
            .then(() => console.log("\nSuccessfully created"))
            .catch(console.error);
    }

    Client.getOne = async (id) => {
        await Client.findByPk(id)
            .then((res) => {
                console.log();
                console.log(res);
            })
            .catch(console.error);
    }

    Client.getMany = async (limit) => {
        await Client.findAll({
            limit: limit,
            offset: 0,
            where: {},
        })
            .then((res) => {
                console.log();
                console.log(res);
            })
            .catch(console.error);
    }

    Client.updateById = async (id, name) => {
        await Client.update({id, name}, {
            where: {id: id}
        })
            .then(() => console.log("\nSuccessfully updated"))
            .catch(console.error);
    }

    Client.removeById = async (id) => {
        await Client.destroy({where: {id: id}})
            .then(() => console.log("\nsuccessfully removed"))
            .catch(console.error);
    }

    Client.createRandom = async (limit) => {
        try {
            for (let i = 0; i <= limit; i++) {
                await Client.create({
                    name: `test`,
                    regdate: getRandomDate(1990, 2020)
                });
            }

        } catch (err) {
            console.log(err);
        }

    }
    return Client;
}


function getRandomDate(from, to) {
    from = from.getTime();
    to = to.getTime();
    return new Date(from + Math.random() * (to - from));
}

