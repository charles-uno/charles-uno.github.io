---
layout: post
title: "Bake Hard or Go Home"
image: "/assets/images/gbbo-thumb.png"
description: "The Great British Bake Off is not decided by baking skills. Rather, it tests each baker's ability to respond to Paul and Mary."
---

TODO: Maybe a better title?

TODO: Maybe better plot titles? 

Maybe use SVG instead of PNG for images? 

TODO: Better color scheme for the dots. Try the seaborn color scheme:

http://seaborn.pydata.org/_images/color_palettes_8_0.png

https://github.com/mwaskom/seaborn/blob/master/seaborn/palettes.py

TODO: Tighten plots to decrease whitespace. 

Episode 1: Flat as a Pancake

Episode 1: Take with a Grain of Salt

Episode 2: The Wheat and the Chaff

Maybe add a dotted line to the plots to indicate that episode 10 is the finals?

Maybe add a dotted line to the plot to show that the leftmost 3 are the top 3 technical bakers? 

---

After watching the first episode of the Great British Bake Off, you might think you have a sense for which bakers are at the top (and bottom) of the pile.

In the first episode of Series 4 (Season 2[^1]), for example, Ruby is reduced to tears after curdling her crème pâtissière in the signature challenge; it's judged to be "awful." Then, in the technical challenge, she botches her angel food cake so badly that she has to start over... then runs out of time. She survives that episode -- Toby gets cut after mixing up salt and sugar -- but it seems like she's in over her head.

[^1]: Due to copyright issues, the BBC's Great British *Bake Off* is broadcast in the US as the Great British *Baking Show*. The seasons are also shuffled. Series 5 is on Netflix as Season 1; Series 4 is Season 2; etc.

Luckily for Ruby, the first episode of each season tells us very little about how that season will progress. If we compare first-episode technical rank against the number of episodes each baker survives, we get [Rexthor](https://xkcd.com/1725/). Some of the first episode's top technical bakers make it all the way to the finals, while others are eliminated early in the season. There's no particular correlation.

![Episode 1: No Particular Correlation](/assets/images/gbbo-ep1.png)
*Data comes from [Wikipedia](https://en.wikipedia.org/wiki/The_Great_British_Bake_Off_(series_1)). Points are plotted at a slight offset from the lattice points to improve legibility. Series 1 and 2 are omitted due to having a different number of episodes.*

Admittedly, our data set isn't great. Signature challenges and showstoppers are not scored numerically, and the banter between the hosts and judges is dramatically vague. We're comparing technical rank and episode count, ultimately, because those are the numbers we have.

But even considering the kludgey data, the lack of correlation is surprising. We intuitively expect the worst bakers to be eliminated early in the season. And we expect the best bakers to perform well in the technical challenges. In the first week, those expectations do not line up with the numbers.

In the second week, on the other hand, a pattern is clear:

![Episode 2: Cream Rises to the Top](/assets/images/gbbo-ep2.png)
*Scoring well in the second episode's technical challenge is a decent predictor that a baker will make it to the finals. Technical rank in the first episode has no such predictive power.*

If a baker places in the top 3 in the first week's technical challenge, we haven't got a clue whether or not they'll make it to the finals. In the second week -- on average -- 2 of the top 3 technical bakers will make it to the finals.

This suggests that the competition is not decided by the bakers' intrinsic abilities. Creativity, attention to detail, and time management skills would all be apparent from the beginning. But there is one big thing the bakers have in the second episode that they didn't have in the first: experience with the judges. 

Over the course of the first episode, the bakers see Paul and Mary give feedback on dozens of bakes. They have the opportunity to learn about the judges' biases -- aesthetic preferences, pet flavors, and the sorts of mistakes that are judged harshly. Performance in the competition seems to depend (in large part) on the ability to make use of that information. 

