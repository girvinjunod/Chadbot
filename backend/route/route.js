var router = require('express').Router()
var fire = require('./fire')
var db = fire.firestore()

router.get('/data', (req,res) => {
    // TODO: buat database di firestore
})

router.post('/data', (req,res) => {
    // TODO: 
    res.send({
        matkul: req.body.nama,
        deadline: new Date(req.body.deadline),
        topik: req.body.topik,
        jenis: req.body.jenis
    })
})

module.exports = router