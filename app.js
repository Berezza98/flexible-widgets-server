const express = require('express');
const cors = require('cors');

const { getFonts } = require('./get_data');

const app = express();
app.use(cors());

app.get('/getFonts', async (req, res) => {
    let fonts = await getFonts();
    setTimeout(() => {
        res.send(JSON.stringify(fonts));
    }, 500);
    
});

app.get('/getImages', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify(["https://i.ytimg.com/vi/yA30K3z5PSw/hqdefault_live.jpg","https://i.ytimg.com/vi/yA30K3z5PSw/hqdefault_live.jpg", "https://i.ytimg.com/vi/yA30K3z5PSw/hqdefault_live.jpg", "https://i.ytimg.com/vi/yA30K3z5PSw/hqdefault_live.jpg", "https://i.ytimg.com/vi/yA30K3z5PSw/hqdefault_live.jpg","https://i.ytimg.com/vi/yA30K3z5PSw/hqdefault_live.jpg","https://i.ytimg.com/vi/yA30K3z5PSw/hqdefault_live.jpg","https://i.ytimg.com/vi/yA30K3z5PSw/hqdefault_live.jpg", "https://i.ytimg.com/vi/yA30K3z5PSw/hqdefault_live.jpg"]));        
    }, 1000);
});

app.listen(3300, () => {
    console.log('Running on port 3300');
});