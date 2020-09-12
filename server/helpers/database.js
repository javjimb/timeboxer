const mongoose = require('mongoose');

const connect = async () => {
    if (mongoose.connection.readyState === 0) {
        let DB_URI = 'mongodb://' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DATABASE;
        await mongoose.connect(
            process.env.NODE_ENV === 'test' ? global.__DB_URL__ : DB_URI,
            {
                authSource: 'admin',
                user: process.env.MONGODB_USERNAME,
                pass: process.env.MONGODB_PASSWORD,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            }
        );
    }
};

const truncate = async () => {
    if (mongoose.connection.readyState !== 0) {
        const { collections } = mongoose.connection;

        const promises = Object.keys(collections).map(collection =>
            mongoose.connection.collection(collection).deleteMany({})
        );

        await Promise.all(promises);
    }
};

const disconnect = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
};

module.exports = {
    connect,
    truncate,
    disconnect,
};
