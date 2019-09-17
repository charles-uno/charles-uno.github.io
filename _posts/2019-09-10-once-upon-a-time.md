---
layout: post
title: "Once Upon a (Prime) Time"
image: "/assets/images/thumb/once-upon-a-time-matt-stewart.png"
description: "Play it while you can"
tags: games stem
---

*Editor's note: this article has been updated to correct a mistake in the Neobrand numbers.*

When Mark Rosewater [previewed](https://magic.wizards.com/en/articles/archive/making-magic/eldraine-or-shine-2019-09-09) [[Once Upon a Time]], eyebrows went up. Free spells and efficient card selection both have a history of ending up on the Modern [banned list](https://magic.wizards.com/en/game-info/gameplay/rules-and-formats/banned-restricted). In particular, [[Once Upon a Time]] bears a striking resemblance to [[Ancient Stirrings]] -- a card [living on borrowed time](https://magic.wizards.com/en/articles/archive/news/january-21-2019-banned-and-restricted-announcement).

<div class="flex-across">
<img class="half" src="/assets/images/ancient-stirrings.png">
<img class="half" src="/assets/images/once-upon-a-time.png">
</div>

Since then, I've run tens of thousands of simulations to put the hype to the test. My code (written in Python) is available on [GitHub](https://github.com/charles-uno/amulet). You can also check out the human-readable explanation of how it works in my [Valakut article](http://charles.uno/valakut-simulation/#the-model). All values below apply to seven-card hands playing against a [goldfish](https://mtg.gamepedia.com/Goldfishing) -- no mulligans, no disruption.


## Neobrand

Perhaps the most obvious (and concerning) application of [[Once Upon a Time]] is [Neobrand], an all-in combo deck that can win on the first turn of the game. Losing to Neobrand is miserable, but luckily doesn't happen often. The deck's unreliability and vulnerability to disruption have kept it out of the main stream. [[Once Upon a Time:OUAT]] threatens to make Neobrand more consistent and resilient by improving its access to [[Allosaurus Rider]], [[Simian Spirit Guide]], and lands.

[Neobrand]: https://www.mtggoldfish.com/archetype/modern-neobrand#paper

> 4 [[Allosaurus Rider]]<br>
> 4 [[Chancellor of the Tangle]]<br>
> 4 [[Eldritch Evolution]]<br>
> 4 [[Manamorphose]]<br>
> 4 [[Neoform]]<br>
> 4 [[Serum Visions]]<br>
> 4 [[Simian Spirit Guide]]<br>
> 4 [[Summoner's Pact]]<br>
> 1 [[Wild Cantor]]<br>
> 13 Other stuff[^6]<br>
> 14 [[Botanical Sanctum:Multi]]-[[Breeding Pool:color]] [[Gemstone Mine:lands]]<br>

[^6]: "Other stuff" refers to anything not on the critical path to accomplishing the model's goal. For example, the goal of the Valakut model is to get [[Primeval Titan]] on the table. Cards like [[Lightning Bolt]] and [[Obstinate Baloth]] don't help with that. As far as the computer is concerned, they're blanks.

There are a few different ways we could make room for [[Once Upon a Time]] in the list above. One option is to swap out [[Serum Visions]]. [[Once Upon a Time:OUAT]] is marginally better on turn one, and after that the two cantrips put up comparable numbers (see below). [[Chancellor of the Tangle]] is another potential cut. If we're willing to give up the "gotcha" wins on the first turn, we can significantly increase the deck's odds to land [[Griselbrand]] by turn two, which still typially wins on the spot. Finally, it may be possible to cut some "other stuff" -- cards like [[Life Goes On]] and [[Pact of Negation]]. Cutting "other stuff" is the fastest way to get [[Griselbrand]] on the table, but also increases the risk of fizzling[^9] mid-combo.

[^9]: Once [[Griselbrand]] is on the table, the plan is to gain a bunch of life, draw our whole deck, and win with [[Laboratory Maniac]]. If there aren't enough [[Nourishing Shoal:lifegain]] [[Life Goes On:spells]] near the top of the deck, we can run out of steam.

|                                                         |  T1 | ≤T2 | ≤T3 |
|:--------------------------------------------------------|:---:|:---:|:---:|
| Neobrand                                                | 12% | 38% | 56% |
| ... [[Chancellor of the Tangle]] → [[Once Upon a Time]] |  3% | 44% | 67% |
| ... [[Serum Visions]] → [[Once Upon a Time]]            | 14% | 40% | 55% |
| ... Other stuff[^4] → [[Once Upon a Time]]              | 14% | 45% | 67% |

<p class="table-caption">Odds to get a [[Griselbrand]] on the table each turn. Values are cumulative, so "≤T3" is the odds to do so on turn three or earlier. All values ±2%.</p>

One way or another, the numbers above suggest that [[Once Upon a Time]] will make Neobrand more consistent -- but it'll still be Neobrand. The deck mulligans poorly, folds to disruption, and sometimes implodes halfway through its combo. Play at your own risk.


## Tron[^2]

[^2]: The model works by exhaustive search, which essentially means it has superhuman "instincts" about the order of the deck. To suppress non-human play patterns, choices between Urza lands are made alphabetically. If we already have [[Urza's Tower:Tower]], the model will always choose [[Urza's Mine:Mine]] over [[Urza's Power Plant:Power Plant]] -- even if it "knows" the card we're about to draw is another [[Urza's Mine:Mine]].

[Tron] spends its first two or three turns assembling "Urzatron" -- [[Uza's Mine]], [[Urza's Power Plant]], and [[Urza's Tower]] -- so it can spend the rest of the game using its mana advantage to cast outrageous things like [[Karn Liberated:Karn]] and [[Ulamog, the Ceaseless Hunger:Ulamog]]. [[Once Upon a Time]] fits perfectly with that game plan. The only question is whether or not it's good enough to replace any of Tron's existing tools.

[Tron]: https://www.mtggoldfish.com/archetype/modern-tron-46482#paper

> 4 [[Ancient Stirrings]]<br>
> 4 [[Chromatic Sphere]]<br>
> 4 [[Chromatic Star]]<br>
> 4 [[Expedition Map]]<br>
> 4 [[Sylvan Scrying]]<br>
> 21 Other stuff<br>
> 4 [[Forest]]<br>
> 4 [[Urza's Mine]]<br>
> 4 [[Urza's Power Plant]]<br>
> 4 [[Urza's Tower]]<br>
> 3 [[Ghost Quarter:Colorless]] [[Blast Zone:lands]]<br>

Judging from the numbers above, [[Once Upon a Time]] outperforms both [[Ancient Stirrings]] and [[Sylvan Scrying]]. We're not likely to ever cut [[Ancient Stirrings]] -- it finds more than just lands -- but swapping [[Sylvan Scrying]] for [[Once Upon a Time:OUAT]] makes the deck significantly more likely to have turn-three Tron.



|                                                  | T3   | ≤T4 |
|:-------------------------------------------------|:----:|:---:|
| Tron                                             | 16%  | 53% |
| ... [[Ancient Stirrings]] → [[Once Upon a Time]] | 18%  | 57% |
| ... [[Sylvan Scrying]] → [[Once Upon a Time]]    | 21%  | 60% |
| ... Other stuff → [[Once Upon a Time]]           | 22%  | 66% |

<p class="table-caption">Odds to have Tron by each turn. Values are cumulative, so "≤T4" is the odds to do so on turn four or earlier. All values ±2%.</p>






It may seem strange that [[Once Upon a Time]] (which looks at five cards) performs better than [[Sylvan Scrying]] (which looks at the whole deck). It all comes down to cost. If we cast [[Chromatic Star]] on turn one into [[Sylvan Scrying]] on turn two, we have no mana left over for anything else. But if we start with [[Once Upon a Time]], we can *also* cast [[Expedition Map]], or [[Chromatic Sphere]] into [[Ancient Stirrings]]. That gives us a decent shot to assemble turn-three Tron even if there's only a single land in our opening hand.

[[Once Upon a Time]] lets Tron mulligan a bit less often and assemble Tron a bit more consistently compared to [[Sylvan Scrying]]. On top of that, it adds value later on by increasing access to creatures like [[Ulamog, the Ceaseless Hunger:Ulamog]], [[Walking Ballista]], and [[Wurmcoil Engine]]. I suspect it'll become a standard inclusion in Tron lists.


## Valakut





> 4 [[Explore]]<br>
> 4 [[Primeval Titan]]<br>
> 4 [[Sakura-Tribe Elder]]<br>
> 4 [[Search for Tomorrow]]<br>
> 4 [[Simian Spirit Guide]]<br>
> 4 [[Summoner's Pact]]<br>
> 4 [[Through the Breach]]<br>
> 7 Other stuff<br>
> 7 [[Mountain]]<br>
> 14 [[Forest:Untapped]] [[Wooded Foothills:green]] [[Stomping Ground:lands]]<br>
> 4 [[Valakut, the Molten Pinnacle]]<br>




[Titan Shift](https://www.mtggoldfish.com/archetype/modern-titanshift-96185#paper) decks may well use [[Once Upon a Time]], but they can't exactly *abuse* it. The deck still has no way to win before turn four. Builds with [[Through the Breach]] are another story. Titan Breach decks are the ones that shave on lands, play only eight [[Primeval Titan:win]] [[Summoner's Pact:conditions]], and -- most importantly -- steal games with the help of a [[Simian Spirit Guide]] or two. [[Oath of Nissa]] saw play in [past builds](http://www.starcitygames.com/events/coverage/rg_valakut_with_matthias_hunt.html) of Titan Breach, and [[Once Upon a Time]] is twice as good:

|                                        | T3  | ≤T4 |
|:---------------------------------------|:---:|:---:|
| Titan Breach                           | 15% | 59% |
| ... Other stuff → [[Desperate Ritual]] | 35% | 70% |
| ... Other stuff → [[Oath of Nissa]]    | 22% | 73% |
| ... Other stuff → [[Once Upon a Time]] | 29% | 77% |

<p class="table-caption">Odds to get [[Primeval Titan]] on the table by each turn. Values are cumulative, so "≤T4" is the odds to do so on turn four or earlier. All values ±2%.</p>

[Titan Breach]: http://charles.uno/valakut-simulation/#breach-for-the-stars

I've run the numbers on dozens of different builds of Titan Breach, with every different combination of rituals and cantrips imaginable. [[Once Upon a Time]] is in a league of its own. It gives almost as much velocity as [[Desperate Ritual]]. But instead of making the deck a glass cannon, it adds resiliency. [[Once Upon a Time]] makes the deck goldfish faster while also increasing access to high-impact sideboard cards and finishers in the face of disruption. Titan Breach has been waiting years for a card like this.


## Amulet Titan





> 4 [[Amulet of Vigor]]<br>
> 4 [[Ancient Stirrings]]<br>
> 4 [[Arboreal Grazer]]<br>
> 4 [[Azusa, Lost but Seeking]]<br>
> 4 [[Primeval Titan]]<br>
> 4 [[Summoner's Pact]]<br>
> 8 Other stuff<br>
> 1 [[Boros Garrison]]<br>
> 3 [[Forest]]<br>
> 4 [[Gemstone Mine]]<br>
> 1 [[Khalni Garden]]<br>
> 4 [[Selesnya Sanctuary]]<br>
> 4 [[Simic Growth Chamber]]<br>
> 2 [[Bojuka Bog:Tapped]] [[Vesuva:nongreen lands]]<br>
> 4 [[Tolaria West]]<br>
> 5 [[Ghost Quarter:Untapped]] [[Slayers' Stronghold:colorless]] [[Sunhome, Fortress of the Legion:lands]]<br>


[Amulet Titan] has been waiting too.

|                                                  | T2  | ≤T3 | ≤T4 |
|:-------------------------------------------------|:---:|:---:|:---:|
| Amulet Titan                                     |  3% | 27% | 60% |
| ... [[Ancient Stirrings]] → [[Once Upon a Time]] |  5% | 30% | 64% |
| ... Other stuff → [[Explore]]                    |  6% | 34% | 67% |
| ... Other stuff → [[Once Upon a Time]]           |  7% | 39% | 75% |
| ... Other stuff → [[Summer Bloom]]               | 14% | 41% | 69% |

<p class="table-caption">Odds to get [[Primeval Titan]] on the table by each turn. Values are cumulative, so "≤T4" is the odds to do so on turn four or earlier. All values ±2%.</p>

[Amulet Titan]: https://www.mtggoldfish.com/archetype/modern-amulet-titan-88330#paper

Amulet Titan is a land-based toolbox deck that sometimes uses [[Amulet of Vigor]] and [[Simic Growth Chamber:bounce lands]] to do silly things like play turn-two [[Primeval Titan]]. [[Ancient Stirrings]] is phenomenal in the deck. [[Once Upon a Time]] is even better[^3]. With access to both, the numbers get a bit concerning. In the first few turns of the game, [[Once Upon a Time]] is squarely better than [[Explore]] (which is playable) and not that far from [[Summer Bloom]] (which is banned).

[^3]: Here we're talking about goldfishing specifically. In a broader sense, [[Once Upon a Time]] versus [[Ancient Stirrings]] depends on how much you care about finding [[Engineered Explosives]] versus [[Azusa, Lost but Seeking:Azusa]], how much instant speed matters, and so on.


## Happily Ever After?

[[Once Upon a Time]] is great in Tron and Amulet Titan -- comparable in power level to [[Ancient Stirrings]]. It's bonkers in Titan Breach, where it finds both [[Simian Spirit Guide]] and [[Primeval Titan]]. And that's just the start. This card is a powerful enabler for any strategy that depends on seeing certain creatures or lands in the first few turns of the game: [[Devoted Druid]], [[Eldrazi Temple]], [[Glistener Elf]], [[Slippery Bogle]], and so on.

Decks built around creatures and lands are ostensibly more "fair" than those using graveyards and the stack, but the decks that want [[Once Upon a Time]] aren't looking to play fair. I would not be surprised to see this card push something over the line and get banned.
