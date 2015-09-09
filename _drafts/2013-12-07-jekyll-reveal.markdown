---
layout: post
title: jekyll-reveal
homepage: https://github.com/jens-na/jekyll-reveal
date: 2013-12-07 12:50:10
licence_link: https://github.com/jens-na/jekyll-reveal/blob/master/LICENSE.md
---
Overview
========
**jekyll-reveal** is a template for the site generator Jekyll to create presentations
with the framework revleal.js in a very easy way. You can even specify options
in the YAML front matter of Jekyll.

Currently the submodule of reveal.js points to the [2.6.1](https://github.com/hakimel/reveal.js/releases/tag/2.6.1) release.

Installation
============

```
  $ gem install jekyll  
  $ git clone --recursive https://github.com/jens-na/jekyll-reveal.git
  $ cd jekyll-reveal
  $ jekyll serve --watch
```

Aferwards you can point your favorite browser to http://localhost:4000/

Create a new slide
==================
New slides are created in the directory `_slides`. The index page updates
automatically. Take a look at the [example slides](https://github.com/jens-na/jekyll-reveal/tree/master/_slides).

YAML front matter
=================
jekyll-reveal extends the YAML front matter of Jekyll. You can specify [all available configuration
options provided by reveal.js](https://github.com/hakimel/reveal.js/#configuration) in the YAML front-matter. The default
values are set in `_config.yml`.

Example:
```yml
