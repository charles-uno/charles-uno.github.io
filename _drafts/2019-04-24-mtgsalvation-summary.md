---
layout: post
title: "Deck Chairs on the Titanic"
image: "/assets/images/thumb/pt-rix.png"
description: How do we estimate the value of "draw a card"?
tags: games stem
---

In late 2017, a friend lent me a deck so I could tag along to my first Modern tournament. A few months later, I flew to Spain and put up a reasonable record against world-class opponents at the [Pro Tour](https://magic.wizards.com/en/events/premierplay/protour/ptrix). My secret, honestly, was [[Valakut, the Molten Pinnacle:Valakut]]. The deck is resilient and redundant, making it incredibly friendly to beginners. All the cards are basically lands. You keep putting them on the table until your opponent concedes!

The downside of "resilient and redundant" is that the [[Valakut, the Molten Pinnacle:Valakut]] can get repetitive. As I learned the format, I could anticipate my opponents' tricks and guess their sideboard choices. But you wouldn't know it from my plays: ramp spell, ramp spell, ramp spell, [[Primeval Titan]]. I eventually got to wondering how the deck could be made more flexible -- without losing the consistency that's key to its success.

## Quick on the Draw

In particular, I'm curious about [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]]. Conventional wisdom strongly prefers [[Farseek]] for its reliability; [[Explore]] can whiff if we don't have an extra land in hand. Similarly, [[Cinder Glade]] typically enters the battlefield untapped from turn three onward, while [[Sheltered Thicket]] can be an awkward topdeck when we need a sixth mana for [[Primeval Titan]]. [[Sheltered Thicket]] sees fringe play in *addition* to [[Cinder Glade]], but rarely takes its place.

![Valakut Preference Poll](/assets/images/valakut-poll-16x9.png)
*A poll of the Valakut group on Facebook gives a sense for the conventional wisdom. [[Cinder Glade]] is strongly preferred over [[Sheltered Thicket]].*

But [[Explore]] and [[Sheltered Thicket]] have three important words that [[Farseek]] and [[Cinder Glade]] don't: "draw a card." Early on, drawing an extra card can help us assemble an explosive win on turn three or four. Later on, drawing a card increases our exposure to high-impact finishers and sideboard cards. Seeing an extra card is particularly advantageous when our opponent is able to disrupt our plans with [[Cryptic Command:counterspells]], [[Field of Ruin:land destruction]], and/or [[Blood Moon:lock pieces]]. The question is, if we want the flexibility, how does it affect our speed?

## The Model

This is where the computer comes in. My numerical model[^1] can read in a deck list, simulate thousands of games, and tell us exactly how fast that list can expect to land a [[Primeval Titan]] or [[Scapeshift]]. The model doesn't know anything about sequencing or strategy. Instead, it tries all possible combinations of legal plays and keeps whichever one wins fastest. This approach is computationally inefficient, but it's guaranteed to find the fastest way to win, even when faced with nontrivial choices.

[^1]: The code (written in Go) is available on GitHub [here](https://github.com/charles-uno/valakut). I also have an older version of the model written in [Python](https://github.com/charles-uno/valakut-python).

For example, on turn two, we sometimes have to choose between casting [[Sakura-Tribe Elder:STE]] and [[Explore]]. An experienced player can generally eyeball it, but spelling out the decision explicitly for the computer is tedious and error-prone -- a calculation based on how many lands are in our hand, whether we need a second green source, how many live draws we have to make turn-three [[Through the Breach:Breach]] (or [[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]]), and so on. Instead of all that, we just make two copies of the game. One plays [[Sakura-Tribe Elder:STE]] and the other plays [[Explore]]. If *either* copy pulls off turn-three [[Through the Breach:Breach]], it's pretty safe to say a human player could have done the same.

The big caveat is shuffling. The computer is programmed to try all possible options to find the one that wins fastest -- including sequencing its plays to shuffle at just the right time to blind-draw into better cards. Essentially, the computer has superhuman "instincts" about the order of the deck. To suppress those non-human play patterns, the order of the deck is locked in as soon as the game begins. There are no mulligans. And any time the computer would search its deck for a [[Forest]], instead it leaves the deck as-is and creates a new [[Forest]] out of thin air. This means no deck thinning, which introduces a percent-level[^2] uncertainty.

[^2]: About one land is thinned from the deck each turn. We simulate out to turn five. That means the model draws about one too many lands (and one too few spells) per twenty hands. We eyeball the size of this effect by manually thinning a land from the deck often enough to draw the correct number of lands on average.

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

We simulate four different variations of this deck to cover all combinations of [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]]. We also run the same model back using [[Shivan Oasis]][^4]. This allows us to disentangle the upside of cycling from the downside of always entering the battlefield tapped. The table below shows how the numbers shake out:

[^4]: We would never actually play [[Shivan Oasis]], since it doesn't have the Mountain subtype (which is what makes [[Valakut, the Molten Pinnacle:Valakut]] tick). It's standing in for a [[Taiga]] that always enters the battlefield tapped.

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

Beyond that, the biggest takeaway is that all the numbers are pretty close together. At most, differences toe the line of statistical significance. That's already a blow to the conventional wisdom. [[Explore]] can goldfish just as consistently as [[Farseek]]. [[Sheltered Thicket]] can goldfish just as consistently as [[Cinder Glade]]. From there, the choice comes down to higher-level considerations, discussed in the wrap-up.

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

With zero copies of [[Simian Spirit Guide]], only about one in thirty hands can get [[Primeval Titan]] on the table on turn three. A single [[Simian Spirit Guide:SSG]] doubles those odds. A full set *quadruples* them. They also take our turn-four odds from fifty-fifty to two-to-one -- about an extra [[Primeval Titan]] by turn four every six hands. It looks to me like [[Simian Spirit Guide]] and [[Through the Breach]] are a package deal. If you cut either, you might as well cut both and just play Titan Shift, since you're not going to win on turn three anymore.

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

As with Titan Breach, we simulate all combinations of [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]]. We also include [[Shivan Oasis]] as a control to disentangle cycling from entering the battlefield untapped. The numbers are below:

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

