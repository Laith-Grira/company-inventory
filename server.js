/**
 * @description This is the entry point of our project. 
 * This file is used to set up all the code to spin up the nodejs server.
 * 
 * @author Laith Grira
 */

const http = require('http');
const database = require('./database/db');
const port = process.env.PORT || 5000;


// Connect to the database, skip this step while testing because we will create a mock database
// connection inside of the test file
if (process.env.NODE_ENV != 'test') {
        database.open()
                .then(() => console.log(`***** MongoDB is connected *****`))
                .catch(() => console.log('Unable to open database connection...'));
}

// This will allow us to send requests to the application middleware, so we can receive a response
const app = require('./config/app');

// Create the server
const server = http.createServer(app);

// Start the port and listen to through the specified file
server
    .listen(port, () => console.log(`***** Server is connected to port ${port} *****`))
    .on( "error", () => console.log(`Server failed to start on port ${port}`));


module.exports = server;