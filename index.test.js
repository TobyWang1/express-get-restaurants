// Tests for the CRUD operations of the restaurant API. Use the supertest library to make requests to the API and check the responses.
const request = require('supertest');
const app = require('./src/app');
const db = require('./db/connection');
const { Restaurant } = require('./models/Restaurant');

beforeAll(async () => {
    await db.sync();
}
);

beforeEach(async () => {
    await Restaurant.destroy({ where: {} });
}
);

afterAll(async () => {
    await db.close();
}
);

describe('Test the restaurant API', () => {
    test('GET /restaurants/all', async () => {
        const response = await request(app).get('/restaurants/all');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });

    test('POST /restaurants/add', async () => {
        const response = await request(app)
            .post('/restaurants/add')
            .send({
                name: 'McDonalds',
                location: 'New York',
                cuisine: 'Fast Food'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('McDonalds');
        expect(response.body.location).toBe('New York');
        expect(response.body.cuisine).toBe('Fast Food');
    });

    test('POST /restaurants/add', async () => {
        const response = await request(app)
            .post('/restaurants/add')
            .send({
                name: '',
                location: 'London',
                cuisine: 'World'
            });
        expect(response.statusCode).toBe(400);

        // Ensure that the error message includes the validation error for the 'name' field
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].msg).toBe('Name is required');
    })

    test('PUT /restaurants/update/:id', async () => {
        const restaurant = await Restaurant.create({
            name: 'McDonalds',
            location: 'New York',
            cuisine: 'Fast Food'
        });

        const response = await request(app)
            .put(`/restaurants/update/${restaurant.id}`)
            .send({
                name: 'Burger King',
                location: 'New York',
                cuisine: 'Fast Food'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Burger King');
        expect(response.body.location).toBe('New York');
        expect(response.body.cuisine).toBe('Fast Food');
    });

    test('DELETE /restaurants/delete/:id', async () => {
        const restaurant = await Restaurant.create({
            name: 'McDonalds',
            location: 'New York',
            cuisine: 'Fast Food'
        });

        const response = await request(app).delete(`/restaurants/delete/${restaurant.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Restaurant deleted');
    });
});