As noted up top, the model has superhuman "instincts" about the order of the deck. This means it's a bit too good when making choices about drawing cards with [[Explore]] or [[Sheltered Thicket]]. Luckily, the effect is small. [[Sheltered Thicket]] goldfishes better than [[Shivan Oasis]] once per fifty-ish hands. Some of that benefit is real, while some is due to bias. That puts the scale of the bias around 1%, comparable to our other uncertainties. We don't have a direct comparison for [[Explore]], but we'd expect the effect to be even smaller. The computer's "instincts" only matter when it's making a choice. [[Sheltered Thicket]] always presents a choice between playing it as a land and cycling it, but [[Explore]] only presents a choice when we have the option to cast something else instead. 

Considering our statistical and systematic uncertainties, we're unable to distinguish a difference between [[Cinder Glade]] and [[Sheltered Thicket]]. They each goldfish a bit better than [[Shivan Oasis]]. Neither performs decidedly better than the other. But recall why we made the comparison in the first place. The cycling on [[Sheltered Thicket]] is a significant advantage in games that go long. If [[Cinder Glade]] and [[Sheltered Thicket]] perform comparably in the early game -- which they do -- [[Sheltered Thicket]] is clearly better overall.

We can apply the same reasoning to [[Farseek]] and [[Explore]]. If everything is going according to plan, we're goldfishing, and the two are about equally good. But what about when things *aren't* going according to plan?

