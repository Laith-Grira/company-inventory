const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;

// The URI to establish connection to the cluster
const DB_URI = 'mongodb+srv://'
                + process.env.DB_USERNAME +':'
                + process.env.DB_PASSWORD 
                + '@cluster-shopify-invento.f4jdn.mongodb.net/Inventory?retryWrites=true&w=majority';


const open = () => {
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

// Open a connection to a mock database
const openMockDB = () => {
    return new Promise((resolve, reject) => {
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
    });
}

const close = () => {
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

module.exports = { open, close, openMockDB };