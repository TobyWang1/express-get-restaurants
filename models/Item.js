const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db/connection");

class Item extends Model {}

Item.init(
    {
        name: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DECIMAL,
        },
        vegetarian: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize: db,
        modelName: "Item",
    }
);

module.exports = { Item };