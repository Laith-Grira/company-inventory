const express = require('express');
const app = express();

const itemRoutes = require('./api/routes/items');

app.use('/items', itemRoutes);

module.exports = app;