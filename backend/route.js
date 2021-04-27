const router = require('express').Router();
const fire = require('./fire');
const db = fire.firestore().collection('data').doc('tubes');


router.get('/data', (req,res) => {
    db.settings({
        timestampsInSnapshots: true
    })
    var allData = []
    db.collection('tubes')
    .orderBy('deadline','desc').get()
    .then(snapshot => {
        snapshot.forEach((hasil) => {
            allData.push(hasil.data())
        })
        // datanya ada di allData, bentuknya gatau gimana wkkwkw print dulu
        console.log(allData)
        res.send(allData)
    }).catch((error)=> {
        console.log(error)
    })
})

router.post('/data', (req,res) => {
    // TODO:
    db.settings({
        timestampsInSnapshots: true
    })
    db.collection('tubes').add({
        id: req.body.id,
        matkul: req.body.nama,
        deadline: new Date(req.body.deadline),
        topik: req.body.topik,
        jenis: req.body.jenis
    })
    res.send({
        id: req.body.id,
        matkul: req.body.nama,
        deadline: new Date(req.body.deadline),
        topik: req.body.topik,
        jenis: req.body.jenis
    })
})

exports.getData = (req, res) => {
    const data = {
        id: req.body.id,
        matkul: req.body.nama,
        deadline: new Date(req.body.deadline),
        topik: req.body.topik,
        jenis: req.body.jenis
    }

    db
        .collection('data')
        .doc('tubes')
        .set(data);
}

module.exports = router