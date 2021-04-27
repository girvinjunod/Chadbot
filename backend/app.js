require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const route = require('./route');
const MongoClient = require('mongodb').MongoClient
const serverConfig = {
    PORT: process.env.TUBES_PORT || '3001',
    IP: process.env.TUBES_IP || '127.0.0.1',
};
const client = new MongoClient(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();

app.use(cors());
app.use(express.json());
// app.use(route);


app.listen(serverConfig.PORT, ()=>{
    console.log(`App running at https://${serverConfig.IP}:${serverConfig.PORT}`);
})

app.get('/data', (req, res) => {
    client.connect(function (err, db) {
        const collection = client.db("tubes").collection("tubes");
        
        console.log(`Connected to MongoDB`)
        collection.find({}).toArray((e, result) => {
            if (e) {
                res.status(400).send(e);
            } else {
                console.log(result);
                res.json(result);
            }
        });
    });
})

// module.exports = client
// export client
// let globalVariable = {
//     cli: client;
// }