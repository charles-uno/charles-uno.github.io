---
layout: post
title: "Tarts and Tactics under the Tent"
image: "/assets/images/thumb/gbbo.png"
description: "The Great British Bake Off is not decided by intrinsic baking ability. Rather, it tests each baker's ability to adapt to their surroundings. Mild spoilers."
tags: math media
---

After watching the first episode of the Great British Bake Off, you might think you have a sense for which bakers are at the top (and bottom) of the pile.

In the first episode of Series 4 (Season 2 in the US[^1]), for example, Ruby is reduced to tears after curdling her crème pâtissière in the signature challenge; it's judged to be "awful." Then, in the technical challenge, she botches her angel food cake so badly that she has to start over... and runs out of time. She survives that episode -- Toby gets cut after mixing up salt and sugar -- but it seems like she's in over her head.

[^1]: Due to copyright issues, the BBC's Great British *Bake Off* is broadcast in the US as the Great British *Baking Show*. The seasons are also shuffled. Series 5 is on Netflix as Season 1; Series 4 is Season 2; etc.

Luckily for Ruby, the first episode of each season tells us very little about how that season will progress. If we compare first-episode technical rank against the number of episodes each baker survives, we get [Rexthor](https://xkcd.com/1725/). Some of the first episode's top technical bakers make it all the way to the finals, while others are eliminated early in the season. There's no particular correlation.

![Episode 1: Taking Judgments with a Grain of Salt](/assets/images/wide/gbbo-ep1.svg)
<p class="figure-caption">Data comes from [Wikipedia](https://en.wikipedia.org/wiki/The_Great_British_Bake_Off_(series_1)). Points are plotted at a slight offset from the lattice points to improve legibility. Series 1 and 2 are omitted due to having a different number of episodes.</p>

Admittedly, our data set isn't great. Signature challenges and showstoppers are not scored numerically, and the banter between the hosts and judges is dramatically vague. We're comparing technical rank and episode count, ultimately, because those are the numbers we have.

But even considering the kludgey data, the lack of correlation is surprising. We intuitively expect the worst bakers to be eliminated early in the season. And we expect the best bakers to perform well in the technical challenges. In the first week, those expectations do not line up with the numbers.

In the second week, on the other hand, a pattern is clear:

![Episode 2: Separating the Wheat from the Chaff](/assets/images/wide/gbbo-ep2.svg)
<p class="figure-caption">Scoring well in the second episode's technical challenge is a decent predictor that a baker will make it to the finals. Technical rank in the first episode has no such predictive power.</p>

Performance in the first episode is a proxy for each baker's intrinsic strengths: creativity, attention to detail, and the ability to master new techniques[^2]. It does not seem that the contest is decided by these strengths. If a baker places in the top 3 in the first week's technical challenge, we haven't got a clue whether or not they'll make it to the finals.

[^2]: Bakers are given some information about the upcoming challenge a week ahead of time, so they can practice.

By the second episode, there's an extra layer of strategy to the competition. The bakers have spent two full days together, and seen Paul and Mary give feedback on dozens of bakes. This -- evidently -- matters a lot. On average, two of the top three bakers from the second technical challenge will make it to the finals.

Perhaps the bakers scope out their competitors, and try to settle into an advantageous niche. Perhaps they get a sense for the judges' biases -- aesthetic preferences, favorite flavors, and the sorts of mistakes that are judged harshly. It's these sorts of strategies that seem to determine who makes it to the finals, far more than the intrinsic skills showcased in the opening episode.
