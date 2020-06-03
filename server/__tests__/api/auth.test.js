const supertest = require('supertest');
const faker = require('faker');
const jwt = require("jsonwebtoken");

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
            name: faker.name.firstName(0),
            surname: faker.name.lastName(0),
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

    /*
    it('should be able to get own data', async () => {

        const payload = {
            user : {
                _id: faker.random.uuid(),
                name: faker.name.firstName(),
                surname: faker.name.lastName(),
                email: faker.internet.email()
            }
        };

        let token = await jwt.sign(
            payload,
            process.env.JWT_SECRET
        );

        const response = await request.get('/auth/me').set('x-access-token', token).send().catch( e => {console.error(e)});

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('surname');
        expect(response.body).toHaveProperty('email');
    });
     */
});
