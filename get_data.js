const cheerio = require('cheerio');
const request = require('async-request');

async function getFonts(){
    let site = await request('https://en.wikipedia.org/wiki/List_of_typefaces');
    const $ = cheerio.load(site.body);
    let arrOfFonts = [];
    let fonts = $('.div-col ul li a');
    for(let i = 0; i < fonts.length; i++){
        var obj = {
            name: fonts.eq(i).text()
        };
        obj.id = i;
        arrOfFonts.push(obj);
    }
    return arrOfFonts;
}

module.exports = {
    getFonts
}