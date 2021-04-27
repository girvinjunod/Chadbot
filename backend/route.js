// const client = require('./app')
const router = require('express').Router();
alert(globalVariable.cli);
// const db = fire.firestore().collection('data').doc('tubes');


// router.get('/data', (req,res) => {
//     db.settings({
//         timestampsInSnapshots: true
//     })
//     var allData = []
//     db.collection('tubes')
//     .orderBy('deadline','desc').get()
//     .then(snapshot => {
//         snapshot.forEach((hasil) => {
//             allData.push(hasil.data())
//         })
//         // datanya ada di allData, bentuknya gatau gimana wkkwkw print dulu
//         console.log(allData)
//         res.send(allData)
//     }).catch((error)=> {
//         console.log(error)
//     })
// })

// router.post('/data', (req,res) => {
//     // TODO:
//     db.settings({
//         timestampsInSnapshots: true
//     })
//     db.collection('tubes').add({
//         id: req.body.id,
//         matkul: req.body.nama,
//         deadline: new Date(req.body.deadline),
//         topik: req.body.topik,
//         jenis: req.body.jenis
//     })
//     res.send({
//         id: req.body.id,
//         matkul: req.body.nama,
//         deadline: new Date(req.body.deadline),
//         topik: req.body.topik,
//         jenis: req.body.jenis
//     })
// })

// exports.getData = (req, res) => {
//     const data = {
//         id: req.body.id,
//         matkul: req.body.nama,
//         deadline: new Date(req.body.deadline),
//         topik: req.body.topik,
//         jenis: req.body.jenis
//     }

//     db
//         .collection('data')
//         .doc('tubes')
//         .set(data);
// }

router.get('/data', (req, res) => {
    client.connect(function (err, db) {
        collection = client.db("tubes").collection("tubes");
        
        console.log(`Connected to MongoDB`)
        collection.find({}).toArray((err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                console.log(result);
                res.json(JSON.stringify(result));
            }
        });

        client.close();
    });

})

router.post('/data', (req, res) => {
    collection.find({}).toArray((err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log(result);
            res.json(JSON.stringify(result));
        }
    });
})

router.put('/data', (req,res) => {
    let query = {nama:"test"};
    let updateDocument = {$set: {ayam: "ga enak"}};
    res.json(JSON.stringify(collection.updateOne(query,updateDocument)));
})

// const findResult = await orders.find({
//     name: "Lemony Snicket",
// });
module.exports = router