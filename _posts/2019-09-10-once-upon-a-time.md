---
layout: post
title: "Once Upon a (Prime) Time"
image: "/assets/images/thumb/once-upon-a-time-matt-stewart.png"
description: "Play it while you can"
tags: games stem
---

*Editor's note: this article has been updated to correct a mistake in the Neobrand numbers. Thanks Chris!*

When Mark Rosewater [previewed](https://magic.wizards.com/en/articles/archive/making-magic/eldraine-or-shine-2019-09-09) [[Once Upon a Time]], eyebrows went up. Free spells and efficient card selection both have a history of ending up on the Modern [banned list](https://magic.wizards.com/en/game-info/gameplay/rules-and-formats/banned-restricted). In particular, [[Once Upon a Time]] bears a striking resemblance to [[Ancient Stirrings]] -- a card [living on borrowed time](https://magic.wizards.com/en/articles/archive/news/january-21-2019-banned-and-restricted-announcement).

<div class="flex-across">
<img class="half" src="/assets/images/ancient-stirrings.png">
<img class="half" src="/assets/images/once-upon-a-time.png">
</div>

Since then, I've run tens of thousands of simulations to put the hype to the test. My code (written in Python) is available on [GitHub](https://github.com/charles-uno/amulet). You can also check out the human-readable explanation of how it works in my [Valakut article](http://charles.uno/valakut-simulation/#the-model). All values below apply to seven-card hands playing against a [goldfish](https://mtg.gamepedia.com/Goldfishing) -- no mulligans, no disruption.


## Neobrand

Perhaps the most obvious (and concerning) application of [[Once Upon a Time]] is [Neobrand], an all-in combo deck that can win on the first turn of the game. Losing to Neobrand is miserable, but luckily doesn't happen often. The deck's unreliability and vulnerability to disruption have kept it out of the main stream. [[Once Upon a Time:OUAT]] threatens to make Neobrand more consistent and resilient by improving its access to [[Allosaurus Rider]], [[Simian Spirit Guide]], and lands.

[Neobrand]: https://www.mtggoldfish.com/archetype/modern-neobrand#paper

|                                                         |  T1 | ≤T2 | ≤T3 |
|:--------------------------------------------------------|:---:|:---:|:---:|
| Neobrand                                                | 12% | 38% | 56% |
| ... [[Chancellor of the Tangle]] → [[Once Upon a Time]] |  3% | 44% | 67% |
| ... [[Serum Visions]] → [[Once Upon a Time]]            | 14% | 40% | 55% |
| ... Other stuff[^1] → [[Once Upon a Time]]              | 14% | 45% | 67% |

<p class="table-caption">Odds to get a [[Griselbrand]] on the table each turn. Values are cumulative, so "≤T3" is the odds to do so on turn three or earlier. All values ±2%.</p>

[^1]: "Other stuff" refers to anything not on the critical path to accomplishing the model's goal. For example, the goal of the Valakut model is to get [[Primeval Titan]] on the table. Cards like [[Lightning Bolt]] and [[Obstinate Baloth]] don't help with that. As far as the computer is concerned, they're blanks.

Judging from the numbers above, I suspect the concern is overblown. [[Once Upon a Time]] is about on par with [[Serum Visions]]. It does not significantly boost the deck's odds to land a turn-one [[Griselbrand]]. Turn-two and turn-three numbers look better with [[Once Upon a Time:OUAT]], but cutting [[Chancellor of the Tangle]] or [[Life Goes On]] or [[Pact of Negation]] also increases the deck's risk of imploding[^2] mid-combo. [[Once Upon a Time:OUAT]] may be an incremental improvement to Neobrand, but it's probably not a game changer.

[^2]: Once [[Griselbrand]] is on the table, the plan is to gain a bunch of life, draw our whole deck, and win with [[Laboratory Maniac]]. If we don't draw [[Nourishing Shoal:lifegain]] [[Life Goes On:spells]] fast enough, we can run out of steam.


## Tron

In terms of assembling [[Urza's Mine:Ur]][[Urza's Power Plant:za]][[Urza's Tower:tron]], [[Once Upon a Time]] outperforms[^3] both [[Ancient Stirrings]] and [[Sylvan Scrying]]. It's tough to imagine cutting [[Ancient Stirrings]] -- it finds [[Relic of Progenitus:much]] [[Karn Liberated:more]] [[Oblivion Stone:than]] [[Ugin, the Spirit Dragon:lands]] -- but swapping out [[Sylvan Scrying]] for [[Once Upon a Time:OUAT]] would give the deck a boost.

[^3]: The model works by exhaustive search, which essentially means it has superhuman "instincts" about the order of the deck. To suppress non-human play patterns, choices between Urza lands are made alphabetically. If it's already got [[Urza's Tower:Tower]], it'll always take [[Urza's Mine:Mine]] over [[Urza's Power Plant:Power Plant]] -- even if it "knows" the card it's about to draw is another [[Urza's Mine:Mine]].

|                                                  |  T3 | ≤T4 |
|:-------------------------------------------------|:---:|:---:|
| [Tron]                                           | 16% | 53% |
| ... [[Ancient Stirrings]] → [[Once Upon a Time]] | 18% | 57% |
| ... [[Sylvan Scrying]] → [[Once Upon a Time]]    | 21% | 60% |
| ... Other stuff → [[Once Upon a Time]]           | 22% | 66% |

<p class="table-caption">Odds to have Tron by each turn. Values are cumulative, so "≤T4" is the odds to do so on turn four or earlier. All values ±2%.</p>

[Tron]: https://www.mtggoldfish.com/archetype/modern-tron-46482#paper

It may seem strange that [[Once Upon a Time]] (which looks at five cards) performs better than [[Sylvan Scrying]] (which looks at the whole deck). It comes down to mana cost. We can afford to cast [[Expedition Map:Map]] *or* [[Sylvan Scrying:Scrying]] by turn two, but not both. With [[Once Upon a Time:OUAT]], we can cast multiple (non-[[Chromatic Star:egg]]) spells in search of turn-three Tron. That gives us a decent shot to assemble turn-three Tron even if there's only a single land in our opening hand.

[[Once Upon a Time]] lets Tron mulligan a bit less often and assemble Tron a bit more consistently compared to [[Sylvan Scrying]]. On top of that, it adds value later on by increasing access to creatures like [[Ulamog, the Ceaseless Hunger:Ulamog]], [[Walking Ballista]], and [[Wurmcoil Engine]]. I suspect it'll become a standard inclusion in Tron lists.


## Valakut

[Titan Shift] is built for comfort, not for speed. [[Lightning Bolt:Removal]] and [[Obstinate Baloth:speed]] [[Courser of Kruphix:bumps]] are generally a better fit than cantrips. [Titan Breach] is another story. The deck plays only eight [[Primeval Titan:win]] [[Summoner's Pact:conditions]], and regularly steals games with a timely [[Simian Spirit Guide]]. [[Oath of Nissa]] saw play in [past builds](http://www.starcitygames.com/events/coverage/rg_valakut_with_matthias_hunt.html), and [[Once Upon a Time]] is twice as good:

[Titan Breach]: http://charles.uno/valakut-simulation/#breach-for-the-stars

[Titan Shift]: https://www.mtggoldfish.com/archetype/modern-titanshift-96185#paper

|                                        | T3  | ≤T4 |
|:---------------------------------------|:---:|:---:|
| [Titan Breach]                         | 15% | 59% |
| ... Other stuff → [[Desperate Ritual]] | 35% | 70% |
| ... Other stuff → [[Oath of Nissa]]    | 22% | 73% |
| ... Other stuff → [[Once Upon a Time]] | 29% | 77% |

<p class="table-caption">Odds to get [[Primeval Titan]] on the table by each turn. Values are cumulative, so "≤T4" is the odds to do so on turn four or earlier. All values ±2%.</p>

Before playing Titan Breach at the Pro Tour, I ran the numbers on dozens of different builds: cantrips, rituals, [[Hour of Promise:you]] [[Shefet Monitor:name]] [[Manamorphose:it]]. [[Once Upon a Time:OUAT]] is in a league of its own. It gives almost as much velocity as [[Desperate Ritual]]. But instead of making the deck a glass cannon, it adds resiliency. [[Once Upon a Time]] makes the deck goldfish faster while also increasing access to high-impact sideboard cards and finishers in the face of disruption. Titan Breach has been waiting years for a card like this.


## Amulet Titan

[[Summer Bloom]] was banned because Amulet Titan won too often [before turn four](https://magic.wizards.com/en/articles/archive/news/january-18-2016-banned-and-restricted-announcement-2016-01-18).




[[Once Upon a Time]] puts up numbers that


[[Explore]] was a passable substitute. [[Once Upon a Time]] is much closer.





|                                                  |  T2 | ≤T3 | ≤T4 |
|:-------------------------------------------------|:---:|:---:|:---:|
| [Amulet Titan]                                   |  3% | 27% | 60% |
| ... [[Ancient Stirrings]] → [[Once Upon a Time]] |  5% | 30% | 64% |
| ... Other stuff → [[Explore]]                    |  6% | 34% | 67% |
| ... Other stuff → [[Once Upon a Time]]           |  7% | 40% | 75% |
| ... Other stuff → [[Summer Bloom]]               | 14% | 41% | 69% |

<p class="table-caption">Odds to get [[Primeval Titan]] on the table by each turn. Values are cumulative, so "≤T4" is the odds to do so on turn four or earlier. All values ±2%.</p>

[Amulet Titan]: https://www.mtggoldfish.com/archetype/modern-amulet-titan-88330#paper

Many [Amulet Titan] opening hands are one card away from casting a turn-three [[Primeval Titan]]. They just need an [[Gemstone Mine:untapped land]], or a [[Simic Growth Chamber:bounce land]], or an [[Azusa, Lost but Seeking:Azusa]], or a [[Primeval Titan]]. [[Once Upon a Time]] finds all those things for free. In the first few turns of the game, it's better than [[Ancient Stirrings]].


[[Karn, the Great Creator:Karn]], [[Golos, Tireless Pilgrim:Golos]], and






## Happily Ever After?

[[Once Upon a Time]] is great in Tron and Amulet Titan -- comparable in power level to [[Ancient Stirrings]]. It's bonkers in Titan Breach, where it finds both [[Simian Spirit Guide]] and [[Primeval Titan]]. It gives a boost to Neobrand. And that's just the start. [[Once Upon a Time:OUAT]] card is a powerful enabler for any strategy that depends on seeing certain creatures or lands in the first few turns of the game: [[Devoted Druid]], [[Eldrazi Temple]], [[Glistener Elf]], [[Slippery Bogle]], and so on.

Decks built around creatures and lands are ostensibly more "fair" than those using graveyards and the stack, but the decks that want [[Once Upon a Time]] aren't looking to play fair. I would not be surprised to see this card push something over the line and get banned.
