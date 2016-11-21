const request = require('request')
const expect  = require('chai').expect
const Utils   = require('../utilities')
const Config  = require('../config')
const fs      = require('fs')
const Scraper = require('../scraper')

const badLink      = '/some_path?query#hash';
const goodLink     = 'https://www.google.com/some_path?query#hash';
const content      = fs.readFileSync('spec/example.html','utf-8');
const resultLinks  = ['https://www.google.com/link/to/somepage/'];
const resultAssets = ['https://script.js','https://style.css'];        

describe('The _scraper_ module', function () {
    it('running the Scraper', function (){
        const requestStub = this.sandbox.stub(request, 'get', function (url, cb) {
            var response = {statusCode: 200};
            cb(null, response, content)
        });
        const consoleStub = this.sandbox.stub(console, 'log');
        var scraper = new Scraper(goodLink);
        scraper.run();
    
        expect( console.log.calledWith('[') ).to.be.true;
        expect( console.log.calledWith('-') ).to.be.false;
        expect( console.log.calledWith(']') ).to.be.true;
    })
})