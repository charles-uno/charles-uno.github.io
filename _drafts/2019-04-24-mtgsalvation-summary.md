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

The big caveat is shuffling. The computer is programmed to try all possible options to find the one that wins fastest. But shuffling at just the right time to blind-draw into better cards isn't luck or skill -- it's cheating. So once the game starts, the order of the deck is locked in. There are no mulligans. And any time the computer would search its deck for a [[Forest]], instead it leaves the deck as-is and creates a new [[Forest]] out of thin air. This means neglecting deck thinning, a percent-level[^2] effect.

[^2]: About one land is thinned from the deck each turn. We simulate out to turn four. That means the model draws about one too many lands (and one too few spells) every twenty games. A quick estimate suggests the difference matters less than half the time.


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

We simulate four different variations of this deck to cover all combinations of [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]]. We also run another four variations as a control: instead of [[Cinder Glade]] and [[Sheltered Thicket]] we look at [[Taiga]] and [[Shivan Oasis]]. This allows us to disentangle the positive effects of cycling from the negative effects of always entering the battlefield tapped. The table below shows how the numbers shake out:

| Titan Breach Variation     | T3   | ≤ T3.5 | ≤ T4   | ≤ T4.5 |
|:---------------------------|:----:|:------:|:------:|:------:|
| Explore, Cinder Glade      | %  | %    | %    | %    |
| Farseek, Cinder Glade      | %  | %    | %    | %    |
| Explore, Sheltered Thicket | %  | %    | %    | %    |
| Farseek, Sheltered Thicket | %  | %    | %    | %    |
| Explore, Shivan Oasis      | %  | %    | %    | %    |
| Farseek, Shivan Oasis      | %  | %    | %    | %    |
| Explore, Taiga             | %  | %    | %    | %    |
| Farseek, Taiga             | %  | %    | %    | %    |

