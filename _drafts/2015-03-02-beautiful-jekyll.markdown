---
layout: post
title: beautiful-jekyll
homepage: https://github.com/daattali/beautiful-jekyll
date: 2015-03-02 20:04:26
licence_link: https://github.com/daattali/beautiful-jekyll/blob/master/LICENSE
---
# Beautiful Jekyll

**Beautiful Jekyll** is a ready-to-use template to help you create an awesome website quickly. Perfect for personal blogs or simple project websites.  [Check out a demo](http://deanattali.com/beautiful-jekyll) of what you'll get after just two minutes or look at [my personal website](http://deanattali.com) to see it in use. You can also see examples of websites other people created using this theme [here](#featured-users).

This template is built on top of [Jekyll](http://jekyllrb.com/) and can be used for any [GitHub Pages](https://pages.github.com/) website.  If you don't know what Jekyll and GitHub Pages are, you can still use these instructions to build a site quickly, but it might make a little more sense if you read up on them just a little bit.

Feel free to modify this in any way you'd like, but I would appreciate it if you don't remove the attribution to Beautiful Jekyll. I've noticed that many people copy this website and deliberately remove the tiny phrase that gives me credit, and it feels a bit sad to not get credit for the countless hours I've put into this. Don't make me sad! :)

If you need a bit of help or have comments, feel free to [contact me](http://deanattali.com/aboutme#contact). Even if you don't have anything important to say but found this useful, I'd love to [hear about it as well](http://deanattali.com/aboutme#contact). 

### Table of contents

- [Prerequisites](#prerequisites)
- [Build your website in 3 steps](#build-your-website-in-3-steps)
- [Add your own content](#add-your-own-content)
- [Last important thing: YAML front matter](#last-important-thing-yaml-front-matter)
- [Features](#features)
- [More advanced features](#more-advanced-features)
- [Featured users](#featured-users)
- [Credits](#credits)
- [Contributions](#contributions)
- [Known limitations](#known-limitations)

## Prerequisites

- You need to have a GitHub account. If you don't have one, [sign up here](https://github.com/join) - it takes one minute. This is where your website will live - if you sign up with username `johnsmith` then your website will be `johnsmith.github.io`.  
- It would be helpful to understand what Markdown is and how to write it. Markdown is just a way to take a piece of text and format it to look a little nicer.  For example, this whole instruction set that you're reading is written in markdown - it's just text with some words being bold/larger/part of bullet points. I recommend taking 5 minutes to learn markdown [with this amazingly easy yet useful tutorial](http://markdowntutorial.com/).

## Build your website in 3 steps

Getting started is *literally* as easy as 1-2-3 :smile:   
Scroll down to see the steps involved, but here is a 45-second GIF just as a reference as you work through the steps. You might need to wait a few seconds until the "video" gets back to its beginning.

![Installation steps](img/install-steps.gif)

### 1. Fork this repository 

(Assuming you are on this page and logged in to GitHub) Fork this repository by clicking the Fork button on the top right corner. Forking means that you now copied this whole project and all the files into your account.

### 2. Rename the repository to `yourusername.github.io`

This will create a GitHub User page ready with the **Beautiful Jekyll** template that will be available at `http://yourusername.github.io` within a couple minutes.  To do this, click on "Settings" on the right (the tools icon) and there you'll have an option to rename.

### 3. Customize your website settings

Edit the `_config.yml` file to change all the settings to reflect your site. To edit the file, click on it and then click on the pencil icon (watch the GIF tutorial above if you're confused).  The settings in the file are fairly self-explanatory and I added comments inside the file to help you further. Any line that begins with a pound sign (`#`) is a comment, and the rest of the lines are settings.

Another way to edit the config file (or any other file) is to use [prose.io](http://prose.io/), which is just a simple interface to allow you to more intuitively edit files or new new files to your project.

After you save your changes to the config file (by clicking on "Commit changes" as the GIF tutorial shows), your website should be ready in a minute or two at `yourusername.github.io`. Every time you make a change to any file, your website will get rebuilt and should be updated in about a minute or so.

You can now visit your shiny new website, which will be seeded with several sample blog posts and a couple other pages. Your website is at `http://yourusername.github.io` (replace `yourusername` with your user name). Do not add `www` to the URL - it will not work!

**Note:** The GIF above goes through the setup for a user with username `daattalitest`. I only edited one setting in the `_config.yml` file in the video, but **you should actually go through the rest of the settings as well. Don't be lazy, go through all the settings :)**


### Add your own content

To add pages to your site, you can either write a markdown file (`.md`) or you can write an HTML file directly.  It is much easier to write mardown than HTML, so I suggest you do that (use the tutorial above if you need to learn markdown). You can look at some files on this site to get an idea of how to write markdown. To look at existing files, click on any file that ends in `.md`, for example [`aboutme.md`](./aboutme.md). On the next page you can see some nicely formatted text (there is a word in bold, a link, bullet points), and if you click on the pencil icon to edit the file, you will see the markdown that generated the pretty text. Very easy!

In contrast, look at [`index.html`](./index.html). That's how your write HTML - not as pretty. So stick with markdown if you don't know HTML.

Any file that you add inside the [`_posts`](./_posts) directory will be treated as a blog entry.  You can look at the existing files there to get an idea of how to write blog posts.

As mentioned previously, you can use [prose.io](http://prose.io/) to add or edit files instead of doing it directly on GitHub, it can be a little easier that way.

### Last important thing: YAML front matter

In order to have your new pages use this template and not just be plain pages, you need to add [YAML front matter](http://jekyllrb.com/docs/frontmatter/) to the top of each page. This is where you'll give each page some parameters that I made available, such as a title and subtitle. I'll go into more detail about what parameters are available later. If you don't want to use any parameters on your new page (this also means having no title), then use the empty YAML front matter:

```
