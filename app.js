const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const updater = require('jsonfile-updater');
const jsonfile = require('jsonfile');
const base64Img = require('base64-img');
const util = require('util');

const { getFonts } = require('./get_data');
const file = './templates.json';

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json());

app.get('/getFonts', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify(['Arial', 'Gadget', 'Charcoal', 'monospace', 'Georgia', 'Palatino', 'cursive', 'Verdana']));
    }, 500);
    
});

app.get('/getImages', async (req, res) => {
    const toBase64 = util.promisify(base64Img.base64);
    let img1 = await toBase64(__dirname + '/public/images/1.png');
    let img2 = await toBase64(__dirname + '/public/images/2.jpg');
    setTimeout(() => {
        res.send(JSON.stringify([img2, img1, img2, img1, img2]));        
    }, 1000);
});

app.post('/setTemplate', async (req, res) => {
    await updater(file).append('templates', JSON.stringify(req.body));
    res.send('OK');
});

app.get('/getTemplates', async (req, res) => {
    let readFile = util.promisify(jsonfile.readFile);
    await readFile(file).then(data => {
        res.send(data);
    });
});

app.listen(3300, () => {
    console.log('Running on port 3300');
});