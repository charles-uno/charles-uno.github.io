---
layout: post
title: jekyll-mdl
homepage: https://github.com/gdg-managua/jekyll-mdl
demo: http://www.gdgmanagua.org/jekyll-mdl
date: 2015-07-11 17:08:43
licence_link: https://github.com/gdg-managua/jekyll-mdl/blob/master/LICENSE
---
# jekyll-mdl
> A Jekyll theme based in Google Material Design Lite library.

## Demo

You can see the online demo here [www.gdgmanagua.org/jekyll-mdl](http://www.gdgmanagua.org/jekyll-mdl)

![Demo](https://raw.githubusercontent.com/gdg-managua/jekyll-mdl/master/jekyll-mdl-screen.png)

## Sites using jekyll-mdl

If you are using this cool jekyll theme, please open an issue or fork the project, add your site to the list and send us a pull request, we will be happy to know where the theme has been used.

- [fandekasp.github.io](http://fandekasp.github.io/)

## Custom Themes

If you don't want the default site colors, you can create custom themes for the site in the [mdl theme creator](http://www.getmdl.io/customize/index.html). The site will create a custom css, something like this:

     <link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.0/material.teal-green.min.css" />

Now add this in the _includes/head.html file, under the main css and enjoy your new theme.

## Post Options

All the post, require an image and maybe an author and declare if the post is highlighted or not, the image are used in the cards and the autor used for the footer in the cards, the highlighted post is used for make this 12 cols and not a card, if you want to use the custom images and set the author and the highlight post, just add a new key in the post config, something like this:

    