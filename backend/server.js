const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
require('dotenv').config();
const db = require('./db');

const app = express();

// Gunakan middleware cors dengan konfigurasi dari variabel lingkungan
app.use(cors({
    origin: process.env.FRONTURL, // Ganti dengan URL frontend yang sebenarnya
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(bodyparser.json());

app.get('/', (req, res) => {
    const obj = {
        name: 'ICSSF'
    }
    res.send(obj);
});

const conferenceroutes = require('./routers/conferenceRouting');
const authorsroutes = require('./routers/authorwork');
const reviewerroutes = require('./routers/reviewerController');
const allotments = require('./routers/allotmentsController');
const committee = require('./routers/committeeController');
const members = require('./routers/membersController');
const track = require('./routers/TrackRoutes');
const topic = require('./routers/topicController');
const report = require('./routers/reports');

app.use('/conference', conferenceroutes);
app.use('/author', authorsroutes);
app.use('/reviewer', reviewerroutes);
app.use('/paper', allotments);
app.use('/committee', committee);
app.use('/member', members);
app.use('/track', track);
app.use('/topic', topic);
app.use('/report', report);

const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
