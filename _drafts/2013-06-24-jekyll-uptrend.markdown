---
layout: post
title: jekyll-uptrend
homepage: https://github.com/baus/jekyll-uptrend
date: 2013-06-24 02:35:49
licence_link: https://github.com/baus/jekyll-uptrend/blob/master/LICENSE
---
# Jekyll Uptrend

Fork this project on [GitHub](https://github.com/baus/jekyll-uptrend).
See a [live example](http://baus.net/).

Uptrend is a [Jekyll](http://jekyllrb.com/) theme which makes it easy to get a decent 
looking personal Jekyll site up and running quickly. It works well with 
[GitHub Pages](http://pages.github.com/). If you want to change providers, it is trivial 
to move your data since it is all stored in a Git repo. 

Uptrend started as a fork of Carlos Becker's [Up Theme](http://carlosbecker.com/posts/up-a-jekyll-theme/), which
also uses ideas from [Jekyll Bootstrap](http://jekyllbootstrap.com/), but has deviated fairly significantly and 
mostly shares some common typographical elements. 

While the theme uses [Bootstrap 3](https://github.com/twbs/bootstrap/) under the covers, I 
have attempted to make it not look bootstrappy. For an example of the theme in action, see [my website](http://baus.net). 

## Installation

If you have [Jekyll installed](http://jekyllrb.com/docs/installation/), it is fairly easy to get Uptrend running.

First clone the repo, and test out the basic theme locally:

```
git clone git@github.com:baus/jekyll-uptrend.git
cd jekyll-uptrend
jekyll serve
```

Edit _config.yml. Some of the information in the author section is used by the resume template. 

There are two static pages that you should modify (/about and /resume). The contents of these pages is specified
in [Markdown](http://daringfireball.net/projects/markdown/), unlike most Jekyll templates which specify static 
files in pure HTML. The trick is they are processed as includes, and hence they are in the _includes directory. 

The /resume page is not linked from the main navigation, but you can give this link out to anyone you want to share it 
with. The layout used on the page is a little more friendly for printing. 

After updating _config.yml, 

### Creating Posts

To add posts, you need to create a directory called _posts. In it you have to create post files with names of the following form:

```
2012-06-28-a-new-post.md 
```

The file name must start with the date in the above format, and then a slug for the post followed by dashes.

The post file itself should look contain [YAML front-matter](http://jekyllrb.com/docs/frontmatter/) in the following form:

```
