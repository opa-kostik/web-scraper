var request = require('request');
var cheerio = require('cheerio');
var Config  = require('./config.js');
var URL     = require('url');

function getHostname(url){
    return URL.parse(url).hostname;
}

function fetchAndScrape(url, callback){
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200){
            scrape(html, callback);        
        }
        else console.log(error);   
    })
}

function isLink(url){
    return ( !!(/^((http[s]?:)?\/\/)/).test(url) )
}

function normalizeLink(url){
    var result = url.split('?')[0].split('#')[0];
    if(!result.endsWith('/')) result = result + '/';
    return result;
}

function scrape(html,callback){
    var assets = [];
    var links = [];
    var $ = cheerio.load(html);
    Config.sources.forEach(source => {
        $(source.selector).each((i,sel) => {
            if (sel.attribs[source.attr] && isLink(sel.attribs[source.attr])){
                if (source.type === Config.type.link){
                    var href = normalizeLink(sel.attribs[source.attr]);
                    if(links.indexOf(href) === -1 )
                        links.push(href);
                }else     
                    assets.push(sel.attribs[source.attr]);
            }
        })
    });
    callback(assets,links);
}

module.exports.isLink = isLink;
module.exports.normalizeLink = normalizeLink;
module.exports.getHostname = getHostname;
module.exports.fetchAndScrape = fetchAndScrape;