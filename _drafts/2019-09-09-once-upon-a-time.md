---
layout: post
title: "Once Upon a Time"
image: "/assets/images/thumb/once-upon-a-time-matt-stewart.png"
description: "Turn up the hype"
tags: games stem
---

When Mark Rosewater [previewed](https://magic.wizards.com/en/articles/archive/making-magic/eldraine-or-shine-2019-09-09) [[Once Upon a Time]], eyebrows went up. Free stuff and efficient card selection both have a history of ending up on the Modern banned list. In particular, [[Once Upon a Time]] bears a striking resemblance to [[Ancient Stirrings]] -- a card [living on borrowed time](https://magic.wizards.com/en/articles/archive/news/january-21-2019-banned-and-restricted-announcement). Since then, I've run tens of thousands of simulations to put the hype to the test.

<div class="flex-across">
<img class="half" src="/assets/images/ancient-stirrings.png">
<img class="half" src="/assets/images/once-upon-a-time.png">
<img class="half" src="/assets/images/adventurous-impulse.png">
</div>

My code (written in Python) is available on GitHub [here](https://github.com/charles-uno/amulet). I've also written up a human-readable explanation of how it works in my Valakut article [here](http://charles.uno/valakut-simulation/). Values below have systematic and statistical uncertainties of about 1%.


## Tron

Today, 17% of seven-card hands assemble [Tron](https://www.mtggoldfish.com/archetype/modern-tron-46482#paper) on turn three and 53% of hands do so by turn four. Swapping out [[Sylvan Scrying]] for [[Once Upon a Time]] bumps those numbers up to 21% and 60% respectively. Trimming payoffs is also plausible; with both [[Once Upon a Time]] and [[Sylvan Scrying]], the deck is 22% to have turn-three Tron and 67% to have it by turn four.

It may seem strange that [[Once Upon a Time]] (which looks at five cards) performs better than [[Sylvan Scrying]] (which looks at the whole deck). It all comes down to cost. If we cast [[Chromatic Star]] on turn one and [[Sylvan Scrying]] on turn two, we have no mana left over for anything else. But if we start with [[Once Upon a Time]], we can *also* cast [[Expedition Map]] or [[Chromatic Sphere]] into [[Ancient Stirrings]]. That gives us a decent shot to assemble Tron even if there's only a single land in our opening hand.

[[Once Upon a Time]] makes mulligan choices a bit trickier, but I suspect the improved performance is worth it. Not only does it outperform [[Sylvan Scrying]] in the first few turns of the game, but it adds value later on by increasing access to creatures like [[Ulamog, the Ceaseless Hunger:Ulamog]], [[Walking Ballista]], and [[Wurmcoil Engine]]. I'll be very surprised if it doesn't become a standard inclusion in Tron lists.


## Neobrand

When playing against a [goldfish](https://mtg.gamepedia.com/Goldfishing), 26% of seven-card [Neobrand](https://www.mtggoldfish.com/archetype/modern-neobrand#paper) hands can get [[Griselbrand]] on the table on the first turn; 44% do so by turn two. With a set of [[Once Upon a Time]], those numbers are 31% and 53% -- a sizable jump!

That said, Neobrand lists are pretty lean. [[Once Upon a Time]] doesn't outperform [[Serum Visions]], so I had to make some questionable cuts to run the model: [[Pact of Negation]], two [[Life Goes On]], and an [[Autochthon Wurm]]. My list is better at getting [[Griselbrand]] on the table, but it's also (I presume) much more likely to implode mid-combo and lose to its own [[Summoner's Pact]] triggers.


## Valakut

[[Scapeshift]] decks may well use [[Once Upon a Time]], but [[Through the Breach]] builds are much more likely to *abuse* it. These are the builds that shave on lands, play only eight [[Primeval Titan:win]] [[Summoner's Pact:conditions]], and -- most importantly -- pull off unexpected wins with the help of a [[Simian Spirit Guide]] or two. [[Oath of Nissa]] saw play in [past builds](http://www.starcitygames.com/events/coverage/rg_valakut_with_matthias_hunt.html) of Titan Breach, and [[Once Upon a Time]] is a significant upgrade.

[About](http://charles.uno/valakut-simulation/) 12% of seven-card Titan Breach hands can get [[Primeval Titan]] on the table on turn three, and 42% by turn four. By playing [[Once Upon a Time]] instead of some "fair" cards like [[Lightning Bolt]] and [[Obstinate Baloth]], those numbers jump up to 29% and 75%.

[[Once Upon a Time]] is outrageously strong in Titan Breach. It makes the deck twice as likely to get [[Primeval Titan]] on the table on turn three. It also provides much-needed card selection; [[Simian Spirit Guide]] and [[Through the Breach]] are lousy late-game draws. Titan Breach has been waiting years for a card like this.


## Amulet Titan


Back before Summer Bloom was banned, 15% of seven-card hands could get [[Primeval Titan]] on the table on turn two, and 43% could do so by turn three. Today's builds are closer to 5% and 27% respectively.


[Amulet Titan](https://www.mtggoldfish.com/archetype/modern-amulet-titan-88330#paper)

[Bryan Gottlieb](http://www.starcitygames.com/articles/39061_If-Its-Free-Its-Me-How-Once-Upon-A-Time-Impacts-Modern.html)



## Vizier Combo

todo...


## Caveats and Conclusions
