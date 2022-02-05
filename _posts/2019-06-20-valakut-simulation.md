---
layout: post
title: "Deck Chairs on the Titanic"
image: "/assets/images/thumb/pt-rix.png"
description: How do we estimate the value of "draw a card"?
tags: games code math
---

In late 2017, [Matthias](http://www.starcitygames.com/events/coverage/rg_valakut_with_matthias_hunt.html) lent me a deck so I could tag along to my first Modern tournament. A few months later, I flew to Spain and broke even against world-class opponents at the [Pro Tour](https://magic.wizards.com/en/events/premierplay/protour/ptrix). My secret, honestly, was [[Valakut, the Molten Pinnacle:Valakut]]. The deck is resilient and redundant, making it incredibly friendly to beginners. All the cards are basically lands. You keep putting them on the table until your opponent concedes!

The downside of "resilient and redundant" is that the [[Valakut, the Molten Pinnacle:Valakut]] can get repetitive. As I learned the format, I could anticipate my opponents' tricks and guess their sideboard choices. But you wouldn't know it from my plays: ramp spell, ramp spell, ramp spell, [[Primeval Titan]]. I eventually got to wondering how the deck could be made more flexible -- without losing the consistency that's key to its success.

## Quick on the Draw

In particular, I was curious about [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]]. Conventional wisdom strongly prefers [[Farseek]] for its reliability; [[Explore]] can whiff if we don't have an extra land in hand. Similarly, [[Cinder Glade]] typically enters the battlefield untapped from turn three onward, while [[Sheltered Thicket]] can be an awkward topdeck when we need a sixth mana for [[Primeval Titan]]. [[Sheltered Thicket]] sees fringe play in *addition* to [[Cinder Glade]], but rarely takes its place.

![Valakut Preference Poll](/assets/images/wide/valakut-poll-16x9.png)
*A poll of the Valakut group on Facebook gives a sense for the conventional wisdom. [[Cinder Glade]] is strongly preferred over [[Sheltered Thicket]].*

But [[Explore]] and [[Sheltered Thicket]] have three important words that [[Farseek]] and [[Cinder Glade]] don't: "draw a card." [[Farseek]] is a fine topdeck if we have [[Valakut, the Molten Pinnacle:Valakut]] online, but in that same situation [[Explore]] gives us another chance to [[Primeval Titan:win]] [[Scapeshift:on]] [[Summoner's Pact:the]] [[Blighted Woodland:spot]]. And if our opponent has managed to disrupt our plans using [[Cryptic Command:counterspells]], [[Fulminator Mage:land destruction]], and/or [[Blood Moon:lock pieces]], any lands past our sixth might as well be blanks. We'd much rather re-draw in search of a high-impact sideboard card or finisher to turn the game around. The question is, if we want the added flexibility, how does it affect our speed?

## The Model

