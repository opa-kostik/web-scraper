
var Utils   = require('./utilities.js');

module.exports = class Scraper{
    constructor(url, options){
        this.startUrl = url;
        this.hostname = Utils.getHostname(url);
        this.maxLevel = options.maxLevel;
        this.visitedPages = [];
    }

    run(){
        console.log('[');
        if (Utils.isLink(this.startUrl)){
            var url = Utils.normalizeLink(this.startUrl);
            this.visitedPages.push({
                url: url, 
                processed: false
            });
            this._scrapePage(url, 1);
        }
    }    

    _scrapePage(url, curLevel){    
        
        Utils.fetchAndScrape(url, (assets,links) => {
            var validAssets = assets.filter(asset => this._isValidUrl(asset));
            
            var validLinks = [];
            if (curLevel < this.maxLevel){
                //not reached max depth level
                validLinks = links.filter( link => this._canFollowLink(link));
            }
            
            //do something with assets
            for(var i = 0; i < this.visitedPages.length; i++){
                if (this.visitedPages[i].url === url){ 
                    this.visitedPages[i].processed = true;//mark as processed
                    break;
                }
            }
            this._output({ url: url, assets: validAssets });//TODO: remove duplicates!!!
            
            //add Links to the processing queue
            for(var i = 0; i < validLinks.length; i++)
                this.visitedPages.push({
                    url: validLinks[i], 
                    processed: false
                });
                
            //check if everything is processed
            if(this.visitedPages.filter(link => !link.processed ).length)
                console.log(',');
            else
                console.log(']');
            
            //follow links
            validLinks.map( link => this._scrapePage(link, curLevel + 1))
            
        })     
    }

    _canFollowLink(url){ 
        return (this._isValidUrl(url) 
             && !this.visitedPages.filter(link => link.url === url ).length 
             //&& this.visitedPages.length <= 10
             )
    }

    _output(page){
        //console.log(page.assets.length, page.url);
        //console.log( JSON.stringify(page) );
        console.log( JSON.stringify({
            numb: page.assets.length, 
            assets: page.url}));
    }

    _isValidUrl(url){
        return (Utils.getHostname(url) === this.hostname);
    }
}