const Sequelize = require("sequelize");
module.exports = function (sequelize) {
    const Client = require('./client')(sequelize);
    const Driver = require('./driver')(sequelize);
    const Trip = sequelize.define("trips", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        price: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    Trip.belongsTo(Client, {
        as: 'client',
        foreignKey: 'client_id'
    });

    Trip.belongsTo(Driver, {
        as: 'driver',
        foreignKey: 'driver_id'
    });

    Trip.createOne = async (driver_id, client_id, price, address) => {
        await Trip.create({driver_id, client_id, price, address})
            .then(() => console.log("\nSuccessfully created"))
            .catch(console.error);

    }

    Trip.getOne = async (id) => {
        await Trip.findByPk(id)
            .then((res) => {
                console.log();
                console.log(res);
            })
            .catch(console.error);
    }

    Trip.getMany = async (limit) => {
        await Trip.findAll({
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

    Trip.updateById = async (id, driver_id, client_id, price, address) => {
        await Trip.update({driver_id, client_id, price, address}, {
            where: {id: id}
        })
            .then(() => console.log("\nSuccessfully updated"))
            .catch(console.error);
    }

    Trip.removeById = async (id) => {
        await Trip.destroy({where: {id: id}})
            .then(() => console.log("\nsuccessfully removed"))
            .catch(console.error);
    }
    return Trip;
}
