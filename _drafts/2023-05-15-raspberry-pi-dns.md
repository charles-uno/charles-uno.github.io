---
layout: post
title: "Blocking Ads with a Raspberry Pi"
image: "/assets/images/thumb/raspberries-viktor-talashuk-unsplash.png"
description: ""
tags: code
---


Honestly, this one is barely worth writing up.

- Get a Raspberri Pi. I gott the starter kit (with pre-loaded SD card included). Everything else has been sold out for months. You can also load the SD card yourself.
- Plug it in. Set it up. Turn on SSH access
- Set up a static IP address. On my ISP, there's an option in the app
- Shut down the Pi, unplug from the monitor and mouse. Plug it in somewhere out of the way. I have mine right next to the router
- Go to `raspberrypi.local:3000` for the setup wizard. Going to the static IP address you just set up works too. Click through all the steps
- Update the DNS setting on your router to point to the Pi
- By default, only a small number of sites are blocked. You can toggle more lists 
- You're good to go!




