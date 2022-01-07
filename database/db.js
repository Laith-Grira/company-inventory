const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://shopify-admin:Admin123@cluster-shopify-invento.f4jdn.mongodb.net/Inventory?retryWrites=true&w=majority';

// This function is used to open the connection from the database
function open() {
    return new Promise((resolve, reject) => {
        mongoose
                .connect( DB_URI , { useNewUrlParser: true, useUnifiedTopology: true })
                .then((res, err) => {
                    if (err) return reject(err);
                    resolve();
                })
                .catch(err => console.log(err));
    });
}

// This function is used to close the connection from the database
function close() {
    return new Promise((resolve, reject) => {
        mongoose
                .disconnect()
                .then((res, err) => {
                    if (err) return reject(err);
                    resolve();
                })
                .catch(err => console.log(err))
    });
}

module.exports = { open, close };