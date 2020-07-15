const UserModel = require('../models/User');
const TokenModel = require('../models/Token');
const crypto = require('crypto');

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
        let user = await UserModel.findByIdAndUpdate(id, update, { new: true, runValidators: true })
            .catch(e => {console.log(e)});
        user.password = undefined;
        return user;
    }

    async generateVerificationToken(user) {
        let token = new TokenModel({
            user: user._id,
            token: crypto.randomBytes(16).toString('hex')
        });
        token.save();
        return token;
    }

    async findVerificationToken(token) {
        let result = await TokenModel.findOne({token: token});
        return result;
    }
}

module.exports = new UserService();

