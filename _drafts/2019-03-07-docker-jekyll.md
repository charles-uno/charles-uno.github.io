---
layout: post
title: "Docker Jekyll and My Hyde"
image: "/assets/images/placeholder-06-thumb.png"
description: "Setting up Jekyll is a pain in the ass. Let Docker take care of it for you."
tags: stem
---

Once you get it set up, [Jekyll](https://jekyllrb.com/) is a great tool for building a website. There are plenty of [free](https://jekyllthemes.io/free) [templates](http://jekyllthemes.org/) that look nice right out of the box. It's also easy to get your hands dirty with HTML, CSS, and/or Javascript, if you're into that sort of thing. Posts are written in [Markdown](https://en.wikipedia.org/wiki/Markdown#Example), which is a nice balance of convenience and capability[^1]. It's what I use to host this site via [GitHub Pages](https://pages.github.com/). 

[^1]: Markdown is a way to write rich text documents using a plain text editor -- basically like the [BBCode](https://en.wikipedia.org/wiki/BBCode) that forums used ten years ago, but nice. It lets you include italics, links, footnotes, etc in a document without clicking through menus or getting bitten by [invisible formatting](https://xkcd.com/2109/). 

That said, the setup for Jekyll is a pain in the ass. I recently fresh-installed my laptop and the process looked something like this:

- Install `jekyll` via my package manager. 
- Jekyll uses Liquid, which uses Ruby, so install `ruby` and `ruby-dev` too. 
- Ruby has plugins called Gems, which are installed using the `gem` command. Install the `jekyll` gem. 
- Uh oh. 
- Uninstall *both* Jekylls. 
- Install Bundler, then do `bundle install` to install all the dependencies from the repo's Gemfile. Now I have something called `Gemfile.lock` that I'm not supposed to touch. 
- Also do `bundle update`, because someone online said it would fix this weird error. 
- Bundler is now in charge. To fire up the site locally (for development and debugging), I now have to use `bundle exec jekyll serve` instead of just `jekyll serve`. 

It works, but it's not pretty. To avoid going through this again, I packaged up the process using Docker. 

All the dependencies are installed (in the right order) in the [Dockerfile](https://github.com/charles-uno/charles-uno.github.io/blob/master/Dockerfile), and orchestration is written up in the [Makefile](https://github.com/charles-uno/charles-uno.github.io/blob/master/Makefile). 

With just Docker and a command line, I can now build the image, fire up my site within that image, and serve it locally by running:

```
make
```

Then I can point a browser to `localhost:4000` and see my site, just like I would do if running directly on my machine. 

The only real snag I hit was with the port forwarding. On a Linux machine, a service running on port 4000 within the container can be forwarded to the host machine using the flag `-p 4000:4000`. But my new machine is a Macbook, and Docker works a bit differently on OSX. Under the hood, OSX run the container is run [in a VM](https://docs.docker.com/docker-for-mac/networking/). So `-p` forwards the container port to the *VM* port, not the *host* port. 

It took me a while to figure out what was going on. Luckily, once I did, the [workaround](https://forums.docker.com/t/using-localhost-for-to-access-running-container/3148/9) is easy: instead of serving to `127.0.0.1` (the local machine), tell Jekyll to serve on `0.0.0.0` (a [wildcard address](https://www.howtogeek.com/225487/what-is-the-difference-between-127.0.0.1-and-0.0.0.0/)). 

