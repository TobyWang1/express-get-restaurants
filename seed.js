const { Restaurant, Menu, Item } = require("./models/index");
const { seedRestaurant, seedItem, seedMenu } = require("./seedData");
const db = require("./db/connection")

const syncSeed = async () => {
    await db.sync({ force: true });
    
    // First, create restaurants
    const restaurants = await Restaurant.bulkCreate(seedRestaurant, { returning: true });
    
    // Create menus and associate them with the corresponding restaurants
    const seedMenusWithRestaurantId = seedMenu.map((menu, index) => {
        // Assign restaurantId from restaurants array
        return { ...menu, restaurantId: restaurants[index % restaurants.length].id };
    });
    const menus = await Menu.bulkCreate(seedMenusWithRestaurantId, { returning: true });
    
    // Create items and associate them with the corresponding menus
    const seedItemsWithMenuId = seedItem.map((item, index) => {
        return { ...item, menuId: menus[index % menus.length].id };
    });
    await Item.bulkCreate(seedItemsWithMenuId);
};

syncSeed()