const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // helps us connect to our MongoDB database
//The dependencies required for the server (express and cors). Originally we had body
// parser in here as well, but it is not needed since it is included in express

require('dotenv').config();
// This line makes it so that we can have our environment variables in the dotenv file

const app = express();
const port = process.env.PORT || 5000;
// Code to create our express server, we can see the port number where the server will 
// reside

app.use(cors());
app.use(express.json());
// The cors middleware, which allows us to parse JSON files. Our server will be sending
// and receiving JSON files

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewURLParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// More code to connect mongoose to the MongoDB database

const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');

app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}) 
// Starts the server, to listen to a particular port (done by the command nodemon server in
// the terminal)