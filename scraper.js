var Utils   = require('./utilities.js');

module.exports = class Scraper{
    constructor(url, options){
        this.startUrl = url;
        this.hostname = Utils.getHostname(url);
        this.maxLevel = Utils.getOptions().maxLevel;
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
            
            //no data
            if (!assets && !links ){
                //check if all done
                if(!this.visitedPages.filter(link => !link.processed ).length)
                    console.log(']');
                return;
            }

            var validLinks = [];
            if (curLevel < this.maxLevel){
                //not reached max depth level
                validLinks = links.filter( link => this._canFollowLink(link));
            }
            
            //mark current url as processed
            for(var i = 0; i < this.visitedPages.length; i++){
                if (this.visitedPages[i].url === url){ 
                    this.visitedPages[i].processed = true;
                    break;
                }
            }
            
            // assets: validate and remove duplicates
            var validAssets = assets.filter(asset => this._isValidUrl(asset) )
            this._output({ url: url, assets: validAssets });
            
            //links: add scraped links to the processing queue
            for(i = 0; i < validLinks.length; i++)
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
        return (this._isValidUrl(url) && 
               !this.visitedPages.filter(link => link.url === url ).length)
    }

    _output(page){
        console.log( JSON.stringify(page) );
    }

    _isValidUrl(url){
        return (Utils.getHostname(url) === this.hostname);
    }
}