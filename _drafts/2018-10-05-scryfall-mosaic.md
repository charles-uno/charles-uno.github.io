---
layout: post
title: "Let the Scry Fall"
image: "/assets/images/mtg-mosaic-thumb.png"
description: "Put down the scissors and glue. Today we're making collages in Python!"
---

Today's project is collages! No scissors and glue, but we've got the next best things: REST APIs and the Python Image Library. Specifically, we'll be accessing card illustrations via the shiny new(ish) [Scryfall API](https://scryfall.com/docs/api), working a bit of magic on them, then stitching them together.

This is all based on some work by a friend-of-a-friend, April King. She put together a [collage of Island illustrations](https://twitter.com/CubeApril/status/938937585732341760), earning herself a shout-out in the [Scryfall blog](https://scryfall.com/blog/a-belated-year-in-review-152). We'll be starting with that same idea, but taking it a bit further.

## Getting Images

I'm no expert, but I'm pretty sure [JSON](https://en.wikipedia.org/wiki/JSON) is the language of the future. The Scryfall API was a breeze to work with. You ping a URL, and it sends back a conveniently-formatted reply.

For example, let's say we want to search for all 500+ printings of the card [[Forest]]. After a quick peek at their [search syntax guide](https://scryfall.com/docs/reference), we can have all that information at our fingertips in just a few lines of Python:

```python
import requests
# The search string !"forest" asks for cards named exactly "forest".
info_url = 'https://api.scryfall.com/cards/search?q=!"forest"&unique=prints'
forest_info = requests.get(info_url).json()
```

If we go to the [the above URL](https://api.scryfall.com/cards/search?q=!"forest"&unique=prints) ourselves, we see a jumble of JSON. Some snippets of relevant-looking information, but condensed to the point of illegibility. Python gobbles that up no problem, and delivers a well-behaved dictionary. Card data (rules text, collector number, etc) is packaged in `forest_info['data']`. In this case, there are too many cards to fit on one page, so `forest_info['next_page']` tells us where to make another request for the next batch.

To see more details about working with the API, feel free to check out my [code on GitHub](https://github.com/charles-uno/scryfall). Long story short, we use the Scryfall API to grab a few pieces of information about each printing:

- Set and collector number, to uniquely identify each card
- Artist name (more on this in a moment!)
- The URL where they store the illustration

We make another API request to grab the illustration and dump[^1] it into a file. From there it's easy enough to load them up, crop them to a common size, and toss them together into a collage:

[^1]: If you're actually wading through the code, you'll notice that dumping the image to a file is actually a multi-stage process. The images served by Scryfall are formatted as JPGs. We'd rather work with PNGs, so we do a quick check-and-convert.

![Collage of all MTG Forest illustrations](/assets/images/mtg-mosaic-all-forest.png)
*Collage of Forest illustrations. A large number of duplicates are visible.*

Scryfall served up 587 Forest printings. The above figure shows 576 of them. I chopped off the last few so the aspect ratio would line up nicely. Pretty good, I think, but something feels off...

## Identifying Duplicates

Each basic land has been printed over 500 times, but that doesn't mean there are 500 different pieces of art. As we can see above, there are a handful of pieces that get used over and over. This is particularly visible in promotional products, which make up the right quarter (more or less) of the image.

I set out to remove them. Turns out this is much easier said than done.

It's easy to identify images that are pixel-by-pixel *identical*, but that's not the situation here. We're looking at different scans of the same original piece of art. That means slight differences in cropping and exposure, plus a bit of digital retouching.

The correct way to solve this problem probably involves machine learning, neural networks, or some other big data buzzword. A bit beyond my expertise, and a bit overkill for this particular project. Instead, after a fair amount of trial-and-error, I essentially decided to identify duplicates by squinting:

- Convert color images to grayscale.
- Smooth the image down to a coarse grid.
- To compare two images, subtract their grids.
- If the differences are uniformly small, the images match.

The figure below shows a 4x4 grid for legibility. In practice the sweet spot seems to be 6x6. With too many boxes, the algorithm is easily confused by differences in cropping. With too few boxes, it misses defining features, resulting in false positives.

![Comparing similar illustrations](/assets/images/alaynadanner-johnavon.gif)
*Same art by Alayna Danner, but with a weird foil overlay. Different illustrations by John Avon, but with similar coloration and composition.*

This algorithm isn't particularly fast, and only handles pairwise comparisons. To look for all possible duplicates, we'd need to check each of the 500+ images against each other image -- over 300k comparisons! The first time through, this is how I coded it up, and my little netbook chugged away for *ages*.

Eventually, I realized that there was a huge optimization staring me in the face: artist name. There's no sense comparing an Alayna Danner illustration to one by John Avon. Illustrations can't possibly be duplicates unless they share an artist.

**NOTE: reduced from 500+ to just over 200.**

## Finishing Touches


![](/assets/images/mtg-mosaic-plains-small.png)

![](/assets/images/mtg-mosaic-island-small.png)

![](/assets/images/mtg-mosaic-swamp-small.png)

![](/assets/images/mtg-mosaic-mountain-small.png)

![](/assets/images/mtg-mosaic-forest-small.png)
