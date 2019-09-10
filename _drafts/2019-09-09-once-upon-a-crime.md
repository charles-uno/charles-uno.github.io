---
layout: post
title: "Once Upon a Crime"
image: "/assets/images/thumb/pt-rix.png"
description: 
tags: games stem
---

When Mark Rosewater [previewed](https://magic.wizards.com/en/articles/archive/making-magic/eldraine-or-shine-2019-09-09) [[Once Upon a Time]], eyebrows went up. Free stuff and efficient card selection both have a history of ending up on the Modern banned list. In particular, [[Once Upon a Time]] bears a striking resemblance to [[Ancient Stirrings]] -- a card which was recently [called out](https://magic.wizards.com/en/articles/archive/news/january-21-2019-banned-and-restricted-announcement) as a potential future ban. 



may well be banned someday. 



, which was [recently acknowledged](https://magic.wizards.com/en/articles/archive/news/january-21-2019-banned-and-restricted-announcement) as a card which toes the line.



a card they're got their eye on. 



This card in particular looks a lot like [[Ancient Stirrings]], a card which [was recently acknowledged](https://magic.wizards.com/en/articles/archive/news/january-21-2019-banned-and-restricted-announcement) as potentially bannable. 

Since then, I've simulated[^1] tens of thousands of opening hands over a handful of different archetypes. 



to get a sense for the card's power level. 






Since then, I've simulated tens of thousands of opening hands over a handful of different archetypes.

[^1]: Code available [here](https://github.com/charles-uno/amulet). For a human-readable explanation of how the model works, check out my Valakut article [here](http://charles.uno/valakut-simulation/). 

## Tron

Today, 17% of seven-card hands assemble Tron on turn three and 53% of hands do so by turn four. That's with full sets of [[Ancient Stirrings]], [[Chromatic Sphere]], [[Chromatic Star]], [[Expedition Map]], [[Sylvan Scrying]], and the [[Urza's Mine:Urza lands]]. Swapping out [[Sylvan Scrying]] for [[Once Upon a Time]] bumps those numbers up to 21% and 60% respectively. 

It may seem strange that [[Once Upon a Time]] (which looks at five cards) performs better than [[Sylvan Scrying]] (which looks at the whole deck). It all comes down to cost. If we cast [[Chromatic Star]] on turn one and [[Sylvan Scrying]] on turn two, we have no mana left over for anything else. But if we open on [[Once Upon a Time]], we can *also* cast [[Expedition Map]] or [[Chromatic Sphere]] into [[Ancient Stirrings]]. That gives us a decent shot to assemble Tron even if there's only a single land in our opening hand. 

[[Once Upon a Time]] makes mulligan choices a bit trickier, but I suspect the improved performance is worth it. Not only does it outperform [[Sylvan Scrying]] in the first few turns of the game, but it adds value later on by increasing access to creatues like [[Ulamog, the Ceaseless Hunger:Ulamog]], [[Walking Ballista]], and [[Wurmcoil Engine]]. I strongly suspect that Tron will play this card. 


Pro Tour champion Andrew Elenbogen: assembling tron is a bigger bottleneck than finding threats

https://twitter.com/Ajelenbogen/status/1171268444781760514






I'm no expert on Tron, but I know someone who is: Pro Tour champion Andrew Elenbogen. By his account, assembling the three [[Urza's Mine:Urza lands]] is a [bigger bottleneck](https://twitter.com/Ajelenbogen/status/1171268444781760514) than finding threats. For that reason, the numbers below refer to the odds of assembling Tron on a particular turn, rather than (for example) the odds of casting [[Karn Liberated]]. 















but I believe (Pro Tour Chamption) Andrew Elenbogen when he says [assembling Tron is the biggest bottleneck](https://twitter.com/Ajelenbogen/status/1171268444781760514). For that reason, I chose to model the velocity of assembling Tron, rather than (for example) the velocity of casting [[Karn Liberated]]. 



For Tron, we're looking at how fast we can assemble the three [[Urza's Mine:Urza lands]]. According to (Pro Tour Champion) Andrew Elenbogen, that's a larger bottleneck than finding threats. 


https://twitter.com/Ajelenbogen/status/1171268444781760514




So I chose to focus on the odds of assembling Tron, rather than (for example) the odds of casting [[Karn Liberated]]



Today's Tron decks look like this:

<table class="cardlist">
    <caption class="deckname">Tron</caption>
    <tr>
        <td>
            4 [[Ancient Stirrings]]<br>
            4 [[Chromatic Sphere]]<br>
            4 [[Chromatic Star]]<br>
            4 [[Expedition Map]]<br>
            4 [[Sylvan Scrying]]<br>
            21 [[Walking Ballista]] or whatever
        </td>
        <td>
            4 [[Forest]]<br>
            4 [[Urza's Mine]]<br>
            4 [[Urza's Power Plant]]<br>
            4 [[Urza's Tower]]<br>
            3 [[Wastes]]<br>
        </td>
    </tr>
</table>







As far as assembling turn-three Tron, the only cards that matter are [[Ancient Stirrings]], [[Chromatic Star]], [[Chromatic Sphere]], [[Expedition Map]], [[Sylvan Scrying]], and the [[Urza's Mine:Urza lands]]. The other half of the deck might as well be blanks. 


[[Once Upon a Time]] gives the deck a significant boost in that department. 





Tron plays twenty tools to help assemble [[Urza's Mine]], [[Urza's Power Plant]], and [[Urza's Tower]]. 



Your average Tron list plays 19 lands alongside full sets of [[Ancient Stirrings]], [[Chromatic Star]], [[Chromatic Sphere]], [[Expedition Map]], and [[Sylvan Scrying]]. 



## Neobrand



## Amulet Titan


## Valakut



















the concern is justified. 

[[Once Upon a Time]] is an unfair card. 




basically the same numbers if you play it in addition to scrying, stirrings


in tron, it isn't competing with Stirrings. It's competing with Scrying.

