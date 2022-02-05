---
layout: post
title: "From Fortran to Facebook"
image: "/assets/images/thumb/alexandre-debieve-circuit.png"
description: "A letter to myself after a year in the future"
tags: code
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


scaling tools. auto format. VS Code integration with version control. click to copy. click to open in VS Code


 

On Sat, Jan 29, 2022 at 1:34 PM Charles Fyfe <charles.andrew.fyfe@gmail.com> wrote:
>
> On logging: low retention is ok! You can say each index pattern gets 50 gigs saved and clear old stuff when they run over. Even 3 days of structured data is valuable
>
> On Sat, Jan 29, 2022, 1:19 PM Charles Fyfe <charles.andrew.fyfe@gmail.com> wrote:
>>
>> Logging
>>
>> Need some kinds of central database that anyone can add tables to. And good tooling that *just works* so it's easy for people to log to it. And some kinds of dashboard tool that everyone has access to for looking at that data. Very important to be able to slice the data yourself
>>
>> Counters, timers, structured data
>>
>> On Mon, Jan 24, 2022, 11:44 AM Charles Fyfe <charles.andrew.fyfe@gmail.com> wrote:
>>>
>>> oncall! everything is owned by an oncall. have a slack room for each
>>> group. have a designated person (rotation) for who checks so everyone
>>> isn't stuck doing so
>>>
>>> code and tests are owned by oncalls
>>> there is a set jira project for each oncall I guess
>>>
>>> On Sun, Jan 2, 2022 at 2:04 PM Charles Fyfe
>>> <charles.andrew.fyfe@gmail.com> wrote:
>>> >
>>> > Monorepos are good, actually.
>>> >
>>> > - Communication between microservices is slower and more complicated
>>> > than just calling a function.
>>> > - Easier to test (manual and automated) when you have the whole app in
>>> > front of you.
>>> > - Jenkins can see who triggered a build, right? If the whole app is
>>> > self-contained, it's much easier to deploy Dan's changes to
>>> > foo.com/dan, Jack's to foo.com/jack, etc.
>>> > - Definitely applies to CT. Probably also applies to a decent chunk of
>>> > the management plane.
>>> >
>>> >
>>> > On Sun, Jan 2, 2022 at 1:57 PM Charles Fyfe
>>> > <charles.andrew.fyfe@gmail.com> wrote:
>>> > >
>>> > > ## Monorepos are good, actually.
>>> > >
>>> > > At Cray, my team of five engineers spread our code across a handful of
>>> > > repos. One for the dashboard front-end, one for database handling, one
>>> > > for customer-facing API, etc.
>>> > > - Shared code. Importing and calling a function is much faster than
>>> > > making an async call to a different service.
>>> > > - Development visibility. When I run the API locally, do I also need
>>> > > to launch a local front-end to look at it? A local database? Make it
>>> > > easy to just run the app
>>> > > - Similarly, testing. I'd like to be able to have integration tests
>>> > > hit end-to-end functionality with minimal mocking.
>>> > > - Fewer "edges" means less worrying about abstraction. Don't need to
>>> > > update Docker settings and endpoint configurations just because a
>>> > > function name changed.
>>> > > - I'm talking about CT infrastructure here, but the asme lessons would
>>> > > apply to the management code as well. Lots of Python microservices
>>> > > that honestly would be more testable if they were one big app. Not to
>>> > > mention you could worry about Kubernetes once for the whole repo,
>>> > > rather than for every microservice.
>>> > >
>>> > > ## Make Testing Easy
>>> > >
>>> > > Back to CT. If you're working on a branch,
>>> > >
>>> > > - Jenkins can see who triggered a build, right? Deploy Dan's most
>>> > > recent commit to foo.com/dan, Jack's to foo.com/jack, etc. No need to
>>> > > check in and make sure you're not steamrolling someone else's work.
>>> > >
>>> > > ## A Better Logging Model
>>> > >
>>> > > For 90% of debugging, you'd like to just have a distributed version of
>>> > > print. Something that shows up in the same place regardless of what
>>> > > host you're running on.
>>> > >
>>> > >
>>> > > ## Invest in Tooling
>>> > >
>>> > > Automatically format on save.
>>> > >
>>> > >
>>> > >
>>> > > On Thu, Dec 30, 2021 at 3:55 PM Charles Fyfe
>>> > > <charles.andrew.fyfe@gmail.com> wrote:
>>> > > >
>>> > > > monorepo means you can sometimes just work on the app. not every
>>> > > > change has to also worry about the async calls, docker abstraction
>>> > > >
>>> > > > On Wed, Dec 15, 2021 at 11:23 AM Charles Fyfe
>>> > > > <charles.andrew.fyfe@gmail.com> wrote:
>>> > > > >
>>> > > > > Something like slog? Acts like print for dev branches, does nothing in prod, always shows up to the same place regardless of host
>>> > > > >
>>> > > > > On Fri, Nov 19, 2021, 10:56 PM Charles Fyfe <charles.andrew.fyfe@gmail.com> wrote:
>>> > > > >>
>>> > > > >> CT monorepo. Easier to share code/config/infra. Even a DST monorepo would probably be fine honestly.
>>> > > > >>
>>> > > > >> Just have a bunch of ports set aside. Can you see who triggered a build? Deploy Dan's dev branch to dashboard.us.cray.com/dan
>>> > > > >>
>>> > > > >> Small commits. Tiny. And stack them... shining the UI lets you ship a stack together?
>>> > > > >>
>>> > > > >> Logging. Don't be shy about making new indexes in ELK. Structured data doesn't need to be kept long. Counters are cheap and fast and helpful!
>>> > > > >>
>>> > > > >> Async is super important. Python can definitely do it. Go probably can too.
>>> > > > >>
>>> > > > >> Format on save.
>>> > > > >>
>>> > > > >> Mocking is good actually.
