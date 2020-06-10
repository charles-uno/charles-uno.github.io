---
layout: post
title: "Docker Jekyll and Mr Hyde"
image: "/assets/images/thumb/guillaume-bolduc-containers.png"
description: "Setting up Jekyll is a pain in the ass. Let Docker take care of it for you."
tags: code
---

Once you get it set up, [Jekyll](https://jekyllrb.com/) is a great tool for building a personal website. There are dozens of [free](https://jekyllthemes.io/free) [templates](http://jekyllthemes.org/) that look nice right out of the box. It's also easy to get your hands dirty with HTML, CSS, and/or Javascript, if you're into that. Posts are written in [Markdown](https://en.wikipedia.org/wiki/Markdown#Example), which is a nice balance of convenience and capability[^1]. I use Jekyll to host this very site via [GitHub Pages](https://pages.github.com/)!

[^1]: Markdown is a way to write rich text documents using a plain text editor -- basically like the [BBCode](https://en.wikipedia.org/wiki/BBCode) web forums used ten years ago, but nice. It lets you include italics, links, footnotes, etc in a document without clicking through menus or getting bitten by [invisible formatting](https://xkcd.com/2109/).

Unfortunately, the setup for Jekyll is a pain in the ass. I recently fresh-installed my laptop and the process looked something like this:

- Install `jekyll` via package manager.
- Jekyll uses [Liquid](https://shopify.github.io/liquid/), which uses Ruby, so install `ruby` and `ruby-dev` too.
- Ruby plugins are called gems. Install the `jekyll` gem.
- Uh oh.
- Uninstall *both* Jekylls.
- Install the `bundler` gem, then do `bundle install` to install all the dependencies listed in the repo's Gemfile.
- Also do `bundle update` to get rid of weird versioning errors.
- From now on, prefix all commands with `bundle exec` in case gems conflict with one another.

It works, but it's not pretty. To avoid going through this again, I wrapped it all up in Docker. Dependencies are installed (in the right order) in the [Dockerfile](https://github.com/charles-uno/charles-uno.github.io/blob/master/Dockerfile), and orchestration is written up in the [Makefile](https://github.com/charles-uno/charles-uno.github.io/blob/master/Makefile). With just Docker and a command line, I can now build the container, fire up my site within that container, and serve it locally just by running:

```
make
```

Then I can point a browser to `localhost:4000` and see my site, just like I would if running directly on my machine. And since I'm mounting the repo into the container (rather than making a copy) it even re-builds automatically as I make changes.

![Containers](/assets/images/sharon-mccutcheon-containers.png)

The only snag I hit was port forwarding. On Linux, a service running on port 4000 within the container can be forwarded to the host machine using the flag `-p 4000:4000`. But my new machine is a Macbook, which means Docker is run [in a VM](https://docs.docker.com/docker-for-mac/networking/) under the hood. So `-p` forwards the container port to the *VM* port, not the *host* port. It took a minute to figure out what was going on, but luckily the [workaround](https://forums.docker.com/t/using-localhost-for-to-access-running-container/3148/9) was quick: instead of serving to `127.0.0.1` (localhost), [tell Jekyll](https://github.com/charles-uno/charles-uno.github.io/blob/master/_config.yml) to serve on `0.0.0.0` (a [wildcard local address](https://www.howtogeek.com/225487/what-is-the-difference-between-127.0.0.1-and-0.0.0.0/)).

You can take this all for a spin yourself! To use my template for your content, swap out my `_posts` and `assets` for your own. If you're already running Jekyll and just want to try out the Docker stuff, copy over my Makefile and Dockerfile (plus `host: 0.0.0.0` in `_config.yml`).

This is just a little project, but getting Docker into our workflow is a big deal. Now I can pull down this repo and it'll just *work*, regardless of what else is (or isn't) installed. No need to manually keep track of requirements[^2]. No need to put a bug fix on hold to install them. No need to worry about projects stepping on each others' toes. Docker lets the machine keep track of tedious and error-prone tasks, so we can spend more time doing what we love: reading StackOverflow to figure out why our code is broken!

[^2]: One of these days, I'll learn Ansible. Until then, I have an email thread with myself titled "FRESH INSTALL STEPS."
