---
layout: post
title: "Stirring the Sands"
image: "/assets/images/placeholder-05-thumb.png"
description: "How many lands should you play when drafting *Magic: the Gathering* Amonkhet?"
keywords: magic the gathering, booster draft, game design, games
---

In Amonkhet draft, the fastest decks are wildly aggressive. Slower decks have access to powerful synergies -- embalm, -1/-1 counters, and trial/cartouche shenanigans all offer viable lategame plans that don't rely on opening a bomb rare. The unusually-broad format, combined with the return of cycling, has prompted many to move away from the 17-land conventional wisdom for a draft deck. There are [rumblings](https://www.channelfireball.com/articles/how-to-draft-gb-counters-in-amonkhet/) of people running land counts as low as 14.

Fewer lands means more spells, and it's spells that win games. We all know the frustration of watching a game slip away while topdecking land after land after land. But a low land count presents a liability as well; missing an early land drop can be backbreaking, especially against an aggressive opponent.

Optimizing your land count is one of those things that's hard to do by feel -- it takes a lot of work to tell the difference between problems with your deck and problems with your luck. If one build draws badly 20% of the time and the other draws badly 25% of the time, it might take you 800 games to see the difference[^1]!

[^1]: In a hand-wavey sense, random fluctuations go as \\( \sqrt{ \frac{1}{N} } \\). So after 400 games, you've got an uncertainty of about \\( \sqrt{ \frac{1}{400} } = \frac{1}{20} = 5\% \\). Then you need to play another 400 games with the other deck!

Before we break out our shuffling gloves, let's crunch some numbers. We can use [combinatorics](https://en.wikipedia.org/wiki/Combinatorics) to go from land counts to probabilities -- see footnote for more details[^2] -- but first let's quantify exactly what sort of draws we're looking for:

[^2]: The [binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient) \\( { {n}\choose{k} } = \frac{ n! }{ k! \, (n-k)! }\\) is the number of different ways to choose \\(k\\) elements from a list of length \\(n\\). For example, the number of possible 7-card hands from a 40-card deck is \\( { {40}\choose{7} } = \frac{40!}{7! \, 33!}\\), which comes out to 18.6 million. Going a step further, we can calculate the number of opening hands containing exactly 3 lands and 4 spells: \\( { {23}\choose{4} }{ {17}\choose{3} }\\), or 6.0 million, assuming 23 spells and 17 lands. By dividing the two, we find this deck has about a 33% chance to draw exactly 3 lands in its opening hand.

- Even when playing a very aggressive deck, we want to hit our first 3 land drops. This ensures that we have the resources to remove blockers while continuing to build our board -- either by casting multiple spells per turn or by deploying heavy hitters like <a class="card">Ahn-Crop Crasher</a> and <a class="card">Cartouche of Ambition</a>. A few lands past there is fine, but if we have 7 lands on turn 7 we're definitely flooding. So let's look at how different deck configurations affect our odds of having at *least* 3 lands on turn 3, and at *most* 6 lands on turn 7.
- For a midrange deck, we want 4 lands on turn 4. We're happy to play <a class="card">Colossapede</a> on curve, then <a class="card">Winged Shepherd</a>, then maybe even <a class="card">Greater Sandwurm</a>... but if we hit 8 lands on turn 8, we're probably running out of gas. So let's also look at the odds of having at least 4 lands on turn 4, and at most 7 lands on turn 8.
- Finally, let's look at how land count and cycling affect the odds of having at least 5 lands on turn 5, and at most 8 lands on turn 9. This would apply to a deck which has trouble winning without a prompt 5-drop -- <a class="card">Decimator Beetle</a>, <a class="card">Final Reward</a>, <a class="card">Angel of Sanctions</a>, <a class="card">Glyph Keeper</a>, etc.

These odds are shown on the figure below. There's a lot to unpack; let's talk through it.

![](/assets/images/cycling-land-curve.png)
*Caption*

The plot on the left shows how our odds of hitting aggressive land drops depend on the number of lands in our deck (horizontal axis) and the number of cards with cycling (vertical axis). For example, if we play 17 lands and no cards with cycling, we have a 57% chance of drawing an appropriate number of lands. The plot in the center and the one on the right are analogous, but for midrange and slow decks.



---

---

---














difference 15 to 17 is a lot bigger than 17 to 19. diminishing returns.


Note that we're assuming all cyclers are free -- a 40-card deck with 4 cyclers is computed as if it were a 36-card deck -- more on that in a moment.


... cycling effect is significant, but not huge

And it bears noting that the above numbers gloss over a few issues with dumping lands for cyclers.

Cyclers make mulligan decisions harder. Swapping out a land for a Desert Cerodon may seem safe... but even in a deck full of two drops, a one-land hand with a Cerodon is a risky keep.

In terms of hitting its first 3 land drops, a 15-land deck with 6 cyclers is about on par with a 17-land deck... but that doesn't mean they're equally likely to curve one-drop into two-drop into three-drop. The bump up from X% (15 lands, no cyclers) to Y% (15 lands, 6 cyclers) means that in Z% of games, the deck will have to cycle at least one card to make its land drops -- potentially disrupting its curve.
