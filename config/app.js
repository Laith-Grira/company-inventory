/**
 * @description This application.js file is spinning up this express application which 
 * will make handeling requests easier and more readable.
 * 
 * @author Laith Grira
 */

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Spin up the express application
const app = express();

// Calling different middlewares that we will use
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
if (process.env.NODE_ENV != 'test') {
    // Do not display logs while testing
    app.use(morgan('dev'));
}

// Handeling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Adding the paths to the route files
const itemRoutes = require('../api/routes/items');

// Routes which should handle requests
app.use('/items', itemRoutes);

// If we reach this route, that means non of the previous routes worked
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// This will handle the forwarded previous error, or any other error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;