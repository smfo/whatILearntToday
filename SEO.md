
# Search enginge optimization
Tricks to make webpages more relevant for search engines

These tags are all placed in the `<head></head>`

`<title>Web page title</title>`
This tag tells the search engines what your content is about.
The article title does not have to match this tag, however it should
not vary to greatly from what the actuall title is, as this is the keywords 
the search engine use to find relevant hits from the search.

`<meta name="description" content="Text about website here"></meta>`
Short description of the website.\
This is the text that will be displayed to users under the site link 
in google. Make sure it is relevant and contains good keywords.


Open Graph tags helps boosting and display ability liked to social media
```javascript
<meta name="og:title" property="og:title" content="Article title"></meta>
<meta name="og:description" content="Article description"></meta>
<meta property="og:url" content="Article url"></meta>
<meta property="og:type" content="Article type"></meta>
<meta property="og:image" content="Image to display"></meta>
```
This will be the information available to the user if a link to the page
is posted on social media. Using this link makes it possible to display
different texts to social media users and search engine users.

Twitter uses cards instead of og
```javascript
<meta name="twitter:title" content="Article title"></meta>
<meta name="twitter:card" content="Summary"></meta>
<meta name="twitter:description" content="Article description"></meta>
<meta name="twitter:url" content="Article url"></meta>
<meta name="twitter:image" content="Image to display"></meta>
```
If there is no twitter tag, it will default to og.
However, there is a character limit on twitter that f.ex. facebook doesnt
have, so using separate tags can be usefull.

`<meta name="robots" content="noindex, nofollow"></meta>`
Prevents the robots from crawling this page.

`<link rel="canonical" href="Specific url you want to use">`
By using canonical you tell Google that this is the version of the given url
you want to rank, instead of having rankings on all the different versions
that essentially compeate with eachother.

`<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>`
This shows that the website is mobile friendly and gives the browser instructions
on how to control the sites dimensions and scaling.\
width=device-width: the width of the page should follow the width of the device-width\
initial-scale=1.0: sets the initial zoom level when the page is first loaded by the browser


The keyword tag is no longer important to the search engine in order to
figure out the content of your website. The crawler scan the actual contente
for quality and search intent, and does this job automatically

#### General tips:
Don't underestimate headers\
Add alt tags to images