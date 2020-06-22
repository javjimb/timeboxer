const supertest = require('supertest');
const faker = require('faker');
const jwt = require("jsonwebtoken");
const app = require('../../App');
const request = supertest(app);
const UserService = require('../../services/userService');

describe('User', () => {

    let user = {};

    beforeAll( async  () => {
        const payload = {
            user : {
                _id: '5dbff32e367a343830cd2f49',
                name: faker.name.firstName(),
                surname: faker.name.lastName(),
                email: faker.internet.email()
            }
        };

        accessToken = await jwt.sign(
            payload,
            process.env.JWT_SECRET
        );

        UserService.findById = jest.fn().mockResolvedValue(payload.user);

        // global user
        user = payload.user;
    });

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

    it('should be able to update a user', async () => {

        let userData = {
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            password: faker.internet.password(),
            avatar: faker.image.avatar(),
            email: faker.internet.email()
        };

        user = await  UserService.createUser(userData);

        const response = await request.put('/users/' + user._id)
            .set('x-access-token', accessToken)
            .send({name: 'Name change', surname: 'Surname change'})
            .catch( e => {console.error(e)});

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Name change');
        expect(response.body.surname).toBe('Surname change');
    });
});
