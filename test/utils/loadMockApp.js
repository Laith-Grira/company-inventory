const express = require('express');
const bodyParser = require('body-parser');

const load = () => {

    const app = express();

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    // Coonecting to the items route
    const itemRoutes = require('../../api/routes/items');
    app.use('/items', itemRoutes);

    app.use((req, res, next) => {
        const error = new Error('Not found');
        error.status = 404;
        next(error);
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
    });

    return app;
}

module.exports = load;