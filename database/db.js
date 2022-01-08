const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;

// This URI should be in a .env file
const DB_URI = 'mongodb+srv://shopify-admin:Admin123@cluster-shopify-invento.f4jdn.mongodb.net/Inventory?retryWrites=true&w=majority';

// This function is used to open the connection from the database
// If testing is occuring, connect to a mock database
function open() {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            const mockgoose = new Mockgoose(mongoose);
            mockgoose
                .prepareStorage()
                .then(() => {
                    mongoose
                        .connect('', { useNewUrlParser: true, useUnifiedTopology: true })
                        .then((res, err) => {
                            if (err) return reject(err);
                            resolve();
                        })
                        .catch(err => console.log(err));
                });
        } else {
            mongoose
                .connect( DB_URI , { useNewUrlParser: true, useUnifiedTopology: true })
                .then((res, err) => {
                    if (err) return reject(err);
                    resolve();
                })
                .catch(err => console.log(err));
        }
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