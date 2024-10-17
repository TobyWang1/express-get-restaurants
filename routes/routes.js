// Define express router to be able to handle create, read, update, and delete operations for the restaurants resource
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Import the Restaurant model
const { Restaurant, Menu, Item } = require('../models/index');

// Define routes to get all restaurants, get a restaurant by ID, add a new restaurant, update a restaurant, and delete a restaurant
router.get('/all', async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll({
            include: [
                {
                    model: Menu,
                    include: Item
                }
            ]
        });
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).json({ message: "Restaurant not found" });
        }
    } catch (error) {
        console.error(error);
        if (error instanceof SomeValidationError) {
            res.status(400).json({ message: "Invalid restaurant ID" });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});

router.post('/add', [
    check('name').notEmpty().trim().withMessage('Name is required'),
    check('location').notEmpty().trim().withMessage('Location is required'),
    check('cuisine').notEmpty().trim().withMessage('Cuisine is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const restaurant = await Restaurant.create(req.body);
        res.status(201).json(restaurant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (restaurant) {
            await restaurant.update(req.body);
            res.json(restaurant);
        } else {
            res.status(404).json({ message: "Restaurant not found" });
        }
    } catch (error) {
        console.error(error);
        if (error instanceof ValidationError) {
            res.status(400).json({ message: "Invalid restaurant data" });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (restaurant) {
            await restaurant.destroy();
            res.json({ message: "Restaurant deleted" });
        } else {
            res.status(404).json({ message: "Restaurant not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Export the router to be used in the main app
module.exports = router;