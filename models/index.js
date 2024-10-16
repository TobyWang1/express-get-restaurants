const { Restaurant } = require('./Restaurant');
const { Menu } = require('./Menu');
const { Item } = require('./Item');

Restaurant.hasMany(Menu, {
    foreignKey: 'restaurantId',
});

Menu.belongsTo(Restaurant, {
    foreignKey: 'restaurantId',
});

Menu.hasMany(Item, {
    foreignKey: 'menuId',
});

Item.belongsTo(Menu, {
    foreignKey: 'menuId',
});

module.exports = {
    Restaurant,
    Menu,
    Item
};