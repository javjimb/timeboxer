/**
 * Create fake user for testing
 */

const faker = require('faker');

const BaseFactory = require('./base.factory');

class UserFactory extends BaseFactory {
    /**
     * Create a user
     *
     * @public
     * @param {Object} attrs of user
     * @returns {Object} a fake user
     */
    generate(attrs) {
        return {
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            avatar: faker.image.avatar(),
            isVerified: true,
            ...attrs,
        };
    }
}

module.exports = new UserFactory();
