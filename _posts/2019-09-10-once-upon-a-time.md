---
layout: post
title: "Once Upon a (Prime) Time"
image: "/assets/images/thumb/once-upon-a-time-matt-stewart.png"
description: "Play it while you can"
tags: games stem
---

> Editor's note: this article has been updated for clarity

When Mark Rosewater [previewed](https://magic.wizards.com/en/articles/archive/making-magic/eldraine-or-shine-2019-09-09) [[Once Upon a Time]], eyebrows went up. Free spells and efficient card selection both have a history of ending up on the Modern [banned list](https://magic.wizards.com/en/game-info/gameplay/rules-and-formats/banned-restricted). In particular, [[Once Upon a Time]] bears a striking resemblance to [[Ancient Stirrings]] -- a card [living on borrowed time](https://magic.wizards.com/en/articles/archive/news/january-21-2019-banned-and-restricted-announcement).

<div class="flex-across">
<img class="half" src="/assets/images/ancient-stirrings.png">
<img class="half" src="/assets/images/once-upon-a-time.png">
</div>

Since then, I've run tens of thousands of simulations to put the hype to the test. My code (written in Python) is available on [GitHub](https://github.com/charles-uno/amulet). You can also check out the human-readable explanation of how it works in my [Valakut article](http://charles.uno/valakut-simulation/#the-model). All values below apply to seven-card hands -- no mulligans. Systematic and statistical uncertainties are about 1%.


## Neobrand

When playing against a [goldfish](https://mtg.gamepedia.com/Goldfishing), 26% of seven-card [Neobrand](https://www.mtggoldfish.com/archetype/modern-neobrand#paper) hands can get [[Griselbrand]] on the table on the first or second turn; 44% do so by turn three. It's possible to make those numbers better with [[Once Upon a Time]], but it's not pretty:

|                                              | ≤ T2 | ≤ T3 | ≤ T4 |
|:---------------------------------------------|:----:|:----:|:----:|
| [Neobrand]                                   |  26% | 44%  | 53%  |
| ... [[Serum Visions]] → [[Once Upon a Time]] |  22% | 39%  | 48%  |
| ... Other stuff → [[Once Upon a Time]]       |  31% | 53%  | 61%  |

<p class="table-caption">Odds to get a [[Griselbrand]] on the table quickly. Values are cumulative, so "≤T4" is the odds to do so on turn four or earlier. All values ±1%.</p>

[Neobrand]: https://www.mtggoldfish.com/archetype/modern-neobrand#paper

Swapping [[Serum Visions]] out for [[Once Upon a Time]] doesn't help. And the rest of the deck is pretty lean. To improve the numbers, I had to make some questionable cuts: [[Pact of Negation]], [[Autochthon Wurm]], and two [[Life Goes On]]. Playing [[Once Upon a Time]] over these cards makes the deck better at getting [[Griselbrand]] on the table quickly, but also (presumably) more likely to implode mid-combo and lose to its own [[Summoner's Pact]] trigger.

Neobrand doesn't mulligan particularly well, and almost half of its opening hands are nonfunctional. Play at your own risk -- with or without [[Once Upon a Time]].


## Tron

In terms of assembling[^2] Tron, [[Ancient Stirrings]] and [[Sylvan Scrying]] are about on par with one another. [[Once Upon a Time]] is better than either. We'd never cut [[Ancient Stirrings]] -- it finds more than just lands -- but swapping [[Sylvan Scrying]] for [[Once Upon a Time]] makes the deck 20% more likely to have turn-three Tron:

