const ExternalAuthModel = require('../models/ExternalAuth');

class ExternalAuthService {

    async getAll(params) {
        return await ExternalAuthModel.find(params);
    }

    async create(data) {
        return ExternalAuthModel.create(data);
    }
}

module.exports = new ExternalAuthService();

