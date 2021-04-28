// const client = require('./app')
const express = require('express');
const router = express.Router();
const Work = require('./models/Work');



// router.get('/data', (req, res) => {
//     client.connect(function (err, db) {
//         collection = client.db("tubes").collection("tubes");
        
//         console.log(`Connected to MongoDB`)
//         collection.find({}).toArray((err, result) => {
//             if (err) {
//                 res.status(400).send(err);
//             } else {
//                 console.log(result);
//                 res.json(JSON.stringify(result));
//             }
//         });
//         client.close();
//     });
// })

// router.get('/', (req, res) => {
//     client.connect(function (err, db) {
//         //const collection = client.db("tubes").collection("tubes");
//         if (err) {
//             res.status(400).send(err);
//         } else {
//             console.log('Connected to MongoDB');
//         }
        // console.log(`Connected to MongoDB`)
        // collection.find({}).toArray((e, result) => {
        //     if (e) {
        //         res.status(400).send(e);
        //     } else {
        //         console.log(result);
        //         res.json(result);
        //     }
        // });
//     });
// })

const addWork = async (req) => {
    const work = new Work({
        workId: req.params.workId,//autoincrement?,
        matkul: req.params.desc,
        deadline: req.params.deadline,
        topik: req.params.topik,
        jenis: req.params.jenis
    });
    try {
        const savedWork = await work.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
};

router.post('/retrieve', async (req,res) => {
    const work = Work.findOne({
        $eq: [
            {workId: req.workId},
            {matkul: req.matkul}
        ]
    })
})

const printAll = (res) => {
    collection.find({}).toArray((err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log(result);
            console.log('masuk');
            // res.json(JSON.stringify(result));
            return result;
        }
    });
};

router.put('/update', async (req,res) => {
    try {
        //const valid = await 
        let query = {nama:"test"};
        let updateDocument = {$set: {ayam: "ga enak"}};
        res.json(JSON.stringify(collection.updateOne(query,updateDocument)));
    } catch (err) {
        res.status(400).send(err);
    }
})

router.delete('/:workId', async (req,res) => {
    //const removedWork = await 
});

// const findResult = await orders.find({
//     name: "Lemony Snicket",
// });
module.exports = router