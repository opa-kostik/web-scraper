var options = {
    //max depth level for recursive links
    maxLevel: 2 //== 1 for non-recursive search
}

var type = {
    image:      'image',
    script:     'script',
    stylesheet: 'stylesheet',
    link:       'link'
};

var sources = [
    {type: type.image,      selector: 'img',                    attr: 'src'},
    {type: type.script,     selector: 'script',                 attr: 'src'},
    {type: type.stylesheet, selector: 'link[rel="stylesheet"]', attr: 'href'},    
    {type: type.link,       selector: 'a',                      attr: 'href'}
];

module.exports = {
    sources,
    type,
    options
};