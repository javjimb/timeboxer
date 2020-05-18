const UserModel = require('../models/User');

class UserService {

    async getUsers(filter) {
        return await UserModel.find(filter);
    }

    async getUserById(user_id) {
        return await UserModel.findById(user_id);
    }

    async createUser(user) {
        let newUser = await UserModel.create(user);
        newUser.password = undefined;
        return newUser;
    }

    async deleteUser(user_id) {
        let user = await this.getUserById(user_id);
        await UserModel.findByIdAndRemove(user_id);
        return user;
    }

    async updateUser(user_id, update) {
        return await UserModel.findByIdAndUpdate(user_id, update, { new: true, runValidators: true });
    }
}

module.exports = new UserService();