<p class="table-caption">T3 is the odds to [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on turn three, which wins on the spot. T3.5 refers to hard-casting [[Primeval Titan:Titan]] on turn three, which often stabilizes the board right away, but doesn't win until the next turn. Values are cumulative, so "≤T4" is the sum of T3 odds, T3.5 odds, and T4 odds. All values ±1%.</p>



breach-explore-cg       13% ±  1%      18% ±  1%      45% ±  2%      65% ±  2%      73% ±  2%      80% ±  2%
breach-explore-sg       14% ±  1%      20% ±  1%      44% ±  2%      65% ±  2%      74% ±  2%      81% ±  2%
breach-explore-so       13% ±  1%      18% ±  1%      44% ±  2%      62% ±  2%      72% ±  2%      80% ±  2%
breach-explore-st       14% ±  1%      18% ±  1%      44% ±  2%      63% ±  2%      72% ±  2%      80% ±  2%
breach-farseek-cg       14% ±  1%      18% ±  2%      41% ±  3%      62% ±  3%      71% ±  3%      79% ±  4%
breach-farseek-sg       12% ±  1%      18% ±  2%      38% ±  2%      59% ±  3%      68% ±  3%      75% ±  3%
breach-farseek-so       11% ±  1%      16% ±  2%      38% ±  2%      58% ±  3%      66% ±  3%      77% ±  3%
breach-farseek-st       11% ±  1%      15% ±  2%      40% ±  2%      65% ±  3%      73% ±  3%      80% ±  4%



In terms of getting Titan on the table on turn three, [[Sheltered Thicket]] is basically the same as [[Shivan Oasis]]. This rings true. It’s technically possible for cycling on turn two to set us up for a big turn three, but things have to line up *perfectly* – which happens in less than 1% of games.

We can also see that [[Cinder Glade]] is better than [[Shivan Oasis]] across the board, but worse than [[Taiga]]. This is a nice sanity check. If [[Cinder Glade]] ever performed better than [[Taiga]], we’d know something was wrong with the simulation.

What’s striking is how close all the numbers are to one another. The difference between [[Taiga]] and [[Shivan Oasis]] comes up once per 20 to 30 games. And [[Cinder Glade]] and [[Sheltered Thicket]] are even closer. In terms of getting [[Primeval Titan:Titan]] on the table on turn three, [[Cinder Glade]] is better than [[Sheltered Thicket]] about once every 50 games. It just doesn't matter very often whether these lands enter the battlefield tapped or untapped in Titan Breach.


## Intermission

On the subject of Titan Breach, let's take a moment to talk about [[Simian Spirit Guide]]. Many lists shave a copy, or even cut the card completely, to make room for more interaction. The table below quantifies the effect this has on the deck's speed.

| Number of [[Simian Spirit Guide:SSGs]] | T3   | ≤ T3.5 | ≤ T4   | ≤ T4.5 |
|:---------------------------------------|:----:|:------:|:------:|:------:|
| 0                                      |  3%  |  3%    | 30%    | 47%    |
| 1                                      |  5%  |  6%    | 31%    | 50%    |
| 2                                      |  8%  |  9%    | 34%    | 56%    |
| 3                                      | 10%  | 14%    | 36%    | 59%    |
| 4                                      | 14%  | 18%    | 41%    | 63%    |

<p class="table-caption">T3 is the odds to [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on turn three, which wins on the spot. T3.5 refers to hard-casting [[Primeval Titan:Titan]] on turn three, which often stabilizes the board right away, but doesn't win until the next turn. Values are cumulative, so "≤T4" is the sum of T3 odds, T3.5 odds, and T4 odds. All values ±1%.</p>

With zero copies of [[Simian Spirit Guide]], only about one in twenty-five hands can get [[Primeval Titan]] on the table on turn three. That's just once over the course of a ten-round tournament. A single [[Simian Spirit Guide:SSG]] doubles those odds. A full set *quadruples* them. It seems to me that [[Simian Spirit Guide]] and [[Through the Breach]] are a package deal. If you cut either, you might as well cut both and just play Titan Shift, since you're not going to win on turn three anymore.


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

As with Titan Breach, we simulate all combinations of [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]]. We also include control runs with [[Taiga]] and [[Shivan Oasis]] to disentangle cycling from entering the battlefield tapped.

| Titan Shift Variation      | T4   | ≤ T4.5 | ≤ T5   | ≤ T5.5 |
|:---------------------------|:----:|:------:|:------:|:------:|
| Explore, Cinder Glade      | %  | %    | %    | %    |
| Farseek, Cinder Glade      | %  | %    | %    | %    |
| Explore, Sheltered Thicket | %  | %    | %    | %    |
| Farseek, Sheltered Thicket | %  | %    | %    | %    |
| Explore, Shivan Oasis      | %  | %    | %    | %    |
| Farseek, Shivan Oasis      | %  | %    | %    | %    |
| Explore, Taiga             | %  | %    | %    | %    |
| Farseek, Taiga             | %  | %    | %    | %    |

<p class="table-caption">T4 is the odds to cast [[Scapeshift]] on turn four, which wins on the spot. T4.5 refers to hard-casting [[Primeval Titan:Titan]] on T4, which often stabilizes the board right away, but doesn't win until the next turn. Values are cumulative, so "≤T5" is the sum of T4 odds, T4.5 odds, and T5 odds. All values ±1%.</p>

The numbers tell more or less the same story we saw for Titan Breach. [[Taiga]] and [[Shivan Oasis]] behave similarly. The difference comes up about once every 50 games. [[Cinder Glade]] is about halfway between them – it’s only better than [[Shivan Oasis]] about once every 100 games! And as the game goes on, the ability to cycle [[Sheltered Thicket]] becomes more and more of an advantage.


## Caveats and Conclusions

The Titan Shift numbers suggest that by turn five, [[Sheltered Thicket]] is better than Taiga. There’s reason to be skeptical. As noted above, the model plays each game every possible way and keeps the best outcome. If the model cycles [[Sheltered Thicket]] and doesn’t like what it finds, it essentially gets to rewind and do something else instead. In effect, the computer has superhuman “instincts” about when there’s something good on top of the deck.

Even so, it’s fair to say the conventional wisdom undervalues [[Sheltered Thicket]] – or perhaps overvalues [[Cinder Glade]]. In 98% of games we either won’t draw [[Cinder Glade]], or it’ll enter the battlefield tapped, or it’ll enter untapped at a time when it doesn’t matter. Maybe we’re playing it turn two off an [[Explore]], or it’s turn three and we only have a single ramp spell, or it’s turn four and we’ve already got all the mana we need. It’s only that other 2% of games where [[Cinder Glade]] enters the battlefield untapped at a crucial time. That’s once out of 50 games.

If this seems impossibly low to you, well, it seemed that way to me too. So I proxied up the deck and goldfished dozens of games with it. There were plenty of hands where [[Sheltered Thicket]] was awkward – a lone, tapped green source that prevented me from suspending [[Search for Tomorrow]] on turn one. But that happens with [[Cinder Glade]] too. There was not a single game where [[Cinder Glade]] would have shaved a turn off the clock relative to [[Sheltered Thicket]].

On the other hand, I did find myself cycling [[Sheltered Thicket]] from time to time. The computer’s superhuman “instincts” make the effect hard to quantify, but it’s definitely worth something. Early on, it can help dig you out of a flood. In later turns, it finds you another threat or sideboard card that much faster. If you think it might save you bacon once out of 50 games, it’s probably worth a try.
