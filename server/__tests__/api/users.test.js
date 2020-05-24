const supertest = require('supertest');
const faker = require('faker');
const app = require('../../App');
const request = supertest(app);
const UserService = require('../../services/userService');

describe('User', () => {

    it('should be able to create user', async () => {
        let userData = {
            name: faker.name.firstName(0),
            surname: faker.name.lastName(0),
            email: faker.internet.email(),
            password: faker.internet.password(),
            avatar: faker.image.avatar()
        };
        const response = await request.post('/users').send(userData);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(userData.name);
        expect(response.body.surname).toBe(userData.surname);
        expect(response.body.email).toBe(userData.email);
        expect(response.body).not.toHaveProperty('password');
    });

    it('should not create a user without required data', async () => {
        let userData = {
            name: faker.name.firstName(0),
            surname: faker.name.lastName(0),
            password: '123',
            avatar: faker.image.avatar()
        };
        const response = await request.post('/users').send(userData);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('Email is required');
        expect(response.body.errors[1].msg).toBe('Password must be at least 6 characters long');
    });

    it('should not create a duplicate user', async () => {
        let email = faker.internet.email();
        let userData = {
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            password: faker.internet.password(),
            avatar: faker.image.avatar(),
            email: email
        };

        await UserService.createUser(userData);
        const response = await request.post('/users').send(userData);

        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('The email address is already registered');
    });
});
