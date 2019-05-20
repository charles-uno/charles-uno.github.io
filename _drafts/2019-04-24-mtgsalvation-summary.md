---
layout: post
title: "Deck Chairs on the Titanic"
image: "/assets/images/thumb/pt-rix.png"
description: "What do we learn by simulating a million hands of Valakut?"
tags: games stem
---

In late 2017, a friend lent me a deck so I could tag along to my first Modern tournament. A few months later, I flew to Spain and put up a respectable record against world-class opponents at the [Pro Tour](https://magic.wizards.com/en/events/premierplay/protour/ptrix). My secret, honestly, was [[Valakut, the Molten Pinnacle:Valakut]]. The deck is resilient and redundant, making it incredibly friendly to beginners. All the cards are basically lands. You keep putting them on the table until your opponent concedes!

The downside of "resilient and redundant" is that the [[Valakut, the Molten Pinnacle:Valakut]] can get repetitive. As I learned the format, I could anticipate my opponents' tricks and guess their sideboard choices. But you wouldn't know it from my plays: ramp spell, ramp spell, ramp spell, [[Primeval Titan]]. I eventually got to wondering how the deck could be made more flexible -- without losing the consistency that's key to its success.

## Quick on the Draw

In particular, I'm curious about [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]]. Conventional wisdom strongly prefers [[Farseek]] for its reliability; [[Explore]] can whiff if we don't have an extra land in hand. Similarly, [[Cinder Glade]] typically enters the battlefield untapped from turn three onward, while [[Sheltered Thicket]] can be an awkward topdeck when we need a sixth mana for [[Primeval Titan]]. [[Sheltered Thicket]] sees fringe play in *addition* to [[Cinder Glade]], but rarely takes its place.

![Valakut Preference Poll](/assets/images/valakut-poll-16x9.png)
*A poll of the Valakut group on Facebook gives a sense for the conventional wisdom. [[Cinder Glade]] is strongly preferred over [[Sheltered Thicket]].*

But [[Explore]] and [[Sheltered Thicket]] have three important words that [[Farseek]] and [[Cinder Glade]] don't: "draw a card." Early on, drawing an extra card can help us assemble an explosive win on turn three or four. Later on, drawing a card digs us that much closer to a sideboard card or finisher -- especially if our opponent has managed to keep [[Valakut, the Molten Pinnacle:Valakut]] offline. The question is, if we want the flexibility, how does it affect our speed?

## The Model

This is where the computer comes in. My numerical model[^1] can read in a deck list, simulate thousands of games, and tell us exactly how fast that list can expect to land a [[Primeval Titan]] or [[Scapeshift]]. The model doesn't know anything about sequencing or strategy. Instead, it tries all possible combinations of legal plays and keeps whichever one wins fastest. This approach is computationally inefficient, but it's guaranteed to find the fastest way to win, even when faced with nontrivial choices.

[^1]: The code (written in Go) is available on GitHub [here](https://github.com/charles-uno/valakut). I also have an older version of the model written in [Python](https://github.com/charles-uno/valakut-python).

For example, on turn two, we often have to choose between casting [[Sakura-Tribe Elder:STE]] and [[Explore]]. An experienced player can generally eyeball it, but spelling out the decision explicitly for the computer is tedious and error-prone -- a calculation based on how many lands are in our hand, whether we need a second green source, how many live draws we have to make turn-three [[Through the Breach:Breach]] (or [[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]]), and so on. Instead of all that, we just make two copies of the game. One plays [[Sakura-Tribe Elder:STE]] and the other plays [[Explore]]. If *either* copy pulls off turn-three [[Through the Breach:Breach]], it's pretty safe to say a human player could have done the same.

The big caveat is shuffling. The computer is programmed to try all possible options to find the one that wins fastest. That means it essentially has superhuman "instincts" about what it's about to draw. If we let it, it'll shuffle as just the right time to blind-draw into better cards. To suppress those non-human play patterns, the order of the deck is locked in as soon as the game begins. There are no mulligans. And any time the computer would search its deck for a [[Forest]], instead it leaves the deck as-is and creates a new [[Forest]] out of thin air. This means no deck thinning, which introduces a percent-level[^2] uncertainty.

[^2]: About one land is thinned from the deck each turn. We simulate out to turn five. That means the model draws about one too many lands (and one too few spells) per twenty games. We can eyeball the size of this effect by manually thinning a land from the deck often enough to draw the correct number of lands on average.

## Titan Breach

Let's start with [Titan Breach](https://www.mtggoldfish.com/archetype/modern-titan-breach#paper) -- the deck I played in Spain. The deck uses [[Simian Spirit Guide]] and [[Through the Breach]] to get [[Primeval Titan]] onto the table as quickly as possible, potentially winning the game on turn three. Below is a typical deck list, more or less[^3]. Note that six slots are reserved for interaction: [[Anger of the Gods]], [[Chalice of the Void]], [[Lightning Bolt]], and so on. These cards don't directly contribute to getting [[Primeval Titan]] on the table, so as far as the simulation is concerned they're blanks.

[^3]: Two or three copies of [[Cinder Glade]] would be more typical. We bump it up to the full set to make the difference between [[Cinder Glade]] and [[Sheltered Thicket]] as clear as possible.

<table class="cardlist">
    <caption class="deckname">Titan Breach</caption>
    <tr>
        <td>
            6 [[Anger of the Gods]] or whatever<br>
            4 [[Farseek]]<br>
            4 [[Primeval Titan]]<br>
            4 [[Sakura-Tribe Elder]]<br>
            4 [[Search for Tomorrow]]<br>
            4 [[Simian Spirit Guide]]<br>
            4 [[Summoner's Pact]]<br>
            4 [[Through the Breach]]<br>
            1 [[Woodfall Primus]]<br>
        </td>
        <td>
            1 [[Blighted Woodland]]<br>
            4 [[Cinder Glade]]<br>
            2 [[Forest]]<br>
            6 [[Mountain]]<br>
            4 [[Stomping Ground]]<br>
            4 [[Valakut, the Molten Pinnacle]]<br>
            4 [[Wooded Foothills]]<br>
        </td>
    </tr>
</table>

We simulate four different variations of this deck to cover all combinations of [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]]. We also run the same model back using [[Shivan Oasis]]. This allows us to disentangle the upside of cycling from the downside of always entering the battlefield tapped. The table below shows how the numbers shake out:

| Titan Breach Variation             | T3   | ≤ T3.5 | ≤ T4   | ≤ T4.5 |
|:-----------------------------------|:----:|:------:|:------:|:------:|
| [[Explore]], [[Cinder Glade]]      | 14%  | 19%    | 42%    | 62%    |
| [[Explore]], [[Sheltered Thicket]] | 13%  | 17%    | 43%    | 63%    |
| [[Explore]], [[Shivan Oasis]]      | 12%  | 16%    | 42%    | 62%    |
| [[Farseek]], [[Cinder Glade]]      | 12%  | 16%    | 40%    | 61%    |
| [[Farseek]], [[Sheltered Thicket]] | 11%  | 15%    | 41%    | 63%    |
| [[Farseek]], [[Shivan Oasis]]      | 11%  | 15%    | 39%    | 60%    |

<p class="table-caption">T3 is the odds to [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on turn three, which wins on the spot. T3.5 refers to hard-casting [[Primeval Titan:Titan]] on turn three, which often stabilizes the board right away, but doesn't win until the next turn. Values are cumulative, so "≤T4" is the sum of T3 odds, T3.5 odds, and T4 odds. All values ±1%.</p>

Right off the bat, we can make a quick sanity check: [[Cinder Glade]] and [[Sheltered Thicket]] both perform better than [[Shivan Oasis]] across the board. If this weren't the case, we'd know something was wrong. It's also reassuring to see that [[Cinder Glade]] is at a relative advantage on turn three, while [[Sheltered Thicket]] performs best on turn four. Even a single tapped land drop makes it hard to curve into a turn-three [[Primeval Titan]], but that extra turn gives us some wiggle room to cycle [[Sheltered Thicket]] in search of a missing piece.

Beyond that, the biggest takeaway is that all the numbers are pretty close together. At most, differences toe the line of statistical significance. That on its own is a blow to the conventional wisdom. [[Explore]] can goldfish just as consistently as [[Farseek]]. [[Sheltered Thicket]] can goldfish just as consistently as [[Cinder Glade]]. From there, the choice comes down to higher-level considerations, discussed in the wrap-up.

## Intermission

As long as we're crunching numbers, let's take a moment to discuss [[Simian Spirit Guide]]. Many Titan Breach lists shave a copy, or even cut the card completely, to make room for more interaction. The table below quantifies the effect this has on the deck's speed.

| Number of [[Simian Spirit Guide:SSGs]] | T3   | ≤ T3.5 | ≤ T4   | ≤ T4.5 |
|:---------------------------------------|:----:|:------:|:------:|:------:|
| 0                                      |  3%  |  3%    | 29%    | 47%    |
| 1                                      |  6%  |  7%    | 32%    | 50%    |
| 2                                      |  8%  | 10%    | 34%    | 55%    |
| 3                                      | 11%  | 14%    | 36%    | 56%    |
| 4                                      | 12%  | 16%    | 40%    | 61%    |

<p class="table-caption">T3 is the odds to [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on turn three, which wins on the spot. T3.5 refers to hard-casting [[Primeval Titan:Titan]] on turn three, which often stabilizes the board right away, but doesn't win until the next turn. Values are cumulative, so "≤T4" is the sum of T3 odds, T3.5 odds, and T4 odds. All values ±1%.</p>

With zero copies of [[Simian Spirit Guide]], only about one in thirty hands can get [[Primeval Titan]] on the table on turn three. That's just once over the course of a twelve-round tournament. A single [[Simian Spirit Guide:SSG]] doubles those odds. A full set *quadruples* them. They also take our turn-four odds from fifty-fifty to two-to-one -- about an extra [[Primeval Titan]] every six games.

It looks to me like [[Simian Spirit Guide]] and [[Through the Breach]] are a package deal. If you cut either, you might as well cut both and just play Titan Shift, since you're not going to win on turn three anymore.

## Titan Shift

[Titan Shift](https://www.mtggoldfish.com/archetype/modern-titanshift-46457#paper) is the slow-and-steady [[Valakut, the Molten Pinnacle:Valakut]] deck. Instead of trying to win on turn three, it finds time to disrupts its opponent with [[Anger of the Gods]], [[Relic of Progenitus]], or even [[Mwonvuli Acid-Moss]. The deck has a fair amount of wiggle room -- players often find a place for their pet cards -- but the following is a believable baseline:

<table class="cardlist">
    <caption class="deckname">Titan Shift</caption>
    <tr>
        <td>
            8 [[Anger of the Gods]] or whatever<br>
            4 [[Farseek]]<br>
            1 [[Mwonvuli Acid-Moss]]<br>
            4 [[Primeval Titan]]<br>
            1 [[Prismatic Omen]]<br>
            4 [[Sakura-Tribe Elder]]<br>
            4 [[Scapeshift]]<br>
            4 [[Search for Tomorrow]]<br>
            2 [[Summoner's Pact]]<br>
            1 [[Wood Elves]]<br>
        </td>
        <td>
            1 [[Blighted Woodland]]<br>
            4 [[Cinder Glade]]<br>
            2 [[Forest]]<br>
            8 [[Mountain]]<br>
            4 [[Stomping Ground]]<br>
            4 [[Valakut, the Molten Pinnacle]]<br>
            4 [[Wooded Foothills]]<br>
        </td>
    </tr>
</table>

As with Titan Breach, we simulate all combinations of [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]]. We also include control runs with [[Shivan Oasis]] to disentangle cycling from entering the battlefield tapped. The numbers are below:

| Titan Shift Variation              | T4   | ≤ T4.5 | ≤ T5   | ≤ T5.5 |
|:-----------------------------------|:----:|:------:|:------:|:------:|
| [[Explore]], [[Cinder Glade]]      | 15%  | 40%    | 55%    | 71%    |
| [[Explore]], [[Sheltered Thicket]] | 15%  | 38%    | 54%    | 72%    |
| [[Explore]], [[Shivan Oasis]]      | 14%  | 38%    | 52%    | 69%    |
| [[Farseek]], [[Cinder Glade]]      | 16%  | 41%    | 55%    | 72%    |
| [[Farseek]], [[Sheltered Thicket]] | 16%  | 40%    | 56%    | 73%    |
| [[Farseek]], [[Shivan Oasis]]      | 14%  | 39%    | 55%    | 73%    |

<p class="table-caption">T4 is the odds to cast [[Scapeshift]] on turn four, which wins on the spot. T4.5 refers to hard-casting [[Primeval Titan:Titan]] on T4, which often stabilizes the board right away, but doesn't win until the next turn. Values are cumulative, so "≤T5" is the sum of T4 odds, T4.5 odds, and T5 odds. All values ±1%.</p>

The numbers for Titan Shift tell pretty much the same story we saw for Titan Breach. [[Explore]] and [[Farseek]] put up nearly-identical goldfishing numbers. Same for [[Cinder Glade]] and [[Sheltered Thicket]]. These numbers on their own don't show that [[Explore]] or [[Sheltered Thicket]] are *better* per se -- more on that in a moment -- but they certainly cast doubt on the widespread presumption that they're worse. 

## Caveats and Conclusions

Once every fifty-ish games, [[Cinder Glade]] goldfishes better than [[Shivan Oasis]] because it enters the battlefield tapped at a crucial moment. Once every fifty-ish games, [[Sheltered Thicket]] goldfishes better than [[Shivan Oasis]] because we cycle it to draw into something relevant. As far as the early game goes, it's pretty much[^3] a wash. But keep in mind why we're making this comparison in the first place. In the late game, the ability to cycle [[Sheltered Thicket]] is very powerful. If they're comparably good in the early game, [[Sheltered Thicket]] is clearly better overall.


[^3]: The ability to fetch [[Cinder Glade]] instead of [[Stomping Ground]] as an untapped land on turn four might come up once in a while. The model does not track life.



- fetching cinder glade can save some life, which the model does not track




The Titan Shift numbers suggest that by turn five, [[Sheltered Thicket]] is better than [[Taiga]]. There’s reason to be skeptical. As noted above, the model plays each game every possible way and keeps the best outcome. If the model cycles [[Sheltered Thicket]] and doesn’t like what it finds, it essentially gets to rewind and do something else instead. In effect, the computer has superhuman “instincts” about when there’s something good on top of the deck.

Even so, it’s fair to say the conventional wisdom undervalues [[Sheltered Thicket]] – or perhaps overvalues [[Cinder Glade]]. In 98% of games we either won’t draw [[Cinder Glade]], or it’ll enter the battlefield tapped, or it’ll enter untapped at a time when it doesn’t matter. Maybe we’re playing it turn two off an [[Explore]], or it’s turn three and we only have a single ramp spell, or it’s turn four and we’ve already got all the mana we need. It’s only that other 2% of games where [[Cinder Glade]] enters the battlefield untapped at a crucial time. That’s once out of 50 games.

If this seems impossibly low to you, well, it seemed that way to me too. So I proxied up the deck and goldfished dozens of games with it. There were plenty of hands where [[Sheltered Thicket]] was awkward – a lone, tapped green source that prevented me from suspending [[Search for Tomorrow]] on turn one. But that happens with [[Cinder Glade]] too. There was not a single game where [[Cinder Glade]] would have shaved a turn off the clock relative to [[Sheltered Thicket]].

On the other hand, I did find myself cycling [[Sheltered Thicket]] from time to time. The computer’s superhuman “instincts” make the effect hard to quantify, but it’s definitely worth something. Early on, it can help dig you out of a flood. In later turns, it finds you another threat or sideboard card that much faster. If you think it might save you bacon once out of 50 games, it’s probably worth a try.




Right off the bat, we can make a quick sanity check: [[Cinder Glade]] performs better than [[Shivan Oasis]] across the board, and worse than [[Taiga]]. If this weren't the case, we'd know something was wrong.

It's also reassuring to see that there's a big turn-three difference between [[Taiga]] and [[Shivan Oasis]] for the builds with [[Farseek]], but not so much with [[Explore]]. A tapped land drop makes it tough to curve into turn-three [[Primeval Titan]]. [[Explore]] gets around that problem by letting us play it as our extra land.

Beyond that, the biggest takeaway is that the numbers are all pretty similar. After accounting for statistical uncertainties, [[Explore]] performs just a hair better than [[Farseek]] regardless of which land we choose -- about one faster win per fifty hands. [[Cinder Glade]] and [[Sheltered Thicket]] are even closer. This is a significant blow to the conventional wisdom. [[Explore]] can goldfish just as consistently as [[Farseek]]. [[Sheltered Thicket]] can goldfish just as consistently as [[Cinder Glade]]. The better choice comes down to higher-level considerations, discussed in the wrap-up.





Real games have more factors to consider which may well outweigh that small margin. [[Explore]] can make mulligan choices trickier. It also plays better with [[Courser of Kruphix]], and against [[Leonin Arbiter]]. [[Farseek]] makes us more likely to have double-green on turn three for sideboard cards like [[Obstinate Baloth]]. And so on. It'd be a stretch to argue that [[Explore]] is *better* than [[Farseek]], but it certainly doesn't look worse.




It's also reassuring to see that there's a big turn-three difference between [[Taiga]] and [[Shivan Oasis]] for the builds with [[Farseek]], but not so much with [[Explore]]. A tapped land drop makes it tough to curve into turn-three [[Primeval Titan]]. [[Explore]] gets around that problem by letting us play it as our extra land.

Beyond that, the biggest takeaway is that the numbers are all pretty similar. After accounting for statistical uncertainties, [[Explore]] performs just a hair better than [[Farseek]] regardless of which land we choose -- about one faster win per fifty hands. [[Cinder Glade]] and [[Sheltered Thicket]] are even closer. This is a significant blow to the conventional wisdom. [[Explore]] can goldfish just as consistently as [[Farseek]]. [[Sheltered Thicket]] can goldfish just as consistently as [[Cinder Glade]]. The better choice comes down to higher-level considerations, discussed in the wrap-up.










Once per fifty-ish games, [[Cinder Glade]] goldfishes better than [[Shivan Oasis]] because it enters the battlefield untapped. Once per fifty-ish games, [[Sheltered Thicket]] goldfishes better than [[Shivan Oasis]] because we cycle it to draw into something relevant. As far as the first four turns of the game are concerned, it's a wash. But keep in mind why we're making this comparison in the first place. In the late game, the ability to cycle [[Sheltered Thicket]] is very powerful. If they're comparably good in the early game, [[Sheltered Thicket]] is clearly better overall.






conventional wisdom skepticism is unjustified


It's dicey to claim either is better than the other because factors outside goldfishing could tip the needle either way. [[Sheltered Thicket]] is a hair better than [[Cinder Glade]] on turns four and five, plus clearly better if the game goes late, so it gets the nod.



With margins that tight, we need to be careful not to overstep the limitations of the model. There are caveats



With a margin that tight, we need to be careful not to overstep the limitations of our model.

Based on a margin that tight, it'd be a stretch to claim that [[Explore]] is *better* than [[Farseek]] -- more on this in the wrap-up -- but certainly

Explore can goldfish just as consistently as Farseek.

With margins this tight, we have to be careful not to overstep the limitations of the model.

These numbers don't tell us that [[Explore]] is a better card per se.

There are non-goldfishing considerations that could tip the needle either way.

In terms of goldfishing, [[Explore]] is competitive with [[Farseek]], and maybe even a bit better.





But that's just goldfishing.



Real games have more factors to consider which may well outweigh that small margin. [[Explore]] can make mulligan choices trickier. It also plays better with [[Courser of Kruphix]], and against [[Leonin Arbiter]]. [[Farseek]] makes us more likely to have double-green on turn three for sideboard cards like [[Obstinate Baloth]]. And so on. It'd be a stretch to argue that [[Explore]] is *better* than [[Farseek]], but it certainly doesn't look worse.

The comparison between [[Cinder Glade]] and [[Sheltered Thicket]] is cleaner cut. There is no statistically significant difference between them. Once per fifty-ish games, [[Cinder Glade]] is better than [[Shivan Oasis]] because it enters the battlefield untapped. Once per fifty-ish games, [[Sheltered Thicket]] is better than [[Shivan Oasis]] because we cycle it to draw into something relevant. As far as the first four turns of the game are concerned, it's a wash. But keep in mind why we're making this comparison in the first place. In the late game, the ability to cycle [[Sheltered Thicket]] is very powerful. If they're equally good in the early game, [[Sheltered Thicket]] is clearly better overall in Titan Breach.





[[Cinder Glade]] and [[Sheltered Thicket]] are even closer. Goldfishing numbers don't tell us everything -- more on this in the wrap-up -- but they do tell us two things:

- Contrary to the conventional wisdom, swapping out [[Farseek]] for [[Explore]] does not hurt the deck's early-game consistency.
- Contrary to the conventional wisdom, swapping out [[Cinder Glade]] for [[Sheltered Thicket]] does not hurt the deck's early-game consistency.








surprise upset

Farseek better at getting double green for sideboard cards like obstinate baloth

Explore can make it tougher to mulligan

explore works from the top of the deck. better against Leonin Arbiter. Can get downright abusive with Courser of Kruphix.

Sheltered Thicket needs mana to cycle that you might want to use for Lightning Bolt

If you think you'd rather have a land in the late game, play [[Farseek]]. If you'd rather draw a card, play [[Explore]]. I know which I prefer. If [[Valakut, the Molten Pinnacle:Valakut]] is online, I don't mind drawing a card, since the deck has so few dead draws. If [[Valakut, the Molten Pinnacle:Valakut]] is offline, digging for more action is *much* better than making a triggerless land drop.

[[Sheltered Thicket]] performs a hair better than [[Cinder Glade]]. I was initially skeptical, but after proxying up the deck and goldfishing a few dozen games, this makes sense. It's pretty easy to get a tapped land onto the battlefield by turn four or five without messing up our curve, and I found myself cycling [[Sheltered Thicket]] regularly.



In a surprise upset, [[Explore]] edges out [[Farseek]] regardless of which land we use. It looks like the risk of whiffing is made up for by the potential to draw into a missing [[Through the Breach:Breach]], [[Simian Spirit Guide:SSG]], or [[Primeval Titan:Titan]]. The difference is largest when looking at [[Shivan Oasis]], which makes sense. A tapped land drop makes it tough to curve into turn-three [[Primeval Titan]]. [[Explore]] gets around that problem by letting us play it as our extra land.

I'm hesitant to claim that [[Explore]] is *better* than [[Farseek]] in the early game -- we get into a few caveats in the wrap-up -- but certainly the two are much closer than the conventional wisdom suggests.

If you think you'd rather have a land in the late game, play [[Farseek]]. If you'd rather draw a card, play [[Explore]]. I know which I prefer. With [[Valakut, the Molten Pinnacle:Valakut]] online, I don't mind drawing a card, since the deck has so few dead draws. But if [[Valakut, the Molten Pinnacle:Valakut]] is offline, digging for more action is *much* better than making a triggerless land drop.






Once in a while it matters that [[Cinder Glade]] enters the battlefield untapped. Once in a while we cycle [[Sheltered Thicket]] and draw into something relevant. As far as the early game is concerned, the two effects offset.


The Titan Shift numbers suggest that by turn five, [[Sheltered Thicket]] is better than Taiga. There’s reason to be skeptical. As noted above, the model plays each game every possible way and keeps the best outcome. If the model cycles [[Sheltered Thicket]] and doesn’t like what it finds, it essentially gets to rewind and do something else instead. In effect, the computer has superhuman “instincts” about when there’s something good on top of the deck.

Even so, it’s fair to say the conventional wisdom undervalues [[Sheltered Thicket]] – or perhaps overvalues [[Cinder Glade]]. In 98% of games we either won’t draw [[Cinder Glade]], or it’ll enter the battlefield tapped, or it’ll enter untapped at a time when it doesn’t matter. Maybe we’re playing it turn two off an [[Explore]], or it’s turn three and we only have a single ramp spell, or it’s turn four and we’ve already got all the mana we need. It’s only that other 2% of games where [[Cinder Glade]] enters the battlefield untapped at a crucial time. That’s once out of 50 games.

If this seems impossibly low to you, well, it seemed that way to me too. So I proxied up the deck and goldfished dozens of games with it. There were plenty of hands where [[Sheltered Thicket]] was awkward – a lone, tapped green source that prevented me from suspending [[Search for Tomorrow]] on turn one. But that happens with [[Cinder Glade]] too. There was not a single game where [[Cinder Glade]] would have shaved a turn off the clock relative to [[Sheltered Thicket]].

On the other hand, I did find myself cycling [[Sheltered Thicket]] from time to time. The computer’s superhuman “instincts” make the effect hard to quantify, but it’s definitely worth something. Early on, it can help dig you out of a flood. In later turns, it finds you another threat or sideboard card that much faster. If you think it might save you bacon once out of 50 games, it’s probably worth a try.
