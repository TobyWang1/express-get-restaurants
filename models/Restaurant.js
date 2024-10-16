const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db/connection");

class Restaurant extends Model {}

Restaurant.init(
    {
        name: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        cuisine: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: db,
        modelName: "Restaurant",
    }
);

module.exports = { Restaurant };