const supertest = require('supertest');
const faker = require('faker');
const jwt = require("jsonwebtoken");

const app = require('../../App');

const UserService = require('../../services/userService');
const ExternalAuthService = require('../../services/externalAuthService');

const request = supertest(app);

describe('Auth', () => {

    it('should be able to authenticate a user', async () => {

        let password = faker.internet.password();
        let user = await UserService.createUser({
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            email: faker.internet.email(),
            isVerified: true,
            password: password,
            avatar: faker.image.avatar()
        });

        const response = await request.post('/auth/login').send({
            email: user.email,
            password: password
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
    });

    it('should not be able to authenticate a user with wrong password', async () => {

        let password = faker.internet.password();
        let user = await UserService.createUser({
            name: faker.name.firstName(0),
            surname: faker.name.lastName(0),
            email: faker.internet.email(),
            isVerified: true,
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

    it('should not be able to authenticate an unverified user', async () => {

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
            password: password
        });
        expect(response.status).toBe(403);
        expect(response.body).not.toHaveProperty('token');
        expect(response.body.errors).toBe('Account has not been verified');
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

    it('should be able to register with facebook', async () => {

        const response = await request.post('/auth/facebook').send({
            email: faker.internet.email(),
            provider_id: faker.random.uuid(),
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            avatar: faker.image.avatar(),
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.isVerified).toBe(true);
    });

    it('should be able to log in with facebook', async () => {

        let userData = {
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            password: faker.internet.password(),
            avatar: faker.image.avatar(),
            email: faker.internet.email()
        };

        let user = await  UserService.createUser(userData);

        let externalAuth = await ExternalAuthService.create({
            user: user._id,
            email: user.email,
            provider: 'facebook',
            providerId: faker.random.uuid()
        });

        const response = await request.post('/auth/facebook').send({
            email: user.email,
            provider_id: externalAuth.providerId,
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user._id).toBe(user._id.toString());
    });
});
