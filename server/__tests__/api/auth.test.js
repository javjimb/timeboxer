const supertest = require('supertest');
const faker = require('faker');

const app = require('../../App');

const UserService = require('../../services/userService');

const request = supertest(app);

describe('Auth', () => {

    it('should be able to authenticate a user', async () => {

        let password = faker.internet.password();
        let user = await UserService.createUser({
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            email: faker.internet.email(),
            password: password,
            avatar: faker.image.avatar()
        });

        const response = await request.post('/auth/login').send({
            email: user.email,
            password: password
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should not be able to authenticate a user with wrong password', async () => {

        let password = faker.internet.password();
        let user = await UserService.createUser({
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            email: faker.internet.email(),
            password: password,
            avatar: faker.image.avatar()
        });

        const response = await request.post('/auth/login').send({
            email: user.email,
            password: 'someotherpassword'
        });

        expect(response.status).toBe(401);
        expect(response.body).not.toHaveProperty('token');
        expect(response.body.errors).toBe('Invalid password');
    });

    it('should not be able to authenticate with non registered email', async () => {

        const response = await request.post('/auth/login').send({
            email: faker.internet.email(),
            password: faker.internet.password(),
        });

        expect(response.status).toBe(401);
        expect(response.body).not.toHaveProperty('token');
        expect(response.body.errors).toBe('Could not find email address registered');
    });

});
