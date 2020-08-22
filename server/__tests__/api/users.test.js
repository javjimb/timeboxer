const supertest = require('supertest');
const faker = require('faker');
const jwt = require("jsonwebtoken");
const app = require('../../App');
const request = supertest(app);
const UserService = require('../../services/userService');
const UserFactory = require('../../__mocks__/factories/user.factory');

describe('User', () => {

    let user = {};

    beforeAll( async  () => {
        const payload = {
            user : UserFactory.generate()
        };

        accessToken = await jwt.sign(
            payload,
            process.env.JWT_SECRET
        );

        UserService.findById = jest.fn().mockResolvedValue(payload.user);

        // global user
        user = payload.user;
    });

    it('should be able to create user', async done => {

        let userData = UserFactory.generate({});
        const response = await request.post('/users').send(userData);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(userData.name);
        expect(response.body.surname).toBe(userData.surname);
        expect(response.body.email).toBe(userData.email);
        expect(response.body).not.toHaveProperty('password');
        done();
    });

    it('should not create a user without required data', async done => {
        let userData = UserFactory.generate({password: '123', email: ''});
        const response = await request.post('/users').send(userData);

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('Email is required');
        expect(response.body.errors[1].msg).toBe('Password must be at least 6 characters long');
        done();
    });

    it('should not create a duplicate user', async done => {
        let email = faker.internet.email();
        let userData = UserFactory.generate({email: email});

        await UserService.createUser(userData);
        const response = await request.post('/users').send(userData);

        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('The email address is already registered');
        done();
    });

    it('should be able to update a user', async done => {
        let userData = UserFactory.generate({});

        user = await  UserService.createUser(userData);

        const response = await request.put('/users/' + user._id)
            .set('x-access-token', accessToken)
            .send({name: 'Name change', surname: 'Surname change'})
            .catch( e => {console.error(e)});

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Name change');
        expect(response.body.surname).toBe('Surname change');
        done();
    });

    it('should be able to get a single user by its id', async done => {

        let userData = UserFactory.generate({});
        let user = await UserService.createUser(userData);

        const response = await request.get('/users/' + user._id)
            .set('x-access-token', accessToken)
            .send()
            .catch( e => {console.error(e)});

        expect(response.status).toBe(200);
        expect(response.body.name).not.toBeNull();
        expect(response.body.surname).not.toBeNull();
        expect(response.body.email).not.toBeNull();
        expect(response.body.password).not.toBeNull();
        done();
    });
});
