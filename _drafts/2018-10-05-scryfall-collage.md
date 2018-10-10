---
layout: post
title: "Let the Scry Fall"
image: "/assets/images/mtg-collage-thumb.png"
description: "Put down the scissors and glue. Today we're making collages in Python!"
---

Today's project is collages! No scissors and glue, but we've got the next best things: REST APIs and the Python Image Library. Specifically, we'll be accessing card illustrations via the shiny new(ish) [Scryfall API](https://scryfall.com/docs/api), working a bit of magic on them, then stitching them together.

This is all based on some work by a friend-of-a-friend, April King. She put together a [collage of Island illustrations](https://twitter.com/CubeApril/status/938937585732341760), earning herself a shout-out in the [Scryfall blog](https://scryfall.com/blog/a-belated-year-in-review-152). We'll be starting with her same idea, but taking it a bit further.

## Getting Images

Working with the Scryfall API is a breeze. You ping a URL, and you get back a [conveniently-formatted](https://en.wikipedia.org/wiki/JSON) reply. For example, let's say we want to search for all 500+ printings of the card [[Forest]]. After a quick peek at the Scryfall [search syntax guide](https://scryfall.com/docs/reference), we can type a few lines of Python and have all that information at our fingertips:

```python
import requests
# The query !"forest" asks for cards named exactly "forest".
info_url = 'https://api.scryfall.com/cards/search?q=!"forest"&unique=prints'
forest_info = requests.get(info_url).json()
```

If we go to the [the above URL](https://api.scryfall.com/cards/search?q=!"forest"&unique=prints) ourselves, we see a jumble of JSON. Some snippets of relevant-looking information, but condensed to the point of illegibility. Python gobbles that up no problem and spits out a well-behaved dictionary. Card data (rules text, collector number, etc) is packaged in `forest_info['data']`. In this case, there are too many cards to fit on one page, so `forest_info['next_page']` tells us where to make another request for the next batch.

To see more details about working with the API, feel free to check out my [code on GitHub](https://github.com/charles-uno/scryfall). Long story short, we grab just a few pieces of information from Scryfall:

- Set and collector number to uniquely identify each card
- Artist name -- more on this in a moment
- The URL where they store the illustration

We make another API request to grab the illustrations and dump[^1] each into a file. From there it's easy enough to load them up, crop them to a common size, and toss them together into a collage:

[^1]: If you're actually wading through the code, you'll notice that dumping the image to a file is actually a multi-stage process. The images served by Scryfall are formatted as JPGs. We'd rather work with PNGs, so we do a quick check-and-convert.

![Collage of all MTG Forest illustrations](/assets/images/mtg-collage-all-forest-small.png)
*Collage of all 587 illustrations for the card Forest. A number of duplicates are visible. Full-sized version [here](/assets/images/mtg-collage-all-forest.png).*

There have been 587 printings of the card [[Forest]]. The above collage includes them all. Pretty good, I think, but something feels off...

## Identifying Duplicates

Just because each basic land has been printed over 500 times doesn't mean there are 500 different pieces of art. A handful of pieces appear repeatedly -- particularly in the promotional releases on the right side of the collage above. I set out to remove the duplicates. Turns out that's easier said than done.

It's easy to check if images are pixel-by-pixel *identical*, but that's not the situation here. We're looking at different scans of the same original piece of art. That means slight differences in cropping and exposure, plus a bit of digital retouching.

The correct way to solve this problem probably involves machine learning, neural networks, or some other big data buzzword. A bit beyond my expertise, and a bit overkill for this particular project. Instead, after a fair amount of trial-and-error, I essentially decided to identify duplicates by squinting:

- Convert color images to grayscale.
- Scale down to a coarse grid.
- To compare two images, subtract their grids.
- If the differences are uniformly small, the images match.

The figure below shows a 4x4 grid for legibility. In practice the sweet spot seems to be 6x6. With too many boxes, the algorithm is easily confused by differences in cropping. With too few boxes, it misses defining features, resulting in false positives.

![Comparing similar illustrations](/assets/images/alaynadanner-johnavon.gif)
*Illustration of how the matching algorithm works. It can identify a match despite the weird foil overlay. It can also distinguish a pair of pieces with similar color scheme and composition.*

The algorithm isn't 100% accurate -- in particular, it can be fooled when artists do throwback pieces -- but it's pretty close!


http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=269629
http://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=245246

https://api.scryfall.com/cards/multiverse/!cardid!?format=image


https://api.scryfall.com/cards/named?exact=Forest&set=avr&collector_number=244&format=image
NOPE



https://api.scryfall.com/cards/search?q=Forest+set:avr+cn=244&format=image








This matching algorithm isn't particularly fast, and only handles pairwise comparisons. The first time through, I coded up a brute-force approach, and it slowed my little netbook to a crawl. I eventually realized there was a huge optimization staring me in the face: artist name! There's no need to compare an Alayna Danner piece to one by John Avon; we already know they're not the same.

By brute force, we'd need 172k comparisons to find all the duplicates. If we only compare pieces with the same artist, it's more like 12k[^3]. That means it takes under a minute for my little netbook to sift those 587 images down to about 200 uniques.

[^3]: Using brute force to identify all duplicate Forest illustrations, we'd have to compare each of the 587 pieces to each other piece: 587*586/2 = 171,991 comparisons. (Math details [here](https://www.quora.com/Math-What-is-the-formula-for-the-number-of-handshakes-H-in-terms-of-the-number-of-people-n).) But once we split it up by the 71 different artists, the numbers get a a lot friendlier. John Avon has art on 144 Forests, so we need 10,296 comparisons to check all those for duplicates. Rob Alexander has 44, so 946 comparisons. Christopher Rush has 37, so 666 comparisons. Everything else is small in comparison.

## Finishing Touches



**NOTE** -- my little netbook can't hold all these images in memory at once. So we load everything up once, briefly, to grab the grayscale grid. we also grab average color for sorting, and dimensions for cropping. Then we load them at the end, again once at a time, to load them onto the canvas.




**TODO** -- best practice is to list artists and copyrights







![](/assets/images/mtg-collage-plains-small.png)
*Full-sized version [here](/assets/images/mtg-collage-plains.png)*

![](/assets/images/mtg-collage-island-small.png)
*Full-sized version [here](/assets/images/mtg-collage-plains.png)*

![](/assets/images/mtg-collage-swamp-small.png)
*Full-sized version [here](/assets/images/mtg-collage-plains.png)*

![](/assets/images/mtg-collage-mountain-small.png)
*Full-sized version [here](/assets/images/mtg-collage-plains.png)*

![](/assets/images/mtg-collage-forest-small.png)
*Full-sized version [here](/assets/images/mtg-collage-plains.png)*