[^2]: For our purposes, "assembling Tron" means having access to 7+ mana from the [[Urza's Mine:Urza lands]]. Casting [[Ancient Stirrings]] on turn three to find the last piece doesn't count.

|                                                  | ≤ T2 | ≤ T3 | ≤ T4 |
|:-------------------------------------------------|:----:|:----:|:----:|
| [Tron]                                           |   0% | 17%  | 53%  |
| ... [[Ancient Stirrings]] → [[Once Upon a Time]] |   0% | 21%  | 60%  |
| ... [[Sylvan Scrying]] → [[Once Upon a Time]]    |   0% | 21%  | 60%  |
| ... Other stuff → [[Once Upon a Time]]           |   0% | 22%  | 67%  |

<p class="table-caption">Odds to have Tron by each turn. Values are cumulative, so "≤T4" is the odds to do so on turn four or earlier. All values ±1%.</p>

[Tron]: https://www.mtggoldfish.com/archetype/modern-tron-46482#paper

It may seem strange that [[Once Upon a Time]] (which looks at five cards) performs better than [[Sylvan Scrying]] (which looks at the whole deck). It all comes down to cost. If we cast [[Chromatic Star]] on turn one and [[Sylvan Scrying]] on turn two, we have no mana left over for anything else. But if we start with [[Once Upon a Time]], we can *also* cast [[Expedition Map]], or [[Chromatic Sphere]] into [[Ancient Stirrings]]. That gives us a decent shot to assemble Tron even if there's only a single land in our opening hand.


[[Once Upon a Time]] lets Tron mulligan a bit less often and assemble Tron a bit more consistently compared to [[Sylvan Scrying]]. On top of that, it adds value later on by increasing access to creatures like [[Ulamog, the Ceaseless Hunger:Ulamog]], [[Walking Ballista]], and [[Wurmcoil Engine]]. I suspect it'll become a standard inclusion in Tron lists.


## Valakut

[Titan Shift](https://www.mtggoldfish.com/archetype/modern-titanshift-96185#paper) decks will probably use [[Once Upon a Time]], but they can't exactly *abuse* it. The deck still has no way to win before turn four. Builds with [[Through the Breach]] are another story. Titan Breach decks are the ones that shave on lands, play only eight [[Primeval Titan:win]] [[Summoner's Pact:conditions]], and -- most importantly -- steal games with the help of a [[Simian Spirit Guide]] or two. [[Oath of Nissa]] saw play in [past builds](http://www.starcitygames.com/events/coverage/rg_valakut_with_matthias_hunt.html) of Titan Breach, and [[Once Upon a Time]] is a significant upgrade.

|                                        | ≤ T2 | ≤ T3 | ≤ T4 |
|:---------------------------------------|:----:|:----:|:----:|
| [Titan Breach]                         |   0% | 15%  | 57%  |
| ... Other stuff → [[Desperate Ritual]] |   0% | 34%  | 70%  |
| ... Other stuff → [[Oath of Nissa]]    |   0% | 22%  | 73%  |
| ... Other stuff → [[Once Upon a Time]] |   0% | 27%  | 75%  |

<p class="table-caption">Odds to get [[Primeval Titan]] on the table by each turn. Values are cumulative, so "≤T4" is the odds to do so on turn four or earlier. All values ±1%.</p>

[Titan Breach]: http://charles.uno/valakut-simulation/#breach-for-the-stars

I've run the numbers on dozens of different builds of Titan Breach, with every different combination of rituals and cantrips imaginable. [[Once Upon a Time]] is in a league of its own. It gives almost as much velocity as [[Desperate Ritual]]. But instead of making the deck a glass cannon, it adds resiliency. [[Once Upon a Time]] makes the deck goldfish faster while also increasing access to high-impact sideboard cards and finishers in the face of disruption. Titan Breach has been waiting years for a card like this.


## Amulet Titan

[Amulet Titan] has been waiting too.

|                                                  | ≤ T2 | ≤ T3 | ≤ T4 |
|:-------------------------------------------------|:----:|:----:|:----:|
| [Amulet Titan]                                   |   3% | 27%  | 60%  |
| ... [[Ancient Stirrings]] → [[Once Upon a Time]] |   5% | 30%  | 64%  |
| ... Other stuff → [[Explore]]                    |   6% | 34%  | 67%  |
| ... Other stuff → [[Once Upon a Time]]           |   7% | 39%  | 75%  |
| ... Other stuff → [[Summer Bloom]]               |  14% | 41%  | 69%  |

<p class="table-caption">Odds to get [[Primeval Titan]] on the table by each turn. Values are cumulative, so "≤T4" is the odds to do so on turn four or earlier. All values ±1%.</p>

[Amulet Titan]: https://www.mtggoldfish.com/archetype/modern-amulet-titan-88330#paper

Amulet Titan is a land-based toolbox deck that sometimes uses [[Amulet of Vigor]] and [[Simic Growth Chamber:bounce lands]] to do silly things like play turn-two [[Primeval Titan]]. [[Ancient Stirrings]] is phenomenal in the deck. If we swap out [[Ancient Stirrings]] for [[Once Upon a Time]], the deck gets *better*[^3]. With access to both, the numbers get a bit concerning. In the first few turns of the game, [[Once Upon a Time]] is somewhere between [[Explore]] (which is playable) and [[Summer Bloom]] (which is banned).

[^3]: Here we're talking about goldfishing specifically. In a broader sense, [[Once Upon a Time]] versus [[Ancient Stirrings]] depends on how much you care about finding [[Engineered Explosives]] versus [[Azusa, Lost but Seeking:Azusa]], how much instant speed matters, and so on.


## Happily Ever After?

[[Once Upon a Time]] is great in Tron and Amulet Titan -- in the same neighborhood as [[Ancient Stirrings]]. It's bonkers in Titan Breach, where it finds both [[Simian Spirit Guide]] and [[Primeval Titan]]. And that's just the start. This card is a powerful enabler for any strategy that depends on seeing certain creatures or lands in the first few turns of the game: [[Devoted Druid]], [[Eldrazi Temple]], [[Glistener Elf]], [[Slippery Bogle]], and so on.

Decks built around creatures and lands are ostensibly more "fair" than those using graveyards and the stack, but the decks that want [[Once Upon a Time]] aren't looking to play fair.
