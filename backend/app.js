const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const colName = 'works'; // ganti nama database disini, ada "tubes" dan ada "test"
require('dotenv/config');
const data = require('./route');
const Work = require('./models/Work');
ATLAS_URI = "mongodb+srv://chadbot:chadbot@stima-chadbot.ynlvv.mongodb.net/tubes?retryWrites=true&w=majority"

const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors({origin: true, credentials: true}));

// Connect to MongoDB
mongoose.connect(ATLAS_URI, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        res.send(err);
    } else {
        console.log('connected to DB');
    }
})

// Connect client to MongoDB
client.connect(function (err, db) {
        collection = client.db("tubes").collection(colName);
        console.log(`client connected`);
});

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

// dapetin semua data di database
app.get('/data/fetch', (req,res) => {
    collection.find({}).toArray((err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log(result);
            console.log('Database fetched successfully');
            res.send(result);
        }
    });
});

app.get('/test', (req,res) => {
    collection.find().sort({wid:-1}).limit(1).forEach(element => {
        console.log(element);
    });
})

app.post('/data/add', async (req, res) => {
    const par = req.body;
    // check null value
    if (!par.makul || !par.topik || !par.jenis) {
        res.status(400).send('Data yang ingin ditambah tidak lengkap');
    } else {
        // let mx = collection.findOne().sort({age:-1})
        // console.log(mx)
        let maxWid = 0;
        await collection.find().sort({wid:-1}).limit(1).forEach(element => {
            maxWid = element.wid;
        });
        // let max = collection.find({wid:1}).sort({wid:-1}).limit(1)
        let work = {
            makul: req.body.makul,
            wid: Number(maxWid + 1),
            deadline: req.body.deadline,
            topik: req.body.topik,
            jenis: req.body.jenis
        };
        res.send(work);
    } 
});

app.put('/data/update', async (req, res) => {
    if (!req.body.wid) {
        res.status(400).send('ID tidak boleh kosong');
    } else if (!req.body.deadline) {
        res.status(400).send('Deadline tidak boleh kosong');
    } else {
        const filter = { wid: req.body.wid };
        const update = { $set: {deadline: req.body.deadline }};

        let doc = collection.findOne(filter);
        await collection.updateOne(filter, update, function(err, res) {
            if (err) {
                res.status(400).send('Failed to update')
            } else {
                doc = collection.findOne(filter);
                res.send(doc);
                console.log('Data updated successfully');
            }
        });
    }
});

app.delete('/data/delete/', (req, res) => {
    if (!req.body.wid) {
        res.status(400).send('No id given');
    } else {
        const delt = { wid: req.body.wid };
        collection.deleteOne(delt);
    }
});




app.listen(process.env.PORT, () => console.log(`App running at https://${process.env.IP}:${process.env.PORT}`));