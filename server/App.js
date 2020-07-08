require('dotenv').config();
const express = require('express');
const cors = require('cors');
const databaseHelper = require('./helpers/database');
const bodyParser = require('body-parser');

class App {
    constructor() {
        this.express = express();
        this.express.use(cors());
        this.express.use(express.static('public'));
        this.express.use(bodyParser.json({limit: "10mb"}));
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
        this.express.use('/users', require('./routes/users'));
        this.express.use('/auth', require('./routes/auth'));
        this.express.use('/tasks', require('./routes/tasks'));
    }
}

module.exports = new App().express;
