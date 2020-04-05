const MemoryDatabaseServer = require('../helpers/memoryDatabaseServer');

module.exports = async () => {
    await MemoryDatabaseServer.stop();
};