[[Farseek]] is at its best when we have five mountains and a [[Valakut, the Molten Pinnacle:Valakut]] on the table, but our opponent killed our [[Primeval Titan:Titan]] or countered our [[Scapeshift]]. But [[Explore]] is good there too. Part of what makes the deck powerful is that it has so few dead draws once [[Valakut, the Molten Pinnacle:Valakut]] is online. On the other hand, if our opponent has [[Field of Ruin:blown]] [[Assassin's Trophy:up]] our [[Valakut, the Molten Pinnacle:Valakut]], or [[Blood Moon:locked]] [[Witchbane Orb:it]] [[Leyline of Sanctity:out]], 







, [[Farseek]] is good -- but so is [[Explore]]. Part of the deck's redundancy is that is has few dead draws. On the other hand, if [[Valakut, the Molten Pinnacle:Valakut]] is offline, [[Farseek]] is often blank. [[Explore]] is never blank. It always gives us another shot to draw a high-impact threat or sideboard card.










When we're faced with [[Field of Ruin:land destruction]], [[Cryptic Command:counterspells]], [[Blood Moon:lock pieces]], or just a [[Glistener Elf:fast]] [[Goblin Guide:clock]], would we rather our two-mana spell be a land ([[Farseek]]) or a re-draw ([[Explore]])?

Here's how I think about it: [[Farseek]] is basically an [[Explore]] that always draws [[Shivan Oasis]]. 







------



For me, it's [[Explore]], hands down. If we've got five [[Mountain:mountains]] and a [[Valakut, the Molten Pinnacle:Valakut]] on the table, [[Farseek]] is good -- but so is [[Explore]]. Part of the deck's redundancy is that is has few dead draws. On the other hand, if [[Valakut, the Molten Pinnacle:Valakut]] is offline, [[Farseek]] is often blank. [[Explore]] is never blank. It always gives us another shot to draw a high-impact threat or sideboard card.



[[Farseek]] is like [[Explore]] that always draws [[Shivan Oasis]].

The comparison is a bit trickier for the ramp spells. [[Explore]] isn't a worse [[Farseek]] with cycling -- it's a different effect entirely.

Late in the game, when we're one land away from winning, sometimes [[Explore]] draws us into [[Anger of the Gods]] instead. Other times, a land isn't enough, and we're *glad* to have [[Explore]] draw us into [[Anger of the Gods]].

It's easy to compare [[Cinder Glade]] and [[Sheltered Thicket]] because we have [[Shivan Oasis]] as a common baseline.

[[Explore]] and [[Farseek]] goldfish equally well, and it's hard to make an apples-to-apples comparison to break the tie.

There are countless corner cases where either might be preferrable over the other. [[Farseek]] ensures we have double green on turn three. [[Explore]] increases our exposure to finishers and sideboard cards. [[Farseek]] doesn't help find a basic [[Forest]] if we're worried about [[Blood Moon]]. [[Explore]] can make mulligan choices more difficult.

In 98% of hands, [[Cinder Glade]] might as well be [[Shivan Oasis]]. Either we don't draw it, or it enters the battlefield tapped, or it enters the battlefield untapped at a time when it doesn't matter. Maybe we’re playing it turn two off an [[Explore]], or it’s turn three and we only have a single ramp spell, or it’s turn four and we’ve already got all the mana we need. It's only once per fifty-ish hands that [[Cinder Glade]] enters the battlefield untapped in a way that shaves a turn off our clock.

If this seems impossibly low to you, well, I'm right there with you. So I proxied the deck and goldfished a few dozen hands with it. There were plenty of hands where [[Sheltered Thicket]] was awkward – a lone, tapped green source that prevented me from suspending [[Search for Tomorrow]] on turn one. But that happens with [[Cinder Glade]] too. There was not a single game where [[Cinder Glade]] would have shaved a turn off the clock relative to [[Sheltered Thicket]].

On the other hand, I did find myself cycling [[Sheltered Thicket]] from time to time. The computer’s superhuman “instincts” make the effect hard to quantify, but it’s definitely worth something. Early on, it can help dig you out of a flood. In later turns, it finds you another threat or sideboard card that much faster. If you think it might save you bacon once out of 50 hands, it’s probably worth a try.

With margins that tight, we need to be careful not to overstep the limitations of the model. There are caveats

surprise upset
