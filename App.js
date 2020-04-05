require('dotenv').config();

const express = require('express');

const routes = require('./routes/routes');

const databaseHelper = require('./helpers/database');

class App {
    constructor() {
        this.express = express();

        this.database();
        this.middlewares();
        this.routes();
    }

    database() {
        databaseHelper.connect();
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.use(routes);
    }
}

module.exports = new App().express;
