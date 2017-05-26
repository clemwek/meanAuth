const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
});

const app = express();

const users = require('./route/users');

// Port number 
const port = 3000;

// CORS middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser Middleware
app.use(bodyParser.json());

// Passport middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid End point');
});

app.get('*', (req, res) => {
    res.sendFile(path.loin(__dirname, 'public/index.html'))
});

app.listen(port, () => {
    console.log("server started on port "+port);
});