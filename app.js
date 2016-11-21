var Scraper = require('./scraper.js');  
const url = process.argv[2];

if(!url)
    console.log('please specify starting URL as a parameter');
else{
    var scraper = new Scraper(url);
    scraper.run();
}
