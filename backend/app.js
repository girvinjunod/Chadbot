const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const colName = 'test'; // ganti nama database disini, ada "tubes" dan ada "test"
require('dotenv/config');
const data = require('./route');

const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        res.send(err);
    } else {
        console.log('connected to DB');
    }
})

// Connect client to MongoDB


// Setup cors
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", process.env.IP); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// Dummy data
let dataa = [
    {wid: 10, makul: 'IF2211', deadline: Date.now(), topik: 'parse', jenis: 'tubes'},
    {wid: 10, makul: 'IF2211', deadline: Date.now(), topik: 'test', jenis: 'pr'}
]

app.get('/', function(req, res, next) {
    res.send('test');
});

// Middleware untuk update data dari database
app.use('/data', (req,res, next) => {
    client.connect(function (err, db) {
        try {
            req.collection = client.db("tubes").collection(colName);
            console.log(`client connected`);
        } catch (err) {
            res.status(403).send('Client failed to connect, auth failed');
        }
    });
    next();
});

app.get('/data/fetch', (req,res) => {
    req.collection.find({}).toArray((err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log(result);
            console.log('masuk');
            return result;
        }
    });
});

app.post('/data/add', async (req, res) => {
    const par = req.body;
    // check null value
    if (!par.makul || !par.topik || !par.jenis) {
        res.status(400).send('Data yang ingin ditambah tidak lengkap');
    } else {
        const work = new Work ({
            wid: req.body.wid,
            makul: req.body.makul,
            deadline: Date.now(),
            topik: req.body.topik,
            jenis: req.body.jenis
        });
        try {
            const savedWork = await work.save();
            res.json(savedWork);
        } catch (err) {
            res.send(err);
        }
    }
    // dataa.push(datum);
    // res.send(datum);

})

app.get('')



app.get('/data/test', (req,res) => {
    col.find({}).toArray((err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log(result);
            console.log('Database fetched successfully');
            res.json(result);
        }
    });
});

app.listen(process.env.PORT, () => console.log(`App running at https://${process.env.IP}:${process.env.PORT}`));