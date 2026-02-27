---
layout: post
title: "Welcome to the Human-Hostile Codebase"
image: "/assets/images/thumb/aunt-marys-cranberries.png"
description: You would never write code in C and ask your peer to review the resulting Assembly.
tags: 
---

Once upon a time, people wrote code in Assembly. The language is extremely efficient, but also tedious and error-prone. 

Then came C, which is a layer up from Assembly. The compiler adds a bit of slop, so we're not quite as efficient at runtime. The convenience is worth it. Hardware got faster and humans stopped working in Assembly (with niche exceptions). 

Python is a layer up from C. The interpreter adds another layer of slop, so we take another hit at runtime. The convenience is worth it. Hardware got faster and humans stopped working in C (with niche exceptions). 

Now we're writing AI prompts to generate Python code. 

At the moment we're early adopters. AI tooling isn't stable yet. Sometimes it produces code that is not just sloppy, but outright wrong. We're doing human reviews to stop the wrong code from going live. 

This won't last. As AI tooling is wrong less often, human reviews will become less impactful. As AI tooling gets faster, human reviews will become more of a bottleneck. You wouldn't write code in C and ask your peers to review the resulting Assembly. Similarly, once AI tooling can produce reliably correct behavior, engineers will embrace the sloppy convenience. 

After that, human fluency in the code base will erode:

- We'll need to figure out a new way to review changes. Maybe AI will generate some kind of summary or diagram.
- Updates to existing systems will be dependent on AI-powered research.
- Problematic services will be reimplemented rather than refactored.
- Oncall responsibilities will fundamentally change as stack traces become inscrutable to humans.

In other words, the code base will become hostile to humans. We're already almost there.
