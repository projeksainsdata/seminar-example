const mongoose = require('mongoose');
require('dotenv').config();

const mongodbUrl = process.env.MONGO_URI;
mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('connected', () => {
    console.log('connected to mongodb server');
});
db.on('error', (err) => {
    console.log('mongodb server connection error: ' + err);
});
db.on('disconnected', () => {
    console.log('mongodb server disconnected');
});
