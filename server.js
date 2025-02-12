require('dotenv').config(); 

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dotenv =require("dotenv");
const connectDatabase = require('./database');
const mongoose = require('mongoose');

app.get('/ping', (req, res) => {
    res.send('Pong!');
});

connectDatabase();

app.get('/', (req, res) => {
    let dbStatus;
    switch (mongoose.connection.readyState) {
        case 0:
            dbStatus = 'Disconnected';
            break;
        case 1:
            dbStatus = 'Connected';
            break;
        case 2: 
            dbStatus = 'Connecting';
            break;  
        case 3:
            dbStatus = 'Disconnecting';
            break;
        default:
            dbStatus = 'Unknown state';
            break;
    }
            res.json({ status: dbStatus });
        });
        
        
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });