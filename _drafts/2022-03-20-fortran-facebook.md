---
layout: post
title: "From Fortran to Facebook"
image: "/assets/images/thumb/circuit-alexandre-debieve-unsplash.png"
description: "A letter to myself after a year in the future"
tags: code
---

I wrote a lot of code in grad school, but my development workflow was a mess.
No version control, no validation, no visibility.
Just thousands of lines of Fortran 77 --- edited in Notepad and circulated by email --- plus some Python scripts to build and run that questionable code as fast as possible.

Cray was a step up.
I kept my code in Git repositories.
I wrote unit tests, API tests, and CI/CD pipelines to run them on commit.
I even put together a dashboard to two for metrics that seemed important.
But the whole development workflow still never really *clicked*.

Now I work at Facebook.
We have thousands of hands on the [shared code base][fb_monorepo], and user traffic numbers are obscene.
My code sees a one-in-a-million failure every minute.
Validation and visibility are a matter of necessity.
Below are a few lessons I wish I had known earlier.

[fb_monorepo]: https://engineering.fb.com/2014/01/07/core-data/scaling-mercurial-at-facebook/

## Monorepos are good, actually

- Sharing code between endpoints is easy
- No friction between versions (at least per node)
- Function calls are faster and easier than API calls
- Easier integration testing
- Let most of your engineers take containerization for granted

prevent duplicate code
Easier to keep conventions consistent (logging, testing). not to mention domain-specific idioms
explicit dependence is better than weird hacky workarounds.
- git subrepos
- pulling in dependencies (cloning other repos) as part of your build process
calling a function is much faster than an API call to a different microservice
most code is far away from the boundary. not everyone needs to worry about docker config, API endpoints, database access

A second repo for configs. Don't need to build it. Just pushing text files around. Super fast
But all the "real" code in the same place


## Unit tests are so your coworkers don't break your stuff while you're on vacation

tests mean you can take a day off without worrying that someone's going to accidentally break your code.
your code will have non-obvious behavior. If not today, then later after others start piggybacking on it. Maybe someone clones your repo as part of their semi-related pipeline to piggyback on your tooling.

What do I mean by good testing?
- Let's say you're on vacation and your teammate makes a change to your code. They have a general understanding but are not deeply familiar. They accidentally return `true` instead of `false` in a way that would cause huge immediate problems. do red flags appear automatically on the pull request?

- automated testing means your teammates probably won't accidentally break your stuff when you're on vacation.
- metrics means when they do, they can triage it themselves without calling you

## Things will break. Metrics and alerts make them easier to fix.

metrics and alerts allow non-experts to figure out what's broken
Can see where the thing broke
can see when it happened, and isolate the cause. maybe even roll it back.

What do I mean by good logging?
- Anyone can easily create a new table to store structured data, and easily add a row to that table
- Anyone can easily tick a counter or timer
- Anyone can easily build a dashboard from their data

- Good logging means other people can triage potential problems with your code. If something is wrong, your dashboard will show (1) where the problem is hitting you, and (2) when it started so you can look for what changed. in other words, ownership can be abstracted away from individuals and onto oncall rotations. Scalable. Less burnout. You can take a day off.
- Good logging means you can see problems sooner. Regression in latency or validation rate. Solve them during business hours rather than waiting for them to become emergencies
- Good logging means you can reproduce one-in-a-million crashes
- Good logging means you don't personally need access to the system where your code is running. Plays nicer with web scale. Also better for security.

What does good logging feel like?
- Anyone can easily create an index pattern to store structured data
- Anyone can easily tick a counter or timer
- Anyone can easily create a metric/dashboard from that data
- Retention for structured data can be just a few days
- Counters and timers are cheap to store, good for long term trends

## Everything should be owned by a rotation, not an individual

Oncall rotations are a single source of truth for ownership
- Every file, test, dashboard, alert, etc is owned by an oncall
- Each oncall has one designated response person at a time
- Most engineers are on an oncall rotation
- Oncall rotation size should be small enough that everyone has enough context to respond
- Oncall rotation should be big enough to avoid burnout

## Managers don't need to know about day-to-day work

Managers don't need to know about your day to day work. don't need to attend standup. that's what tech leads are for.

- advocating for you when something goes wrong, or when you want a promotion
- helping you make professional goals, then reach them
- going to bat when you want a promotion
- connecting you to mentors, mentees, opportunities, resources








---




been writing code since a Pascal class in 2004
Python since 2005
linux since 2007

supercomputer experience and Python scripting got me in the door at Cray
eventually ended up on the new infrastructure team
build pipelines, testing, logging, metrics
went to conferences, read books, understood that stuff was important
but I had no first-hand experience with good infrastructure
didn't know what it should feel like
none of us did

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

I've read the DevOps Handbook
I read charity.wtf
