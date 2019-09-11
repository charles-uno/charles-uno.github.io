---
layout: post
title: "Once Upon a (Prime) Time"
image: "/assets/images/thumb/once-upon-a-time-matt-stewart.png"
description: "Play it while you can"
tags: games stem
---

When Mark Rosewater [previewed](https://magic.wizards.com/en/articles/archive/making-magic/eldraine-or-shine-2019-09-09) [[Once Upon a Time]], eyebrows went up. Free spells and efficient card selection both have a history of ending up on the Modern [banned list](https://magic.wizards.com/en/game-info/gameplay/rules-and-formats/banned-restricted). In particular, [[Once Upon a Time]] bears a striking resemblance to [[Ancient Stirrings]] -- a card [living on borrowed time](https://magic.wizards.com/en/articles/archive/news/january-21-2019-banned-and-restricted-announcement).

<div class="flex-across">
<img class="half" src="/assets/images/ancient-stirrings.png">
<img class="half" src="/assets/images/once-upon-a-time.png">
</div>

Since then, I've run tens of thousands of simulations to put the hype to the test. My code (written in Python) is available on [GitHub](https://github.com/charles-uno/amulet). You can also check out the human-readable explanation of how it works in my [Valakut article](http://charles.uno/valakut-simulation/#the-model). All values below apply to seven-card hands -- no mulligans. Systematic and statistical uncertainties are about 1%.


## Neobrand

When playing against a [goldfish](https://mtg.gamepedia.com/Goldfishing), 26% of seven-card [Neobrand](https://www.mtggoldfish.com/archetype/modern-neobrand#paper) hands can get [[Griselbrand]] on the table on the first or second turn; 44% do so by turn three. With a set of [[Once Upon a Time]], those numbers are 31% and 53% -- a sizable jump!

That said, Neobrand lists are pretty lean. [[Once Upon a Time]] doesn't outperform [[Serum Visions]], so I had to make some questionable cuts to run the model: [[Pact of Negation]], two [[Life Goes On]], and an [[Autochthon Wurm]]. My list is better at getting [[Griselbrand]] on the table, but it's also (I presume) much more likely to implode mid-combo and lose to its own [[Summoner's Pact]] triggers.

Neobrand doesn't mulligan particularly well, and opening hands are fifty-fifty to be nonfunctional. Play at your own risk -- with or without [[Once Upon a Time]].


## Tron

Today, 17% of seven-card hands assemble [Tron](https://www.mtggoldfish.com/archetype/modern-tron-46482#paper) on turn three and 53% of hands do so by turn four. Swapping out [[Sylvan Scrying]] for [[Once Upon a Time]] bumps those numbers up to 21% and 60% respectively. Trimming payoffs is also plausible; with both [[Once Upon a Time]] and [[Sylvan Scrying]], the deck is 22% to have turn-three Tron and 67% to have it by turn four.

It may seem strange that [[Once Upon a Time]] (which looks at five cards) performs better than [[Sylvan Scrying]] (which looks at the whole deck). It all comes down to cost. If we cast [[Chromatic Star]] on turn one and [[Sylvan Scrying]] on turn two, we have no mana left over for anything else. But if we start with [[Once Upon a Time]], we can *also* cast [[Expedition Map]], or [[Chromatic Sphere]] into [[Ancient Stirrings]]. That gives us a decent shot to assemble Tron even if there's only a single land in our opening hand.

Tron mulligans pretty well, but all else being equal we'd rather keep our opening seven. [[Once Upon a Time]] lets us do so more often. Not only does it outperform [[Sylvan Scrying]] in the first few turns of the game, but it adds value later on by increasing access to creatures like [[Ulamog, the Ceaseless Hunger:Ulamog]], [[Walking Ballista]], and [[Wurmcoil Engine]]. I suspect it'll become a standard inclusion in Tron lists.


## Valakut

[[Scapeshift]] decks may use [[Once Upon a Time]], but [[Through the Breach]] builds are much more likely to *abuse* it. These are the builds that shave on lands, play only eight [[Primeval Titan:win]] [[Summoner's Pact:conditions]], and -- most importantly -- steal games with the help of a [[Simian Spirit Guide]] or two. [[Oath of Nissa]] saw play in [past builds](http://www.starcitygames.com/events/coverage/rg_valakut_with_matthias_hunt.html) of Titan Breach, and [[Once Upon a Time]] is a significant upgrade.

[Depending on the build, about](http://charles.uno/valakut-simulation/) 12% of seven-card Titan Breach hands can get [[Primeval Titan:Prime Time]] on the table on turn three, and 42% by turn four. By playing [[Once Upon a Time]] instead of some "fair" cards like [[Lightning Bolt]] and [[Obstinate Baloth]], those numbers jump up to 29% and 75%.

I've run the numbers on dozens of different builds of Titan Breach, with every different combination of rituals and cantrips imaginable. [[Once Upon a Time]] is in a league of its own. It gives as much velocity as [[Desperate Ritual]], but with none of the vulnerability. In fact, it provides the deck with much-needed card selection; [[Simian Spirit Guide]] and [[Through the Breach]] are great early on, but terrible after your hand has been picked apart by [[Thoughtseize]].


## Amulet Titan

Last but not least, there's [Amulet Titan](https://www.mtggoldfish.com/archetype/modern-amulet-titan-88330#paper). Today's builds are about 3% to get [[Primeval Titan:Prime Time]] on the table on turn two, and 27% to do so by turn three. If we play [[Once Upon a Time]] in place of miscellaneous nonsense like [[Trinket Mage]] and [[Karn, the Great Creator:Karn]], those numbers become 7% and 39% respectively.

For comparison, with [[Summer Bloom]] in those slots, the deck is about 14% to land a turn-two [[Primeval Titan]] and 43% to do so by turn three. That's what got [[Summer Bloom]] banned.

[[Once Upon a Time]] is phenomenal for Amulet Titan. It makes the deck more explosive, more consistent, and more flexible. It gives us access to the land-based toolbox before we even cast [[Primeval Titan]]. It may well be *too* good, and eventually get itself banned.


## Happily Ever After?

In Tron and Amulet Titan, [[Once Upon a Time]] on par with [[Ancient Stirrings]]. In Valakut, it's off the charts. And that's just the start. This card is a powerful enabler for any strategy that depends on seeing certain creatures or lands in the first few turns of the game: [[Devoted Druid]], [[Eldrazi Temple]], [[Glistener Elf]], [[Slippery Bogle]], and so on.

Decks built around creatures and lands are ostensibly more "fair" than those using graveyards and the stack, but the decks that want [[Once Upon a Time]] aren't looking to play fair.
