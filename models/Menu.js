const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../db/connection");

class Menu extends Model {}

Menu.init(
    {
        title: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: db,
        modelName: "Menu",
    }
);

module.exports = { Menu };