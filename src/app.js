const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");
const { READCOMMITTED } = require("sequelize/lib/table-hints");

app.use(express.json());
app.use(express.urlencoded());

app.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})

app.get('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant);
})

app.post('/restaurants/create', async (req, res) => {
    try {
        // Destructure values from the request body
        const { name, location, cuisine } = req.body;
        // Ensure that the necessary fields are present. Solved: Choose JSON in Postman when entering raw json data in body
        if (!name || !location || !cuisine) {
            return res.status(400).send('All fields (name, location, cuisine) are required');
        }
        // Create the restaurant entry in the database
        const restaurant = await Restaurant.create({ name, location, cuisine });
        // Send a success response
        res.send(`A new restaurant named ${restaurant.name} has been added to the database at location: ${restaurant.location}`);
    } catch (error) {
        // Handle any errors during the request
        res.status(500).send('An error occurred while creating the restaurant');
    }
});

app.put('/restaurants/update/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        await restaurant.update(req.body);
        res.send(`The restaurant with id ${restaurant.id} has been updated`)
    } catch (error) {
        res.status(500).send('An error occurred while updating the restaurant')
    }
})

app.delete('/restaurants/delete/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        await restaurant.destroy();
        res.send(`The restaurant with id ${restaurant.id} has been deleted`)
    } catch (error) {
        res.status(500).send('An error occurred while updating the restaurant')
    }
})

module.exports = app;