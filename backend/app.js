const express = require('express');
const cors = require('cors');
const route = require('./route');
const bodyParser = require('body-parser');

const serverConfig = {
    PORT: process.env.TUBES_PORT || '3001',
    IP: process.env.TUBES_IP || '127.0.0.1',
};

const app = express();
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(bodyParser.urlencoded(({ extended: false}));
app.use(bodyParser.json());
app.use(route);
app.user(cors());

/**
 * Routing ke start-page
 */
app.get('/', (req, res)=>{
    res.send('Hey');
})

app.get('/route', (req,res) => {
    
})

app.listen(serverConfig.PORT, ()=>{
    console.log('App running at https://${serverConfig.IP}:${serverConfig.PORT}');
})

