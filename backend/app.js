const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const colName = 'works'; // ganti nama database disini, ada "tubes" dan ada "test"
require('dotenv/config');
PORT = process.env.PORT || 80
ATLAS_URI = "mongodb+srv://chadbot:chadbot@stima-chadbot.ynlvv.mongodb.net/tubes?retryWrites=true&w=majority"

const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const client = new MongoClient(ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors({origin: 'https://chadbot-stima.herokuapp.com', credentials: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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


// dapetin semua data di database
app.get('/data/fetch', async (req,res) => {
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
        let size = await collection.countDocuments({})
        if (size > 0) {
            await collection.find().sort({wid:-1}).limit(1).forEach(element => {
                maxWid = element.wid;
            });
        }
        let work = {
            makul: req.body.makul,
            wid: Number(maxWid + 1),
            deadline: req.body.deadline,
            topik: req.body.topik,
            jenis: req.body.jenis
        };

        try {
            const savedWork = await collection.insertOne(work);
            res.send(work);
            console.log(savedWork)
        } catch (err) {
            console.log(err)
            res.status(400).send(err);
        }
    } 
});

app.put('/data/update', async (req, res) => {
    if (!req.body.wid || req.body.wid !== parseInt(req.body.wid)) {
        res.status(400).send('ID tidak boleh kosong');
    } else if (!req.body.deadline) {
        res.status(400).send('Deadline tidak boleh kosong');
    } else {
        console.log(req.body.wid)
        console.log(req.body.deadline)

        const ids = parseInt(req.body.wid);
        const filter = { wid: ids };
        const update = { $set: {deadline: req.body.deadline }};
        collection.updateOne(filter, update);
        let doc = await collection.findOne(filter);
        if (doc !== null) res.send(doc)
        else res.status(400).send("Didn't find the task that have the same id to be updated")
    }
});

app.delete('/data/delete/', async (req, res) => {
    if (!req.body.wid ||  req.body.wid !== parseInt(req.body.wid)) {
        res.status(400).send('No id given');
    } else {
        console.log(req.body.wid)
        const ids = parseInt(req.body.wid)

        let doc = await collection.deleteOne({ wid: ids })

        if (doc.deletedCount === 0) res.status(400).send('Task with that id is not found')
        else res.send('Successfully deleted')
    }
});

app.listen(PORT, () => console.log(`App running at https://${process.env.IP}:${PORT}`));