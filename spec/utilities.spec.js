const request = require('request')
const expect  = require('chai').expect
const Utils   = require('../utilities')
const Config  = require('../config')
const fs      = require('fs');

const badLink  = '/some_path?query#hash';
const goodLink = 'https://www.google.com/some_path?query#hash';
const content  = fs.readFileSync('spec/example.html','utf-8');
const resultLinks  = ['https://www.google.com/link/to/somepage/'];
const resultAssets = ['https://script.js','https://style.css'];        

describe('The _utilities_ module', function () {
    it('getHostname()', function (){
        expect(Utils.getHostname(goodLink)).to.eql('www.google.com');
    })

    it('isLink()', function (){
        expect(Utils.isLink(badLink)).to.eql(false);
        expect(Utils.isLink(goodLink)).to.eql(true);
    })

    it('normalizeLink()', function (){
        expect(Utils.normalizeLink(goodLink)).to.eql('https://www.google.com/some_path/');
    })

  it('scrape()', function () {
    Utils.scrape(content,function(assets, links){
        expect(assets).to.eql(resultAssets);
        expect(links).to.eql(resultLinks); 
    });
  })

  it('fetchAndScrape()', function () {
    const url = goodLink;
    const response = {statusCode:200};
    const requestStub = this.sandbox.stub(request, 'get', function (url, cb) {
      cb(null, response, content)
    })    
    
    Utils.fetchAndScrape(content,function(assets, links){
        expect(assets).to.eql(resultAssets);
        expect(links).to.eql(resultLinks); 
    });
  })

})