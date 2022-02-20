---
layout: post
title: "Validation and Visibility"
image: "/assets/images/thumb/circuit-alexandre-debieve.png"
description: "A letter to myself after a year in the future"
tags: code
---

I wrote a lot of code in school, but my development workflow was a mess.
No version control, no validation, no visibility.
Just thousands of lines of Fortran 77 -- edited in Notepad and circulated by email -- plus some Python scripts to help me build and run that questionable code on supercomputers as fast as possible.

supercomputer experience and Python scripting got me in the door at Cray
eventually ended up on the new infrastructure team
build pipelines, testing, logging, metrics
went to conferences, read books, understood that stuff was important
but I had no first-hand experience with good infrastructure
didn't know what it should feel like
none of us did

Now I work at Facebook
Our tooling is phenomenal
and now I understand what I should have been working for before
Notes below on what I wish I'd understood three years ago

What do I mean by good logging?
- Anyone can easily create a new table to store structured data, and easily add a row to that table
- Anyone can easily tick a counter or timer
- Anyone can easily build a dashboard from their data

## Good logging means other people can triage potential problems with your code. If something is wrong, your dashboard will show (1) where the problem is hitting you, and (2) when it started so you can look for what changed. in other words, ownership can be abstracted away from individuals and onto oncall rotations. Scalable. Less burnout. You can take a day off.

## Good logging means you can see problems sooner. Regression in latency or validation rate. Solve them during business hours rather than waiting for them to become emergencies

## Good logging means you can reproduce one-in-a-million crashes

## Good logging means you don't personally need access to the system where your code is running. Plays nicer with web scale. Also better for security.

What do I mean by good testing?
- Let's say you're on vacation and your teammate makes a change to your code. They have a general understanding but are not deeply familiar. They accidentally return `true` instead of `false` in a way that would cause huge immediate problems. do red flags appear automatically on the pull request?

- automated testing means your teammates probably won't accidentally break your stuff when you're on vacation.
- metrics means when they do, they can triage it themselves without calling you








[scrum]: https://www.scrum.org/resources/what-is-scrum
[stathis]: https://www.enterpriseai.news/2017/01/26/stathis-papaefstathiou-takes-rd-reins-cray/
[devops_days]: https://devopsdays.org/

once your infrastructure is good, unit testing and logging are easy for engineers
easier than end-to-end tests?

but in hindsight, we still didn't get it.
automation lets you do the same stuff faster
don't feel great about deploying code without tests
certainly don't want someone else to modify it without context!
metrics are not an accessory to the code
without visibility, I don't even want my code running
The DevOps Handbook told me that infrastructure improvements would eliminate problems, but I didn't understand that it would do so by fundamentally reinventing day-to-day workflow
highly collaborative
other people might touch your code when you're not around
BUS NUMBER



## Oncall rotations are built on good logging



Now I work at Facebook, one of the same tech giants I read about.

TODO: connect to quality and quantity of code, and also headaches!

---
---


I've read the DevOps Handbook
I read charity.wtf

Monoliths are good, actually!
- Sharing code between endpoints is easy
- No friction between versions
- Function calls are faster and easier than API calls
- Easier integration testing
- Let most of your engineers take containerization for granted

Oncall rotations are a single source of truth for ownership
- Every file, test, dashboard, alert, etc is owned by an oncall
- Each oncall has one designated response person at a time
- Most engineers are on an oncall rotation
- Oncall rotation size should be small enough that everyone has enough context to respond
- Oncall rotation should be big enough to avoid burnout

What does good logging feel like?
- Anyone can easily create an index pattern to store structured data
- Anyone can easily tick a counter or timer
- Anyone can easily create a metric/dashboard from that data
- Retention for structured data can be just a few days
- Counters and timers are cheap to store, good for long term trends

Managers don't need to know about your day to day work. don't need to attend standup. that's what tech leads are for. managers are there for non-tech support and career development. checking in on you. arranging mentor/mentee relationships. backing you up when other teams come knocking, or during performance evaluation time

scaling tools. auto format. VS Code integration with version control. click to copy. click to open in VS Code
