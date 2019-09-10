---
layout: post
title: "Once Upon a Crime"
image: "/assets/images/thumb/pt-rix.png"
description: 
tags: games stem
---

When Mark Rosewater [previewed](https://magic.wizards.com/en/articles/archive/making-magic/eldraine-or-shine-2019-09-09) [[Once Upon a Time]], eyebrows went up. Free stuff and efficient card selection both have a history of ending up on the Modern banned list. In particular, [[Once Upon a Time]] bears a striking resemblance to [[Ancient Stirrings]] -- a card [living on borrowed time](https://magic.wizards.com/en/articles/archive/news/january-21-2019-banned-and-restricted-announcement). Since then, I've run tens of thousands of simulations[^1] to put the hype to the test. 

[^1]: Code available [here](https://github.com/charles-uno/amulet). For a human-readable explanation of how the model works, check out my Valakut article [here](http://charles.uno/valakut-simulation/). 


## Tron

Today, 17% of seven-card hands assemble [Tron](https://www.mtggoldfish.com/archetype/modern-tron-46482#paper) on turn three and 53% of hands do so by turn four. That's with full sets of [[Ancient Stirrings]], [[Chromatic Sphere]], [[Chromatic Star]], [[Expedition Map]], [[Sylvan Scrying]], and the [[Urza's Mine:Urza lands]]. Swapping out [[Sylvan Scrying]] for [[Once Upon a Time]] bumps those numbers up to 21% and 60% respectively. 

It may seem strange that [[Once Upon a Time]] (which looks at five cards) performs better than [[Sylvan Scrying]] (which looks at the whole deck). It all comes down to cost. If we cast [[Chromatic Star]] on turn one and [[Sylvan Scrying]] on turn two, we have no mana left over for anything else. But if we start with [[Once Upon a Time]], we can *also* cast [[Expedition Map]] or [[Chromatic Sphere]] into [[Ancient Stirrings]]. That gives us a decent shot to assemble Tron even if there's only a single land in our opening hand. 

[[Once Upon a Time]] makes mulligan choices a bit trickier, but I suspect the improved performance is worth it. Not only does it outperform [[Sylvan Scrying]] in the first few turns of the game, but it adds value later on by increasing access to creatues like [[Ulamog, the Ceaseless Hunger:Ulamog]], [[Walking Ballista]], and [[Wurmcoil Engine]]. 


> Pro Tour champion Andrew Elenbogen: assembling tron is a bigger bottleneck than finding threats https://twitter.com/Ajelenbogen/status/1171268444781760514


## Neobrand

When playing against a [goldfish](https://mtg.gamepedia.com/Goldfishing), 26% of seven-card [Neobrand](https://www.mtggoldfish.com/archetype/modern-neobrand#paper) hands can get [[Griselbrand]] on the table on the first turn; 44% do so by turn two. With a set of [[Once Upon a Time]], those numbers are 31% and 53% -- a sizable jump!

That said, Neobrand lists are pretty lean. [[Once Upon a Time]] doesn't outperform [[Serum Visions]], so I had to make some questionable cuts to run the model: [[Pact of Negation]], two [[Life Goes On]], and an [[Autochthon Wurm]]. My list is better at getting [[Griselbrand]] on the table, but it's also (I presume) significantly more likely to implode mid-combo and lose to its own [[Summoner's Pact]] triggers. 


## Amulet Titan

Back before Summer Bloom was banned, 


[Amulet Titan](https://www.mtggoldfish.com/archetype/modern-amulet-titan-88330#paper) 



[Bryan Gottlieb argues](http://www.starcitygames.com/articles/39061_If-Its-Free-Its-Me-How-Once-Upon-A-Time-Impacts-Modern.html) that 


 is the big winner in the printing of [[Once Upon a Time]]




## Valakut



















the concern is justified. 

[[Once Upon a Time]] is an unfair card. 




basically the same numbers if you play it in addition to scrying, stirrings


in tron, it isn't competing with Stirrings. It's competing with Scrying.

