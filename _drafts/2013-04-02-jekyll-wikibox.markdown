---
layout: post
title: jekyll-wikibox
homepage: https://github.com/dataduke/jekyll-wikibox
demo: http://dataduke.github.io/jekyll-wikibox/
date: 2013-04-02 08:56:53
---
# jekyll-wikibox

A guerilla wiki for hackers based on plaintext files (markdown, textile, taskpaper) transformed into static html by jekyll. The default theme is inspired by sublime text editor.

- **[Features](#features)** or what is it about?
  - Functional Features
  - Appearance
- **[Usage](#usage)** or how can I exploit it?
  - Live Demo
  - Installation
  - Local Deployment
  - Web Deployment
  - Magic Tricks
  - Customization
  - Themes
- **[Project Planning](#project-planning)** or how can I hack it?
  - Important Files
  - Project Structure
  - Theme Development
- **[References](#references)** or how does it work?
  - Core Technologies
  - Related Technologies
  - Markup Languages
  - Higher-Level Languages
  - Feature Inspirations
  - Design Inspirations
  - Design Frameworks

## Features

### Functional Features

  - multiple boxes/repositories (blogs) for notes (markdown, textile)
  - sort by date created

### Appearance
  
  - Folding Text Theme
  - iOS Linen Theme
  - Paint Bucket Theme
  - Sublime Text Theme

## Usage

### Live Demo

- Available via `branch gh-pages` (github pages)  
  `http://dataduke.github.com/jekyll-wikibox` (to be done)

### Installation

1. install ruby
2. install jekyll `$ sudo gem install jekyll`
3. fork/clone/check out this github project `$ git clone git://github.com/dataduke/jekyll-wikibox.git`

### Local Deployment

1. change to `$ cd ~/github/jekyll-wiki`
2. run `$ jekyll --server` 
3. open `http://localhost:4000/`

### Web Deployment

- GitHub Hosting: Please refer to github pages help.
- Other web hoster: Please refer to jekyll wiki/help.

### Magic Tricks

- Interactive Wallpaper: [desktopr.app](http://mac.appstorm.net/reviews/internet-reviews/desktopr-put-a-website-on-your-desktop/) (Mac OS X )
- Individual App: [fluid.app](http://fluidapp.com) (Mac OS X ), [fake.app](http://fakeapp.com/) (Mac OS X )

### Customization

    ./_config.yml           # configuration
    ./_themes/themename     # themes; move all files/folders contained in a theme to root folder (and override)

### Hacking Layouts with Parameters

The files `./index.html` and `./box000/index.html` define the index pages. There (ex: `./box004/index.html`), the choosen layout (in YAML frontmatter, ex: `index-posts-1`) and a parameter list for the choosen layout (as content, ex: `box004`) have to be defined:

    