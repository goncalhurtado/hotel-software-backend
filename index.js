require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');
const dbConnection = require('./database/db');


const app = express();

// Middlewares
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// configuracion rutas
app.use(process.env.API, router)

// puerto
const port = process.env.PORT;

dbConnection();
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});