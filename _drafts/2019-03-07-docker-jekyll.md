---
layout: post
title: "Serve Jekyll from Docker"
image: "/assets/images/placeholder-06-thumb.png"
description: ""
---

I serve this website from Jekyll, but still mostly don't know what's going on... or  care to.

The site is static HTML/CSS and Javascript, but there's a layer on top of that of Liquid to generate pages. Lots of curly braces and percent signs.

Liquid is interpreted using Ruby

Ruby has plugins called Gems, which can be installed using the `gem` command

But don't do it! Install the `bundle` gem and use `bundle install` to install the rest of your gems.

Also there's a Jekyll package available from the OS package manager, but don't install it! Add it to your Gemfile instead. which is where `bundle` looks to see what gems you need.

Bundle is important because it keeps track of the versions of all the different gems and keeps them from fighting each other, something like a virtualenv for Python.

Something something Gemfile.lock

Ever so often a naming scheme will change and you'll have to change `plugins` to `plugins_dir` in your `_config.yml`

Recently got a new Macbook. I have notes from last time, but I'm not particularly interested in installing this rats' nest of dependencies on my brand new hardware. so let's do it with Docker

Tricky part: Docker for Mac runs in a VM, so you can't access the server at `localhost:4000`. The site is available at `127.0.0.1:4000` in the VM, but that's not the same as `127.0.0.1` from the host machine. Get around it by telling it to serve `0.0.0.0` (any host) instead. 
