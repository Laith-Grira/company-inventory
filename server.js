const http = require('http');
const port = process.env.PORT || 5000;
const database = require('./database/db');


// Connect to the database
database.open()
        .then(() => console.log(`***** MongoDB is connected *****`))
        .catch(() => console.log('Unable to open database connection...'));

// This will allow us to send requests to the application middleware, so we can receive a response
const app = require('./app');

// Create the server
const server = http.createServer(app);

// Start the port and listen to through the specified file
server
    .listen(port, () => console.log(`***** Server is connected to port ${port} *****`))
    .on( "error", () => console.log(`Server failed to start on port ${port}`));