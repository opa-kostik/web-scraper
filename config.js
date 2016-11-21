var type = {
    image: 'image',
    script: 'script',
    stylesheet: 'stylesheet',
    link: 'link'
};

var sources = [
    {type: type.image,      selector: 'img',                    attr: 'src'},
    {type: type.image,      selector: 'img',                    attr: 'srcset'},
    {type: type.image,      selector: 'link[rel*="icon"]',      attr: 'href'},
    {type: type.script,     selector: 'script',                 attr: 'src'},
    {type: type.stylesheet, selector: 'link[rel="stylesheet"]', attr: 'href'},    
    {type: type.link,       selector: 'a',                      attr: 'href'}
];

module.exports = {
    sources: sources,
    type: type
};