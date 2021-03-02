const Sequelize = require("sequelize");
module.exports = function (sequelize) {
    const Driver = sequelize.define("drivers", {
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
        car: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    Driver.createOne = async (name, car) => {
        await Driver.create({name, car})
            .then(() => console.log("\nSuccessfully created"))
            .catch(console.error);
    }

    Driver.getOne = async (id) => {
        await Driver.findByPk(id)
            .then((res) => {
                console.log();
                console.log(res);
            })
            .catch(console.error);
    }

    Driver.getMany = async (limit) => {
        await Driver.findAll({
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

    Driver.updateById = async (id, name, car) => {
        await Driver.update({id, name}, {
            where: {id: id}
        })
            .then(() => console.log("\nSuccessfully updated"))
            .catch(console.error);
    }

    Driver.removeById = async (id) => {
        await Driver.destroy({where: {id: id}})
            .then(() => console.log("\nsuccessfully removed"))
            .catch(console.error);
    }

    return Driver;
}