This is where the computer comes in. My numerical model[^1] can read in a deck list, [goldfish](https://mtg.gamepedia.com/Goldfishing) thousands of games, and tell us exactly how fast that list can expect to land a [[Primeval Titan]] or [[Scapeshift]]. The model doesn't know anything about sequencing or strategy. Instead, it tries all possible combinations of legal plays and keeps whichever one wins fastest. This approach is computationally inefficient, but it's guaranteed to find the fastest way to win, even when faced with nontrivial choices.

[^1]: The code (written in Python) is available on GitHub [here](https://github.com/charles-uno/mtg-model). Pull requests welcome!

For example, on turn two, we sometimes have to choose between casting [[Sakura-Tribe Elder:STE]] and [[Explore]]. An experienced player can generally eyeball it, but spelling out the decision explicitly for the computer is tedious and error-prone -- a calculation based on how many lands are in our hand, whether we need a second green source, how many live draws we have to make turn-three [[Through the Breach:Breach]] (or [[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]]), and so on. Instead of all that, we just make two copies of the game. One plays [[Sakura-Tribe Elder:STE]] and the other plays [[Explore]]. If *either* copy pulls off turn-three [[Through the Breach:Breach]], it's pretty safe to say a human player could have done the same.

The big caveat is shuffling. The computer is programmed to try all possible options to find the one that wins fastest -- including sequencing its plays to shuffle at just the right time to blind-draw into better cards. Essentially, the computer has superhuman "instincts" about the order of the deck. To suppress those non-human play patterns, the order of the deck is locked in as soon as the game begins. There are no mulligans. And any time the computer would search its deck for a [[Forest]], instead it leaves the deck as-is and creates a new [[Forest]] out of thin air. This means no deck thinning, which introduces a percent-level[^2] uncertainty.

[^2]: About one land is thinned from the deck each turn. We simulate out to turn five. That means the model draws about one too many lands (and one too few spells) per twenty hands. We eyeball the size of this effect by manually thinning a land from the deck often enough to draw the correct number of lands on average.

## Breach for the Stars

Let's start with [Titan Breach](https://www.mtggoldfish.com/archetype/modern-titan-breach#paper) -- the deck I played in Spain. The deck uses [[Simian Spirit Guide]] and [[Through the Breach]] to get [[Primeval Titan]] onto the table as quickly as possible, potentially winning the game on turn three. Below is a typical deck list, more or less[^3]. Note that six slots are reserved for interaction: [[Anger of the Gods]], [[Chalice of the Void]], [[Lightning Bolt]], and so on. These cards don't directly contribute to getting [[Primeval Titan]] on the table, so as far as the simulation is concerned they're blanks.

[^3]: Two or three copies of [[Cinder Glade]] would be more typical. We bump it up to the full set to make the difference between [[Cinder Glade]] and [[Sheltered Thicket]] as clear as possible.

|   | Titan Breach (Summer 2019) |
|--:|:---------------------------|
| 6 | [[Anger of the Gods]] or whatever |
| 4 | [[Farseek]]                |
| 4 | [[Primeval Titan]]         |
| 4 | [[Sakura-Tribe Elder]]     |
| 4 | [[Search for Tomorrow]]    |
| 4 | [[Simian Spirit Guide]]    |
| 4 | [[Summoner's Pact]]        |
| 4 | [[Through the Breach]]     |
| 1 | [[Woodfall Primus]]        |
| 1 | [[Blighted Woodland]]      |
| 4 | [[Cinder Glade]]           |
| 2 | [[Forest]]                 |
| 6 | [[Mountain]]               |
| 4 | [[Stomping Ground]]        |
| 4 | [[Valakut, the Molten Pinnacle]] |
| 4 | [[Wooded Foothills]]       |

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

Beyond that, the biggest takeaway is that all the numbers are pretty close together. At most, differences toe the line of statistical significance. For every hand where we lose a turn whiffing with [[Explore]], there's another where [[Explore]] gains us a turn by drawing us into a missing [[Primeval Titan]] or [[Through the Breach]]. Conventional wisdom suggests [[Farseek]] is better for speed and consistency, but that's not what we're seeing.

## Intermission

As long as we're crunching numbers, let's spend a moment on [[Simian Spirit Guide]]. Many Titan Breach lists shave a copy, or even cut the card completely, to make room for more interaction. The table below quantifies the effect this has on the deck's speed.

| Number of [[Simian Spirit Guide:SSGs]] | T3   | ≤ T3.5 | ≤ T4   | ≤ T4.5 |
|:---------------------------------------|:----:|:------:|:------:|:------:|
| 0                                      |  3%  |  3%    | 29%    | 47%    |
| 1                                      |  6%  |  7%    | 32%    | 50%    |
| 2                                      |  8%  | 10%    | 34%    | 55%    |
| 3                                      | 11%  | 14%    | 36%    | 56%    |
| 4                                      | 12%  | 16%    | 40%    | 61%    |

<p class="table-caption">T3 is the odds to [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on turn three, which wins on the spot. T3.5 refers to hard-casting [[Primeval Titan:Titan]] on turn three, which often stabilizes the board right away, but doesn't win until the next turn. Values are cumulative, so "≤T4" is the sum of T3 odds, T3.5 odds, and T4 odds. All values ±1%.</p>

With zero copies of [[Simian Spirit Guide]], only about one in thirty hands can get [[Primeval Titan]] on the table on turn three. A single [[Simian Spirit Guide:SSG]] doubles those odds. A full set *quadruples* them. They also take our turn-four odds from fifty-fifty to two-to-one -- about an extra [[Primeval Titan]] by turn four every six hands. It looks to me like [[Simian Spirit Guide]] and [[Through the Breach]] are a package deal. If you cut either, you might as well cut both and just play Titan Shift, since you're not going to win on turn three anymore.

## Shifting Gears

[Titan Shift](https://www.mtggoldfish.com/archetype/modern-titanshift-46457#paper) is the slow-and-steady [[Valakut, the Molten Pinnacle:Valakut]] deck. Instead of trying to win on turn three, it finds time to disrupts its opponent with [[Anger of the Gods]], [[Relic of Progenitus]], or even [[Mwonvuli Acid-Moss]]. The deck has a fair amount of wiggle room -- players often find a place for their pet cards -- but the following is a believable baseline:

|   | Titan Shift (Summer 2019) |
|--:|:--------------------------|
| 8 | [[Anger of the Gods]] or whatever |
| 4 | [[Farseek]]               |
| 1 | [[Mwonvuli Acid-Moss]]    |
| 4 | [[Primeval Titan]]        |
| 1 | [[Prismatic Omen]]        |
| 4 | [[Sakura-Tribe Elder]]    |
| 4 | [[Scapeshift]]            |
| 4 | [[Search for Tomorrow]]   |
| 2 | [[Summoner's Pact]]       |
| 1 | [[Wood Elves]]            |
| 1 | [[Blighted Woodland]]     |
| 4 | [[Cinder Glade]]          |
| 2 | [[Forest]]                |
| 8 | [[Mountain]]              |
| 4 | [[Stomping Ground]]       |
| 4 | [[Valakut, the Molten Pinnacle]] |
| 4 | [[Wooded Foothills]]      |

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

The numbers for Titan Shift tell pretty much the same story we saw for Titan Breach. [[Explore]] and [[Farseek]] put up nearly-identical goldfishing numbers. The same is true for [[Cinder Glade]] and [[Sheltered Thicket]]. This is a significant blow to the conventional wisdom. The selling point of [[Cinder Glade]] is that it sometimes enters the battlefield untapped at a crucial moment, allowing us to win a turn earlier. It turns out that only happens in a few percent of hands -- and that the cycling on [[Sheltered Thicket]] gives a comparable boost. This makes [[Sheltered Thicket]] look pretty good. Our curve tops out at six, so past there we rarely care about [[Cinder Glade]] entering the battlefield untapped. But the cycling on [[Sheltered Thicket]] remains relevant throughout the game.

## Caveats and Conclusions

As noted up top, the model has superhuman "instincts" about the order of the deck. This means it's a bit too good when making choices about drawing cards with [[Explore]] or [[Sheltered Thicket]]. Luckily, the effect is small. [[Sheltered Thicket]] goldfishes better than [[Shivan Oasis]] once per fifty-ish hands. Some of that benefit is real, while some is due to bias. That puts the scale of the bias around 1%, comparable to our other uncertainties. We don't have a direct comparison for [[Explore]], but we'd expect the effect to be even smaller. The computer's "instincts" only matter when it's making a choice. [[Sheltered Thicket]] always presents a choice between playing it as a land and cycling it, but [[Explore]] only presents a choice when we have the option to cast something else instead.

Let's also be clear about the limitations of goldfishing. The model cares only about winning as fast as possible, but in a real game we also need to *not lose*. [[Cinder Glade]] saves us a few points of life every time we fetch it in place of an untapped [[Stomping Ground]]. [[Farseek]] ensures double-green for [[Obstinate Baloth]] on turn three. [[Explore]] dodges [[Ashiok, Dream Render:Ashiok]]. [[Sheltered Thicket]] grinds nicely with [[Life from the Loam]]. These corner cases cut both ways, and they're tricky to quantify because the metagame is always changing.

That all said, it's not looking good for the conventional wisdom. [[Farseek]] is supposed to outperform [[Explore]] in terms of speed and consistency, but it turns out the difference is negligible. Same for [[Cinder Glade]] and [[Sheltered Thicket]]. If a game is going according to plan, neither is particularly better than the other. But recall why we're making these comparisons in the first place. If things *aren't* going according to plan, seeing an extra card increases our exposure to high-impact sideboard cards and finishers to turn the game around. Overall, it looks like [[Explore]] is better than [[Farseek]], and [[Sheltered Thicket]] is better than [[Cinder Glade]], in both Titan Breach and Titan Shift.
