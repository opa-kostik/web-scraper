# web-scraper
Given a starting URL, it should visit every reachable page under that domain.


#### run it

```
npm install 
node app.js "starting_url"
```

#### test it
```
npm test
```

#### configurate
'config.js' has following parameters:  

1. MaxLevel - specifies depth of the recursive search, set '1' to disallow recursion, 
2. Sources - Cheerio selectors for scraping assets.

##Description 
Given a starting URL, it should visit every reachable page under that domain.
For each page, it should determine the URLs of every static asset (images, javascript, stylesheets) on that page.
The crawler should output to STDOUT in JSON format listing the URLs of every static asset, grouped by page.
 
For example:
```json
[
  {
    "url": "http://www.example.org",
    "assets": [
      "http://www.example.org/image.jpg",
      "http://www.example.org/script.js"
    ]
  },
  {
    "url": "http://www.example.org/about",
    "assets": [
      "http://www.example.org/company_photo.jpg",
      "http://www.example.org/script.js"
    ]
  },
  ..
]
``` 
