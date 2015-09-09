---
layout: post
title: Jekyll-Foundation-SASS
homepage: https://github.com/rememberlenny/Jekyll-Foundation-SASS
date: 2013-09-04 14:58:51
---
# Jekyll + Foundation SCSS #

Foundation self declares to be the most advanced responsive front-end framework in the world.

## What's Included: ##
* all the directories that Jekyll needs to compile your static site
* jQuery
* the entire foundation framework
* a default html5 template in _layouts
* a default nav bar under _includes
* default index and 404 page, along with 3 other empty pages


## How To 'Install' It ##

First, make sure you have [Ruby](https://www.ruby-lang.org/en/) and the [Jekyll](http://jekyllrb.com/) gem installed (```gem install jekyll```).

Then, just download the .zip or

	git clone git@github.com:rememberlenny/Jekyll-Foundation-SASS.git

## How To 'Run' It ##

**Serving Jekyll**
To set up a local development server use the command ```jekyll serve```. The files from ```_site``` will be served to [http://localhost:4000](http://localhost:4000) by default.

**SASS -> CSS**
To compile the SASS files into CSS, run ```compass watch```. Files from ```sass/*``` will render to ```_source/assets/css```.

**Preparing for build**
After you have compiled your SASS with Compass, its time build. Build for deploymentwith the command ```jekyll build```. The files will render to ```_site```.


## Tutorial: ##

### Layouts ###

The easiest way is to use the default layout (HTML5 Boilerplate -- _layouts/default.html). To use a layout, put this at the top of your page:

    