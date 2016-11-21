const request = require('request')
const expect  = require('chai').expect
const Utils   = require('../utilities')
const Config  = require('../config')
const fs      = require('fs')
const Scraper = require('../scraper')

const normLink      = 'https://www.google.com/some_path';
const goodLink      = normLink+'?query#hash';
const content       = fs.readFileSync('spec/example.html','utf-8');
const resultLinks   = ['https://www.google.com/link/to/somepage/'];
const resultAssets  = ['https://www.google.com/script.js','https://www.google.com/style.css'];        
const resultOutput1 = '{"url":"'+normLink+'/",'+
                     '"assets":["'+resultAssets[0]+'","'+resultAssets[1]+'"]}'
const resultOutput2 = '{"url":"'+resultLinks[0]+'",'+
                     '"assets":["'+resultAssets[0]+'","'+resultAssets[1]+'"]}'

describe('The _scraper_ module', function () {
    it('running the Scraper', function (){
        const requestStub = this.sandbox.stub(request, 'get', function (url, cb) {
            var response = {statusCode: 200};
            cb(null, response, content)
        });
        const consoleStub = this.sandbox.stub(console, 'log');
        var scraper = new Scraper(goodLink);
        scraper.run();
    
        expect( console.log.getCall(0).args[0]).to.equal('[');
        expect( console.log.getCall(1).args[0]).to.equal(resultOutput1);
        expect( console.log.getCall(2).args[0]).to.equal(',');
        expect( console.log.getCall(3).args[0]).to.equal(resultOutput2);
        expect( console.log.getCall(4).args[0]).to.equal(']');
    })
})