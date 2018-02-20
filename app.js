const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/getFonts', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify([{name: "Times New Roman", id: 1}, {name: "Sans Bold", id: 2}]));
    }, 1000);
    
});

app.get('/getImages', (req, res) => {
    setTimeout(() => {
        res.send(JSON.stringify(["https://i.ytimg.com/vi/mmfEzGWOYPA/hqdefault.jpg", "https://i.ytimg.com/vi/mmfEzGWOYPA/hqdefault.jpg" , "https://i.ytimg.com/vi/mmfEzGWOYPA/hqdefault.jpg", "https://i.ytimg.com/vi/mmfEzGWOYPA/hqdefault.jpg", "https://i.ytimg.com/vi/mmfEzGWOYPA/hqdefault.jpg", "https://i.ytimg.com/vi/mmfEzGWOYPA/hqdefault.jpg" , "https://i.ytimg.com/vi/mmfEzGWOYPA/hqdefault.jpg", "https://i.ytimg.com/vi/mmfEzGWOYPA/hqdefault.jpg"]));
    }, 1000);
    
});

app.listen(3300);