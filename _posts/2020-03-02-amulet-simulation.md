---
layout: post
title: "Deck Chairs on the Titanic"
image: "/files/amulet-simulation/pt-rix-thumb.png"
description: Using better-than-perfect sequencing to cast Primeval Titan
tags: games code math
---

WOTC printed [[Scapeshift]] in 2008, [[Valakut, the Molten Pinnacle:Valakut]] in 2009, and [[Primeval Titan]] in 2010. For eight years after that, they walked on eggshells to avoid further enabling land-based combo decks in Modern. As recently as 2018, fifty-six of the sixty cards in an [Amulet Titan main deck](https://www.channelfireball.com/all-strategy/articles/how-to-play-modern-amulet-titan-2nd-place-at-grand-prix-hartford/) were printed before the existence of Instagram[^1]. Design philosophy [finally changed](https://magic.wizards.com/en/articles/archive/feature/play-design-lessons-learned-2019-11-18) about a year ago, and WOTC seems to be making up for lost time. After eight years of drought, we got [[Arboreal Grazer]], [[Castle Garenbrig]], [[Dryad of the Ilysian Grove]], [[Field of the Dead]], and [[Once Upon a Time]] all in the space of eight months.

[^1]: Instagram was launched in October 2010. Cards most commonly played alongside [[Primeval Titan]] in Modern include [[Azusa, Lost but Seeking:Azusa]] (first printed in 2004), [[Sakura-Tribe Elder]] (2004), [[Farseek]] (2005), [[Simic Growth Chamber]] (2006), [[Search for Tomorrow]] (2006), [[Summoner's Pact]] (2007), [[Tolaria West]] (2007), [[Vesuva]] (2007), [[Prismatic Omen]] (2008), [[Explore]] (2009), [[Oracle of Mul Daya]] (2009), [[Valakut, the Molten Pinnacle:Valakut]] (2009), [[Amulet of Vigor]] (February 2010), and [[Ancient Stirrings]] (April 2010).

One new card is exciting. Two is even better. But four new cards ([plus a ban](https://magic.wizards.com/en/articles/archive/news/march-9-2020-banned-and-restricted-announcement)) can be overwhelming, especially for a synergy-driven deck like Amulet Titan. [[Field of the Dead:FOTD]] wants us to have more lands on the table, but half the point of bounce lands is that we can get to six mana with *fewer* lands. [[Castle Garenbrig]] works best when we play [[Breeding Pool]] over [[Gemstone Mine]], but that makes it harder to splash off-color sideboard cards. [[Dryad of the Ilysian Grove:Dryad]] took the place of colorless tools like [[Walking Ballista]], but without those tools it's not clear if [[Ancient Stirrings]] is worthwhile. Finding a balance between so many competing incentives takes hours upon hours of playtesting -- more time than we have to spare!

## The Model

That's where the computer comes in. My numerical model[^2] can read in a deck list, [goldfish](https://mtg.gamepedia.com/Goldfishing) thousands of games, and tell us exactly how reliably that list can expect to cast [[Primeval Titan]] by turn three. Using the model, it's possible to compare competing cards one-on-one (like [[Arboreal Grazer]] and [[Sakura-Tribe Scout]]) as well as measure the effect of card combinations that are more than the sum of their parts, like [[Castle Garenbrig]] and [[Dryad of the Ilysian Grove]][^5].

[^2]: The code (written in Python) is available on GitHub [here](https://github.com/charles-uno/mtg-model). Pull requests welcome!

[^5]: In the face of removal, [[Dryad of the Ilysian Grove]] only jumps us from three mana to five. [[Castle Garenbrig]] bridges the gap from five to six for [[Primeval Titan]]. [[Dryad of the Ilysian Grove:Dryad]] also makes all our lands Forests to ensure that [[Castle Garenbrig:Castle]] enters untapped.

The model doesn't know anything about sequencing or strategy. Instead, it tries all possible combinations of legal plays. For example, let's say we cast [[Ancient Stirrings]] and see [[Amulet of Vigor]], [[Forest]], [[Simic Growth Chamber]], and two other spells. An experienced player can generally eyeball the correct choice, but spelling out the decision explicitly for the computer is tedious and error-prone -- a calculation based on what's in our hand, what turn it is, and so on. Instead of all that, the model just makes three copies of the game. The first copy takes [[Amulet of Vigor]], the second takes [[Forest]], and the third takes [[Simic Growth Chamber]], then they each proceed independently from there. If any copy finds a line to get [[Primeval Titan]] on the table by turn three, it's pretty safe to say a human player could have done the same. This approach is computationally intensive, but also straightforward and reliable.

![Example Output](/files/amulet-simulation/mtg-model-amulet-t3.png)
<span class="figure-caption">Above is example output from the model. It knows how to track multiple colors of mana, transmute [[Tolaria West]], and use both mana abilities on [[Castle Garenbrig]].</span>

The downside of brute force is that the computer essentially has superhuman "instincts" about the order of the deck. When a human player casts [[Ancient Stirrings]], they have to commit to a choice without knowing what their next card will be. The computer tries all options and keeps whichever works out best. Several corrections[^3] are included in the model to suppress non-human play patterns, but even so, numbers generated by the model include a percent-level bias in favor of five-card cantrips like [[Ancient Stirrings]], and a smaller bias in favor of the three-card [[Oath of Nissa]].

[^3]: To suppress non-human play patterns, the order of the deck is locked in as soon as the game begins. There are no mulligans. And any time the computer would search its deck for a card, instead it leaves the deck as-is and creates a new copy of that card out of thin air. This means no deck thinning, which introduces a small uncertainty (well under 1%).

## Open Questions

For the sake of brevity, we're not getting into the numbers for [[Castle Garenbrig]] or [[Dryad of the Ilysian Grove]], both of which have seen near-universal[^4] adoption. Instead, we're looking at three questions that (according to [decklist aggregators](https://www.mtggoldfish.com/metagame/modern#paper)) remain unresolved:

[^4]: For a rundown of how recent cards shook up Amulet Titan, check out [this piece](http://magic.facetofacegames.com/how-theros-broke-amulet-titan/) by Daryl Ayers.

- [[Arboreal Grazer]] vs [[Sakura-Tribe Scout]]. [[Arboreal Grazer:Grazer]] ramps immediately, typically setting up three mana on turn two. On the other hand, [[Sakura-Tribe Scout:Scout]] can be activated multiple times. Which card makes us more likely to cast [[Primeval Titan]] by turn three?
- [[Azusa, Lost but Seeking:Azusa]] vs [[Explore]]. We'd like to play one more ramp spell in addition to our one-drop creature and [[Dryad of the Ilysian Grove]]. [[Azusa, Lost but Seeking:Azusa]] ramps us from three mana to six all on her own. [[Explore]] is cheaper and draws a card, which helps us chain multiple ramp spells together on turn two.
- [[Ancient Stirrings]] vs [[Oath of Nissa]]. [[Ancient Stirrings]] was the cantrip of choice a year ago, but now [[Dryad of the Ilysian Grove:Dryad]] has displaced colorless spells like [[Walking Ballista]]. Which cantrip lines up best with the deck as it exists today? Calculations are repeated with [[Once Upon a Time:OUAT]] as well for comparison.

Simulations make use of the list below. The letter `X` represents [[Arboreal Grazer]] or [[Sakura-Tribe Scout]], `Y` is [[Azusa, Lost but Seeking:Azusa]] or [[Explore]], and `Z` is [[Ancient Stirrings]], [[Oath of Nissa]], or [[Once Upon a Time:OUAT]]. Put another way, we're looking at all possible combinations of a one-drop ramp creature, an additional ramp spell, and a cantrip.

|   | Amulet Titan (March 2020) |
|--:|:--------------------------|
| 4 | X                         |
| 4 | Y                         |
| 4 | Z                         |
| 4 | [[Amulet of Vigor]]       |
| 4 | [[Dryad of the Ilysian Grove]] |
| 4 | [[Primeval Titan]]        |
| 4 | [[Summoner's Pact]]       |
| 2 | [[Pact of Negation:Other]] [[Engineered Explosives:Stuff]] |
| 4 | [[Castle Garenbrig]]      |
| 4 | [[Misty Rainforest:Fetches]] and [[Breeding Pool:Shocks]] |
| 4 | [[Forest:Basic]] [[Snow-Covered Forest:Forests]] |
| 3 | [[Selesnya Sanctuary:Off-Color]] [[Golgari Rot Farm:Bounce]] [[Gruul Turf:Lands]] |
| 5 | [[Bojuka Bog:Off-Color]] [[Field of the Dead:Tapped]] [[Valakut, the Molten Pinnacle:Lands]] |
| 4 | [[Ghost Quarter:Off-Color]] [[Radiant Fountain:Untapped]] [[Hanweir Battlements:Lands]] |
| 4 | [[Simic Growth Chamber]]  |
| 2 | [[Tolaria West]]          |

<p class="figure-nocaption">Note that the above list does not include [[Cavern of Souls]] or [[Vesuva]] due to computational complexity. We're also not accounting for small variations between deck lists. Some people play [[Boros Garrison]], [[Crumbling Vestige]], a third [[Tolaria West]], and so on. Wiggle room in the mana base introduces a potential percent-level bias across the board, but should not affect our ability to make relative comparisons.</p>

## Crunching the Numbers

A year ago, we might have looked at the odds of casting [[Primeval Titan]] by turn four. Recent additions have improved the deck's speed and consistency to a point where that's no longer interesting. The table below focuses on turn three. Turn two, rarely seen since [ancient times](https://magic.wizards.com/en/articles/archive/news/january-18-2016-banned-and-restricted-announcement-2016-01-18), is again within reach as well.

| X      | Y       | Z         | Turn 2 | Turn 3 | Turn 3 vs Removal |
|:-------|:--------|:----------|:------:|:------:|:-----------------:|
| Grazer | Azusa   | Oath      | 3%     | 26%    | 25%               |
| Grazer | Azusa   | Stirrings | 3%     | 30%    | 29%               |
| Grazer | Azusa   | OUAT      | 4%     | 34%    | 32%               |
| Grazer | Explore | Oath      | 3%     | 29%    | 27%               |
| Grazer | Explore | Stirrings | 4%     | 33%    | 30%               |
| Grazer | Explore | OUAT      | 4%     | 38%    | 32%               |
| Scout  | Azusa   | Oath      | 1%     | 20%    | 15%               |
| Scout  | Azusa   | Stirrings | 2%     | 24%    | 19%               |
| Scout  | Azusa   | OUAT      | 2%     | 35%    | 18%               |
| Scout  | Explore | Oath      | 1%     | 18%    | 13%               |
| Scout  | Explore | Stirrings | 1%     | 22%    | 15%               |
| Scout  | Explore | OUAT      | 2%     | 36%    | 15%               |

<span class="figure-caption">Statistical uncertainty ±1%. The difference between 25% and 26% is not significant, and the difference between 25% and 27% toes the line.</span>

Above, columns `X`, `Y`, and `Z` show the different configurations of the deck, per the previous section. For each configuration, the value under `Turn 2` is the percent of seven-card hands that can cast [[Primeval Titan]] on turn two. Similarly, the `Turn 3` column shows the percent of seven-card hands that can cast [[Primeval Titan]] by turn three. Values for `Turn 2` and `Turn 3` assume a non-interactive opponent. The final column, `Turn 3 vs Removal`, assumes the opposite. For that case, the calculation is repeated assuming our opponent *always* has removal for our creatures, so we never get to untap with [[Azusa, Lost but Seeking:Azusa]], [[Dryad of the Ilysian Grove:Dryad]], or [[Sakura-Tribe Scout:Scout]]. This is particularly relevant when considering [[Dryad of the Ilysian Grove:Dryad]] as a potential replacement for [[Azusa, Lost but Seeeking:Azusa]]. [[Azusa, Lost but Seeking:Azusa]] ramps us from three mana to six on her own, even in the face of removal. [[Dryad of the Ilysian Grove:Dryad]] only gets us to five.

## Conclusions and Caveats

[[Sakura-Tribe Scout]] may be the biggest loser from the [[Once Upon a Time:OUAT]] ban. The card is great on turn one but a pretty bad topdeck on turn two or three. [[Arboreal Grazer]] is similarly great on turn one -- plus it nets mana immediately on later turns in combination with [[Amulet of Vigor:Amulet]] and a [[Gruul Turf:bounce land]]. [[Castle Garenbrig:Castle]] and [[Dryad of the Ilysian Grove:Dryad]] are bad for [[Sakura-Tribe Scout:Scout]]'s stock as well. The deck plays a lot more acceleration that it did a year ago, which means it's less important to get multiple extra land drops out of a single card. Speed isn't everything[^8] -- but if speed is what we're after, [[Arboreal Grazer]] is our best one-drop. It comes out ahead of [[Sakura-Tribe Scout]] even against a non-interactive opponent. Throw a few [[Lava Dart:Lava Darts]] into the mix and it's not close.

[^8]: [[Sakura-Tribe Scout]]'s ability can be activated at instant speed, which is a big deal in some matchups. It can deploy [[Bojuka Bog]] in response to [[Past in Flames]], or a bounce land to defend against land destruction.

Cantrips look straightforward as well. [[Ancient Stirrings]] outperforms [[Oath of Nissa]] across the board, but the difference isn't huge. [[Ancient Stirrings:Stirrings]] is closer to [[Oath of Nissa:Oath]] than it is to [[Once Upon a Time:OUAT]], especially after we consider the model's superhuman "instincts" about the order of the deck. If our sideboard is packed with [[Ashiok, Dream Render:planeswalkers]] and [[Collector Ouphe:creatures]] (rather than [[Grafdigger's Cage:colorless]] [[Engineered Explosives:spells]]) then we could perhaps justify playing [[Oath of Nissa]] over [[Ancient Stirrings]].

Last up is [[Azusa, Lost but Seeking:Azusa]] versus [[Explore]], and it's not looking great for our favorite Monk. In the first few turns of the game, she's about on par with [[Explore]]. If the game goes long, we'd much rather draw a card with [[Explore]] as opposed to paying three mana for a [[Squire]]. Like [[Sakura-Tribe Scout:Scout]], [[Azusa, Lost but Seeking:Azusa]]'s selling point is that she provides multiple extra land drops on her own. That's exactly what we wanted a year ago, but in combination with [[Castle Garenbrig:Castle]] and [[Dryad of the Ilysian Grove:Dryad]], it's overkill.

Before the slew of new cards, about 25% of seven-card Amulet Titan hands could cast [[Primeval Titan]] by turn three. Lists often played [[Karn, the Great Creator:Karn]] or [[Trinket Mage]] to hold down the fort until turn four. With [[Once Upon a Time:OUAT]], that number was closer to 40% -- after factoring in mulligans, players could expect to cast [[Primeval Titan]] by turn three more often than not. Now we're somewhere in the middle. We'll see if the deck continues to be all-in on turn three, or if it falls back on secondary threats. And, more importantly, we'll see if WOTC continues to print new cards to boost the deck's speed and consistency.

<!--

Let's start easy: [[Castle Garenbrig]] is a slam dunk. By cutting untapped lands and bounce lands, we know we're hurting our chances of casting [[Primeval Titan]] on turn two. It turns out the damage is minimal. And on turn three, [[Castle Garenbrig:Castle]] gives a significant boost. Playing fewer bounce lands also makes the deck less vulnerable to [[Assassin's Trophy]], [[Damping Sphere]], and [[Field of Ruin]]. Even at the loss of off-color mana for sideboard cards, it's hard to imagine leaving [[Castle Garenbrig]] at home.

Our last comparison is [[Azusa, Lost but Seeking:Azusa]] versus [[Explore]], and it's not looking good for our favorite Monk. [[Azusa, Lost but Seeking:Azusa]]'s selling point is explosive acceleration in the first few turns of the game. But, unless we're playing [[Sakura-Tribe Scout]] against a stack of [[Lightning Bolt:Lightning Bolts]], [[Azusa, Lost but Seeking:Azusa]] goldfishes no better than [[Explore]]. And in a long game, drawing a card with [[Explore]] is much better than paying three mana for a [[Squire]].

The lackluster performances by [[Azusa, Lost but Seeking:Azusa]] and [[Sakura-Tribe Scout]] are initially surprising, but make sense once we consider the bigger picture. Both cards can deliver turn-four [[Primeval Titan]] on their own, or turn three with an [[Amulet of Vigor:Amulet]]. A year ago, that's exactly what we wanted -- but games of Amulet Titan look a bit different now. Without [[Ancient Stirrings]], we're significantly less likely to see [[Amulet of Vigor]]. Between [[Castle Garenbrig]] and [[Once Upon a Time]], we're also significantly more likely to see multiple pieces of acceleration in the first few turns of the game. That means we're less reliant on getting multiple extra lands from a single spell, and more interested in cards that ramp us faster, cheaper, and at a lower opportunity cost. Put another way, getting a bunch of new cards in the past few sets fundamentally changed the math of Amulet Titan. Don't be surprised if the next few sets change it even more.

> Our most explosive draws involve an untapped land on turn one, followed by a bounce land. Are we really coming out ahead if we cut untapped lands and bounce lands to make room for [[Castle Garenbrig:Castle]]?

> few lists play [[Karn, the Great Creator:colorless]] [[Walking Ballista:tools]] to access with [[Ancient Stirrings]].

> [[Dryad of the Ilysian Grove:Dryad]] and [[Castle Garenbrig:Castle]] aren't enough on their own, but what compliments them best?



[[Azusa, Lost but Seeking:Azusa]]'s lackluster performance is initially surprising, but makes sense once we consider the bigger picture. Her job is to jump us from three mana to six, even in the face of removal, and even if we have no other acceleration. A year ago, that's exactly what we wanted. But in combination with [[Castle Garenbrig]] and [[Once Upon a Time]], it's overkill. Amulet Titan today plays more acceleration than ever before, plus a free cantrip to reliably access it.

Turn-one [[Sakura-Tribe Scout:Scout]] delivers turn-four [[Primeval Titan]] on her own, or turn three with an [[Amulet of Vigor:Amulet]]. [[Azusa, Lost but Seeking:Azusa]] jumps us from three mana to six, even in the face of removal. Meanwhile [[Arboreal Grazer]] and [[Explore]] only deliver one extra land each.

Grazer can give us three mana on turn two. Can also net mana on the turn it's cast when combined with Amulet and a bounce land.

---

The model knows how to transmute [[Tolaria West]], as well as how to play it as a land. It knows how to float mana and stack triggers when it has [[Simic Growth Chamber]] and multiple [[Amulet of Vigor:Amulets]]. It even knows how to [[Summoner's Pact:Pact]] for [[Azusa, Lost but Seeking:Azusa]] on turn two, play its extra lands, then pay for the [[Summoner's Pact:Pact]] on turn three. Basically, it can figure out the same line a human player would, but faster. My laptop can simulate a game in a few seconds. Running overnight, it can simulate thousands.

https://www.w3schools.com/howto/howto_js_sort_table.asp

Other than power level concerns, these changes are good! Get some of the weird stuff out of there. Shorten turns. Less mana floating, less shuffling, fewer extra land drops to keep track of. Feels more direct, less masturbatory

[Titan Shift 2018](https://www.mtgtop8.com/archetype?a=348&f=MO&meta=163)
[pre-ban Amulet Bloom](https://www.mtgtop8.com/event?e=9064&d=251633&f=MO)
[Amulet Titan 2018](https://www.channelfireball.com/all-strategy/articles/how-to-play-modern-amulet-titan-2nd-place-at-grand-prix-hartford/)

---

Synergy is complicated!

- OUAT displaces Karn/Trinket/Golos/EE/etc. Makes Stirrings worse. Stirrings ultimately gets cut
- Without [[Ancient Stirrings]], the deck is less likely to have [[Amulet of Vigor]]. Makes you want a higher land count to cast Titan the "fair" way.
- Castle displaces some number of bounce lands, making Amulet and Scout worse. Also makes us want to play more Forests. Cut Gemstone Mine for Breeding Pool.
- Field of the Dead and Valakut allow you to shave on Tolaria West
- Off-color bounce lands like [[Boros Garrison]] are awkward since Castle makes Titan cost 2GGG
- Hanweir Battlements doesn't give a power boost or vigilance, but you can pay for it with Valakut
- Castle also ramps by itself, making the double-ramp from Azusa less important. Dryad is almost as good.
- Dryad makes you want to have 3 mana on turn 2, which makes Grazer look better than Scout.
- Valakut lets the deck go over the top without double strike

---

Cards printed in 2019 were off the charts in terms of power level. 

Hogaak dominated Modern for months, even after the banning of Bridge from Below.

Oko has been banned from every format that doesn't allow dual lands.

WAR saw two cards restricted in Vintage; only two other sets in the Modern era share this dubious honor. Mental Misstep and Gitaxian Probe (NPH), Treasure Cruise and Dig Through Time (KTK)

Of the nine cards currently banned from Pioneer (which goes back to 2014), five were printed in 2019.
Not counting fetch lands. They were excluded to cut down on shuffling, rather than banned for power level.

-->
