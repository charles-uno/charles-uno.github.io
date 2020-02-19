---
layout: post
title: "Once Upon a (Prime) Time"
image: "/assets/images/thumb/once-upon-a-time-matt-stewart.png"
description: "Play it while you can"
tags: games stem
---

*Editor's note: this article has been updated for clarity and to correct a mistake in the Neobrand numbers. Thanks Chris!*

When Mark Rosewater [previewed](https://magic.wizards.com/en/articles/archive/making-magic/eldraine-or-shine-2019-09-09) [[Once Upon a Time]], eyebrows went up. Free spells and efficient card selection both have a history of ending up on the Modern [banned list](https://magic.wizards.com/en/game-info/gameplay/rules-and-formats/banned-restricted). In particular, [[Once Upon a Time]] bears a striking resemblance to [[Ancient Stirrings]] -- a card [living on borrowed time](https://magic.wizards.com/en/articles/archive/news/january-21-2019-banned-and-restricted-announcement).

<div class="flex-across">
<img class="half" src="/assets/images/ancient-stirrings.png">
<img class="half" src="/assets/images/once-upon-a-time.png">
</div>

Since then, I've run tens of thousands of simulations to put the hype to the test. My code (written in Python) is available on [GitHub](https://github.com/charles-uno/mtg-model). You can also check out the human-readable explanation of how it works in my [Valakut article](http://charles.uno/valakut-simulation/#the-model). All values below apply to seven-card hands playing against a [goldfish](https://mtg.gamepedia.com/Goldfishing) -- no mulligans, no disruption.


## Neobrand

Perhaps the most obvious (and concerning) application of [[Once Upon a Time]] is [Neobrand], an all-in combo deck that can win on the first turn of the game. Losing to Neobrand is miserable, but luckily doesn't happen often. The deck's unreliability and vulnerability to disruption have kept it out of the main stream. [[Once Upon a Time:OUAT]] threatens to make Neobrand more consistent and resilient by improving its access to [[Allosaurus Rider]], [[Simian Spirit Guide]], and lands.

[Neobrand]: https://www.mtggoldfish.com/archetype/modern-neobrand#paper

|                                                         |  T1 | ≤T2 | ≤T3 |
|:--------------------------------------------------------|:---:|:---:|:---:|
| Neobrand                                                | 11% | 38% | 55% |
| ... [[Serum Visions]] → [[Once Upon a Time]]            | 13% | 40% | 56% |
| ... Other stuff (green)[^1] → [[Ancient Stirrings]]     | 13% | 42% | 64% |
| ... Other stuff (green) → [[Once Upon a Time]]          | 14% | 45% | 67% |

<p class="table-caption">Odds to get a [[Griselbrand]] on the table each turn. Values are cumulative, so "≤T3" is the odds to do so on turn three or earlier. All values ±2%.</p>

[^1]: "Other stuff" refers to anything not on the critical path to accomplishing the model's goal. For example, the goal of the Valakut model is to get [[Primeval Titan]] on the table. Cards like [[Lightning Bolt]] and [[Obstinate Baloth]] don't help with that. As far as the computer is concerned, they're blanks.

Calculations are made using the list below:

> 4 [[Allosaurus Rider]]<br>
> 4 [[Chancellor of the Tangle]]<br>
> 4 [[Eldritch Evolution]]<br>
> 4 [[Manamorphose]]<br>
> 4 [[Neoform]]<br>
> 4 [[Serum Visions]]<br>
> 4 [[Simian Spirit Guide]]<br>
> 4 [[Summoner's Pact]]<br>
> 1 [[Wild Cantor]]<br>
> 9 [[Autochthon Wurm:Other]] [[Nourishing Shoal:stuff]] [[Life Goes On:(green)]]<br>
> 4 [[Griselbrand:Other]] [[Pact of Negation:stuff]] [[Laboratory Maniac:(nongreen)]]<br>
> 14 [[Gemstone Mine:Multi]] [[Waterlogged Grove:color]] [[Botanical Sanctum:lands]]<br>

Judging from the numbers above, I suspect the concern is overblown. Neobrand doesn't play [[Ancient Stirrings]], and [[Once Upon a Time:OUAT]] isn't much different. Both are green cards (for [[Allosaurus Rider]]) that usually find the next land drop. The free part of [[Once Upon a Time:OUAT]] is wasted on Neobrand because the deck doesn't make efficient use of its mana -- it basically does nothing until it wins.

[[Once Upon a Time:OUAT]] isn't *bad* in Neobrand, but it isn't a game changer. It doesn't significantly boost odds of a turn-one [[Griselbrand]], and after that it's on par with [[Serum Visions]]. And it's not clear the deck has room for more cantrips. Playing [[Once Upon a Time:OUAT]] on top of [[Serum Visions]] increases the odds of getting [[Griselbrand]] on the table by turn three, but cutting "[[Life Goes On:other]] [[Pact of Negation:stuff]]" to make room increases the risk of imploding[^2] mid-combo.

[^2]: Once [[Griselbrand]] is on the table, the plan is to gain a bunch of life, draw our whole deck, and win with [[Laboratory Maniac]]. If we don't draw [[Nourishing Shoal:lifegain]] [[Life Goes On:spells]] fast enough, we can run out of steam.


## Tron

In terms of assembling [[Urza's Mine:Ur]][[Urza's Power Plant:za]][[Urza's Tower:tron]], [[Once Upon a Time]] outperforms[^3] both [[Ancient Stirrings]] and [[Sylvan Scrying]]. It's tough to imagine cutting [[Ancient Stirrings]] -- it finds [[Relic of Progenitus:much]] [[Karn Liberated:more]] [[Oblivion Stone:than]] [[Ugin, the Spirit Dragon:lands]] -- but swapping out [[Sylvan Scrying]] for [[Once Upon a Time:OUAT]] would give the deck a boost:

[^3]: The model works by exhaustive search, which essentially means it has superhuman "instincts" about the order of the deck. To suppress non-human play patterns, choices between Urza lands are made alphabetically. If it's already got [[Urza's Tower:Tower]], it'll always take [[Urza's Mine:Mine]] over [[Urza's Power Plant:Power Plant]] -- even if it "knows" the card it's about to draw is another [[Urza's Mine:Mine]].

|                                                  |  T3 | ≤T4 |
|:-------------------------------------------------|:---:|:---:|
| [Tron]                                           | 16% | 53% |
| ... [[Ancient Stirrings]] → [[Once Upon a Time]] | 18% | 57% |
| ... [[Sylvan Scrying]] → [[Once Upon a Time]]    | 21% | 60% |
| ... Other stuff → [[Once Upon a Time]]           | 22% | 66% |

<p class="table-caption">Odds to have Tron by each turn. Values are cumulative, so "≤T4" is the odds to do so on turn four or earlier. All values ±2%.</p>

[Tron]: https://www.mtggoldfish.com/archetype/modern-tron-46482#paper

Calculations are made using the list below:

> 4 [[Ancient Stirrings]]<br>
> 8 [[Chromatic Sphere]]/[[Chromatic Star:Star]]<br>
> 4 [[Expedition Map]]<br>
> 4 [[Sylvan Scrying]]<br>
> 21 Other stuff<br>
> 3 [[Blast Zone:Colorless]] [[Ghost Quarter:lands]]<br>
> 4 [[Forest]]<br>
> 4 [[Urza's Mine]]<br>
> 4 [[Urza's Power Plant]]<br>
> 4 [[Urza's Tower]]<br>

It may seem strange that [[Once Upon a Time]] (which looks at five cards) performs better than [[Sylvan Scrying]] (which looks at the whole deck). It comes down to mana cost. Tron can afford to cast [[Expedition Map:Map]] *or* [[Sylvan Scrying:Scrying]] by turn two, but not both. With [[Once Upon a Time:OUAT]], it's possible to cast multiple (non-[[Chromatic Star:egg]]) spells in search of turn-three Tron. That gives the deck a decent shot to assemble turn-three Tron even if there's only a single land in its opening hand. On top of that, [[Once Upon a Time:OUAT]] adds value later on by increasing access to creatures like [[Ulamog, the Ceaseless Hunger:Ulamog]], [[Walking Ballista]], and [[Wurmcoil Engine]]. I suspect it'll become a standard inclusion in Tron lists.


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

Calculations are made using the list below, which plays a bunch of extra [[Windswept Heath:fetch lands]] instead of [worrying](/valakut-simulation/) about [[Cinder Glade]] and/or [[Sheltered Thicket]]:

> 4 [[Explore]]<br>
> 4 [[Primeval Titan]]<br>
> 4 [[Sakura-Tribe Elder]]<br>
> 4 [[Search for Tomorrow]]<br>
> 4 [[Simian Spirit Guide]]<br>
> 4 [[Summoner's Pact]]<br>
> 4 [[Through the Breach]]<br>
> 7 Other stuff<br>
> 7 [[Mountain]]<br>
> 14 [[Forest:Untapped]] [[Stomping Ground:green]] [[Wooded Foothills:land]]<br>
> 4 [[Valakut, the Molten Pinnacle]]<br>

Before playing Titan Breach at the Pro Tour, I ran the numbers on dozens of different builds: cantrips, rituals, [[Hour of Promise:you]] [[Shefet Monitor:name]] [[Manamorphose:it]]. [[Once Upon a Time:OUAT]] is in a league of its own. It gives almost as much velocity as [[Desperate Ritual]]. But instead of turning the deck into a glass cannon, it adds resiliency. [[Once Upon a Time]] makes the deck goldfish faster while also increasing access to high-impact sideboard cards and finishers in the face of disruption. Titan Breach has been waiting years for a card like this.


## Amulet Titan

[[Ancient Stirrings]] is pretty good at finding a missing [[Amulet of Vigor]] or [[Simic Growth Chamber]] to pull together a turn-three [[Primeval Titan]]. [[Once Upon a Time]] can't find [[Amulet of Vigor:Amulet]], but it *can* find [[Azusa, Lost but Seeking:Azusa]], [[Arboreal Grazer:Grazer]], [[Primeval Titan:Titan]], and even a first [[Gemstone Mine:non-bounce land]]. And it does so for free. In the first few turns of the game, [[Once Upon a Time:OUAT]] slightly outperforms [[Ancient Stirrings]] at getting [[Primeval Titan:Prime Time]] on the table. Other cantrips like [[Explore]] and [[Oath of Nissa]] aren't even close.

[Amulet Titan]: https://www.mtggoldfish.com/archetype/modern-amulet-titan-88330#paper

|                                                  |  T2 | ≤T3 | ≤T4 |
|:-------------------------------------------------|:---:|:---:|:---:|
| [Amulet Titan]                                   |  3% | 25% | 57% |
| ... [[Ancient Stirrings]] → [[Once Upon a Time]] |  5% | 30% | 63% |
| ... Other stuff → [[Explore]]                    |  5% | 32% | 65% |
| ... Other stuff → [[Oath of Nissa]]              |  4% | 30% | 65% |
| ... Other stuff → [[Once Upon a Time]]           |  6% | 38% | 72% |
| ... Other stuff → [[Summer Bloom]]               | 13% | 39% | 66% |

<p class="table-caption">Odds to get [[Primeval Titan]] on the table by each turn. Values are cumulative, so "≤T4" is the odds to do so on turn four or earlier. All values ±2%.</p>

Calculations are made using the (simplified) list below. Swapping [[Kabira Crossroads]] for [[Radiant Fountain]], or [[Sakura-Tribe Scout]] for [[Arboreal Grazer:Grazer]], doesn't change the big picture.

> 4 [[Amulet of Vigor]]<br>
> 4 [[Ancient Stirrings]]<br>
> 4 [[Arboreal Grazer]]<br>
> 4 [[Azusa, Lost but Seeking]]<br>
> 4 [[Primeval Titan]]<br>
> 4 [[Summoner's Pact]]<br>
> 8 Other stuff<br>
> 4 [[Gemstone Mine]]<br>
> 4 [[Selesnya Sanctuary]]<br>
> 4 [[Simic Growth Chamber]]<br>
> 4 [[Field of the Dead:Tapped]] [[Bojuka Bog:colorless]] [[Kabira Crossroads:land]]<br>
> 4 [[Tolaria West]]<br>
> 4 [[Radiant Fountain:Untapped]] [[Slayers' Stronghold:colorless]] [[Cavern of Souls:land]]<br>
> 4 [[Forest:Untapped]] [[Snow-Covered Forest:green]] [[Okina, Temple to the Grandfathers:land]]<br>

Lists today can't reliably produce a turn-three [[Primeval Titan]], so they play cards like [[Karn, the Great Creator:Karn]] or [[Golos, Tireless Pilgrim:Golos]] or [[Trinket Mage]] to hold down the fort until turn four. But with [[Once Upon a Time:OUAT]] and sensible [mulligans](https://magic.wizards.com/en/articles/archive/news/london-mulligan-2019-06-03), it's reasonable to expect turn-three [[Primeval Titan:Titan]] more often than not. The last time Amulet put up numbers like this, [[Summer Bloom]] got [banned](https://magic.wizards.com/en/articles/archive/news/january-18-2016-banned-and-restricted-announcement-2016-01-18).


## Happily Ever After?

[[Once Upon a Time]] is great in Tron, since mana is a bottleneck to assembling its lands quickly. It's even better in Amulet Titan and Titan Breach, where it finds lands and accelerators as well as [[Primeval Titan]]. It doesn't particularly fit in Neobrand, but it's so efficient that it might see play anyway. And that's just the start. [[Once Upon a Time:OUAT]] is a powerful enabler for any strategy that depends on seeing certain creatures or lands in the first few turns of the game: [[Devoted Druid]], [[Eldrazi Temple]], [[Glistener Elf]], [[Slippery Bogle]], and so on.

Decks built around creatures and lands are ostensibly more "fair" than those using graveyards and the stack, but the decks that want [[Once Upon a Time]] aren't looking to play fair. I would not be surprised to see this card push something over the line.
