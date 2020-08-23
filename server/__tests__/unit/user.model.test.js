const fake = require('faker');
const UserModel = require('../../models/User');
const UserFactory = require('../../__mocks__/factories/user.factory');

describe('User model', () => {
    describe( 'User validation', () => {

        let newUser;
        beforeAll(() => {
           newUser = UserFactory.generate({});
        });

        test('should correctly validate a user', async () => {
            await expect(new UserModel(newUser).validate()).resolves.toBeUndefined();
        })

        test('should throw a validation error if email is invalid', async () => {
            newUser.email = 'invalidEmail';
            await expect(new UserModel(newUser).validate()).rejects.toThrow();
        });

        test('should throw a validation error if the password is less than 6 chars long', async () => {
            newUser.password = '12345';
            await expect(new UserModel(newUser).validate()).rejects.toThrow();
        })
    });
});
