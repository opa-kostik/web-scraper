var request = require('request');
var cheerio = require('cheerio');
var Config  = require('./config.js');
var URL     = require('url');

function getHostname(url){
    return URL.parse(url).hostname;
}

function fetchAndScrape(url, callback){
    request.get(url, (error, response, html) => {
        if (!error && response.statusCode == 200){
            scrape(html, callback);        
        }
        else callback(null);   
    })
}

function isLink(url){
    return ( !!(/^((http[s]?:)?\/\/)/).test(url) )
}

function cleanQueryString(url){
    return url.split('?')[0].split('#')[0];
}

function normalizeLink(url){
    var result = cleanQueryString(url);
    if(!result.endsWith('/')) result = result + '/';
    return result;
}

function scrape(html,callback){
    var assets = [];
    var links = [];
    var $ = cheerio.load(html);
    Config.sources.forEach(source => {
        $(source.selector).each((i,sel) => {
            //TODO: isLInk check replace. Links can be relative
            if (sel.attribs[source.attr] && isLink(sel.attribs[source.attr])){
                if (source.type === Config.type.link){
                    var href = normalizeLink(sel.attribs[source.attr]);
                    if(links.indexOf(href) === -1 )
                        links.push(href);
                }else{     
                    var href = cleanQueryString(sel.attribs[source.attr]);
                    if(assets.indexOf(href) === -1 )
                        assets.push(href);
                }
            }
        })
    });
    callback(assets,links);
}

function getOptions(){
    return Config.options;
}

module.exports = { 
    isLink,
    normalizeLink,
    getHostname,
    fetchAndScrape,
    scrape,
    getOptions,
    cleanQueryString
}
