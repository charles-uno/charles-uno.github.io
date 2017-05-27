---
layout: post
title: "Stirring the Sands"
image: "/assets/images/placeholder-05-thumb.png"
description: ""
keywords: magic the gathering, booster draft, game design, games
---

In Amonkhet draft, the fastest decks are wildly aggressive. Slower decks have access to powerful synergies -- embalm,
-1/-1 counters, and trial/cartouche shenanigans all offer viable lategame plans that don't rely on opening a bomb rare. The unusually-broad format, combined with the return of cycling, has prompted many to move away from the 17-land conventional wisdom for a draft deck. There are [rumblings](https://www.channelfireball.com/articles/how-to-draft-gb-counters-in-amonkhet/) of people running land counts as low as 14.

Fewer lands means more spells, and it's spells that win games. We all know the frustration of watching a game slip away while topdecking land after land after land.


But a low land count presents a liability as well --

especially against an aggressive opponent.





difference 15 to 17 is a lot bigger than 17 to 19. diminishing returns. 



Ideally, we want our decks to include just enough lands to cast our important spells on curve -- but "just enough" is difficult to judge in practice.

A 15-land deck will see an average of 3.75 lands by its third draw step; for a 17-land deck, the number is 4.25. That difference adds up over time, but in the short term it's hard to distinguish between deck problems and bad luck.

---



Before dealing out hundreds of sample hands to get a feel for each configuration, let's crunch a few numbers.

Even an aggressive deck generally wants to hit 3 lands on turn 3, and decks with higher curves often want to hit 5 lands on turn 5. Those are decent metrics, and easily crunched out using combinatorics.

Note that we're assuming all cyclers are free -- a 40-card deck with 4 cyclers is computed as if it were a 36-card deck -- more on that in a moment.








http://gastonsanchez.com/visually-enforced/opinion/2014/02/16/Mathjax-with-jekyll/

$$a^2 + b^2 = c^2$$









Luckily,




---



![](/assets/images/cycling-land-curve.png)
*Caption*


---

... cycling effect is significant, but not huge

And it bears noting that the above numbers gloss over a few issues with dumping lands for cyclers.

Cyclers make mulligan decisions harder. Swapping out a land for a Desert Cerodon may seem safe... but even in a deck full of two drops, a one-land hand with a Cerodon is a risky keep.

In terms of hitting its first 3 land drops, a 15-land deck with 6 cyclers is about on par with a 17-land deck... but that doesn't mean they're equally likely to curve one-drop into two-drop into three-drop. The bump up from X% (15 lands, no cyclers) to Y% (15 lands, 6 cyclers) means that in Z% of games, the deck will have to cycle at least one card to make its land drops -- potentially disrupting its curve.
