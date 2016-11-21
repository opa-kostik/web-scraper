var Scraper = require('./scraper.js');  

// var url = 'https://quotes.toscrape.com';
var url = 'https://www.smashingmagazine.com';
var options = {
    maxLevel: 2
}
var scraper = new Scraper(url, options);
scraper.run();
