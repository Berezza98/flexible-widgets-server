const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const updater = require('jsonfile-updater');
const jsonfile = require('jsonfile');
const base64Img = require('base64-img');
const util = require('util');
const fileUpload = require('express-fileupload');

const { getFonts } = require('./get_data');
const { templates } = require('./templates');
const { images } = require('./images');

const app = express();
app.use(fileUpload());
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

app.post('/saveImage', (req, res) => {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
 
        let sampleFile = req.files['items[]'];

        sampleFile.mv(`./public/images/${sampleFile.name}`, function(err) {
            if (err)
            return res.status(500).send(err);
            images.unshift({
                name: sampleFile.name,
                src: `http://localhost:3300/images/${sampleFile.name}` //https://flexible-app.herokuapp.com/images/
            });
            res.send(JSON.stringify(images.slice(0, 6)));
        });
});

app.listen(process.env.PORT ? process.env.PORT : 3300, () => {
    console.log('Running on port 3300');
});