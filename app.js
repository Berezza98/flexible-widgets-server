const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const updater = require('jsonfile-updater');
const jsonfile = require('jsonfile');
const base64Img = require('base64-img');
const util = require('util');

const { getFonts } = require('./get_data');
const { templates } = require('./templates');
const { images } = require('./images');

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
    let page = parseInt(req.query.page);
    console.log(page);
    res.send(JSON.stringify(images.slice(page - 6, page)));        
});

app.get('/getImagesByName', async (req, res) => {
    let name = req.query.name;
    console.log(name);
    let imagesForSending = images.filter(image => {
        if(image.name.toLowerCase().indexOf(name) !== -1){
            return true;
        }else{
            return false;
        }
    });
    console.log(imagesForSending);
    res.send(JSON.stringify(imagesForSending));        
});

app.post('/setTemplate', (req, res) => {
    templates.push(req.body);
    res.send('OK');
});

app.get('/getTemplates', (req, res) => {
    let page = parseInt(req.query.page);
    res.send(JSON.stringify(templates.slice(page - 6, page)));
});

app.get('/getTemplatesByName', (req, res) => {
    let name = req.query.name;
    let templatesForSending = templates.filter(temp => {
        if(temp.name.toLowerCase().indexOf(name) !== -1){
            return true;
        }else{
            return false;
        }
    });
    console.log(templatesForSending);
    res.send(JSON.stringify(templatesForSending)); 
});

app.listen(process.env.PORT, () => {
    console.log('Running on port 3300');
});