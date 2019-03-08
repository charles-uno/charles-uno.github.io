---
layout: post
title: "Docker Jekyll and My Hyde"
image: "/assets/images/placeholder-06-thumb.png"
description: ""
---


Once you get it set up, [Jekyll](https://jekyllrb.com/) is a great tool for building a website. There are plenty of [free](https://jekyllthemes.io/free) [templates](http://jekyllthemes.org/) that look nice right out of the box. It's also easy to get your hands dirty with HTML, CSS, and/or Javascript, if you're into that sort of thing. Posts are written in [Markdown](https://en.wikipedia.org/wiki/Markdown#Example), which is a nice balance of convenience and capability[^1]. It's what I use to host this site via [GitHub Pages](https://pages.github.com/). 

[^1]: Markdown is a way to write rich text documents using a plain text editor -- basically like the [BBCode](https://en.wikipedia.org/wiki/BBCode) that forums used ten years ago, but nice. It lets you include italics, links, footnotes, etc in a document without clicking through menus or getting bitten by [invisible formatting](https://xkcd.com/2109/). 

That said, the setup for Jekyll is a pain in the ass. I recently fresh-installed my laptop and the process looked something like this:

- Install `jekyll` via my package manager. 
- Jekyll uses Liquid, which uses Ruby, so install `ruby` and `ruby-dev` too. 
- Ruby has plugins called Gems, which are installed using the `gem` command. Install the `jekyll` gem. 
- Uh oh. 
- Uninstall *both* Jekylls. 
- Install Bundler, then do `bundle install` to install all the dependencies from the repo's Gemfile.
- Also do `bundle update`, because someone online said it would fix this weird error you're seeing. 
- Bundle is now in charge. Instead of `jekyll serve`, you now have to do `bundle exec jekyll serve`. 






I serve this website from Jekyll, but still mostly don't know what's going on... or  care to.

Liquid is interpreted using Ruby

Ruby has plugins called Gems, which can be installed using the `gem` command

But don't do it! Install the `bundle` gem and use `bundle install` to install the rest of your gems.

Also there's a Jekyll package available from the OS package manager, but don't install it! Add it to your Gemfile instead. which is where `bundle` looks to see what gems you need.

Bundle is important because it keeps track of the versions of all the different gems and keeps them from fighting each other, something like a virtualenv for Python.

Something something Gemfile.lock

Ever so often a naming scheme will change and you'll have to change `plugins` to `plugins_dir` in your `_config.yml`

Recently got a new Macbook. I have notes from last time, but I'm not particularly interested in installing this rats' nest of dependencies on my brand new hardware. so let's do it with Docker

Tricky part: Docker for Mac runs in a VM, so you can't access the server at `localhost:4000`. The site is available at `127.0.0.1:4000` in the VM, but that's not the same as `127.0.0.1` from the host machine. Get around it by telling it to serve `0.0.0.0` (any host) instead. 
