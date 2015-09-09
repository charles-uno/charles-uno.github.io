---
layout: post
title: jekyll-foundation-base
homepage: https://github.com/groovemonkey/jekyll-foundation-base
date: 2012-08-11 16:52:33
---
# Jekyll + Foundation CSS #

I love Zurb's Foundation framework, and Jekyll is a great tool for preventing code duplication while building static HTML/CSS/js websites.

This tool really just exists to create a "base" directory for starting new projects.

## What's Included: ##
* all the directories that Jekyll needs to compile your static site
* jQuery
* a stripped-down version of the foundation framework -- just the grid and orbit slideshow.
* a default html5 template in _layouts
* a default nav bar under _includes
* orbit slideshow js code in _includes, ready to be called on any page
* default index and 404 page, along with 3 other empty pages


## How To 'Install' It ##

First, make sure you have Ruby and the Jekyll gem installed (gem install jekyll).

Then, just download the .zip or

	```git clone git://github.com/groovemonkey/jekyll-foundation-base.git```

this baby and get started! Because now other people are using this now, I wrote a small tutorial (below).

I hope you find this useful; it has certainly made me more productive.

Cheers!



## Tutorial: ##


### Layouts ###

The easiest way is to use the default layout (HTML5 Boilerplate -- _layouts/default.html). To use a layout, put this at the top of your page:

    