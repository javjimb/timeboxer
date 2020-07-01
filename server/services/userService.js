const UserModel = require('../models/User');

class UserService {

    async getUsers(filter) {
        return await UserModel.find(filter);
    }

    async findById(id) {
        return await UserModel.findOne({_id: id});
    }

    async findByEmail(email) {
        return await UserModel.findOne({email: email});
    }

    async createUser(user) {
        let newUser = await UserModel.create(user);
        newUser.password = undefined;
        return newUser;
    }

    async deleteUser(id) {
        let user = await this.findById(id);
        await UserModel.findByIdAndRemove(id);
        return user;
    }

    async updateUser(id, update) {
        let user =  await UserModel.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        await UserModel.findByIdAndRemove(id);
        return user;
    }
}

module.exports = new UserService();

