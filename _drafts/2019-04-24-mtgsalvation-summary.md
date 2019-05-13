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

In particular, I'm curious about [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]]. Conventional wisdom strongly prefers [[Farseek]] for its reliability; [[Explore]] can whiff if we don't have an extra land in hand. Similarly, [[Cinder Glade]] typically enters the battlefield untapped from turn three onward, while [[Sheltered Thicket]] can be an awkward topdeck when we need a sixth mana for [[Primeval Titan]]. [[Sheltered Thicket]] sees fringe play in *addition* to [[Cinder Glade]], but never takes its place. 

![Valakut Preference Poll](/assets/images/valakut-poll-16x9.png)
*A poll of the Valakut group on Facebook gives a sense for the conventional wisdom. [[Cinder Glade]] is strongly preferred over [[Sheltered Thicket]].*

But [[Explore]] and [[Sheltered Thicket]] have three important words that [[Farseek]] and [[Cinder Glade]] don't: "draw a card." Early on, drawing an extra card can help us assemble an explosive win on turn three or four. Later on, drawing a card digs us that much closer to a sideboard card or finisher -- especially if our opponent has managed to keep [[Valakut, the Molten Pinnacle:Valakut]] offline. The question is, if we want the flexibility, how does it affect our speed?

## The Model

This is where the computer comes in. I've written a numerical model[^1] that can read in a deck list, simulate thousands of games, and tell us exactly how fast that list can expect to land a [[Primeval Titan]] or [[Scapeshift]]. The model doesn't know anything about sequencing or strategy. Instead, it tries all possible combinations of legal plays and keeps whichever one wins fastest. This approach is computationally inefficient, but it's guaranteed to find the fastest way to win, even when faced with nontrivial choices.

[^1]: The code (written in Go) is available on GitHub [here](https://github.com/charles-uno/valakut). I also have an older version of the model written in [Python](https://github.com/charles-uno/valakut-python). 

For example, on turn two, we often have to choose between casting [[Sakura-Tribe Elder:STE]] and [[Explore]]. An experienced player can generally eyeball it, but spelling out the decision explicitly for the computer is tedious and error-prone. We'd have to make a calculation based on how many lands are in our hand, whether we need a second green source, how many live draws we have to make turn-three [[Through the Breach:Breach]] (or [[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]]), and so on. Instead of all that, we just make two copies of the game. One plays [[Sakura-Tribe Elder:STE]] and the other plays [[Explore]]. If *either* copy pulls off turn-three [[Through the Breach:Breach]], it's pretty safe to say a human player could have done the same.

The big caveat is shuffling. The computer is programmed to try all possible options to find the one that wins fastest. But shuffling at just the right time to blind-draw into better cards isn't luck or skill -- it's cheating. So once the game starts, the order of the deck is locked in. There are no mulligans. And any time the computer would search its deck for a [[Forest]], instead it leaves the deck as-is and creates a new [[Forest]] out of thin air. This means neglecting deck thinning, a percent-level[^2] effect.

[^2]: About one land is thinned from the deck each turn. We simulate out to turn four. That means the model draws about one too many lands (and one too few spells) every twenty games. A quick estimate suggests the difference matters less than half the time.

## Titan Shift

[Titan Shift](https://www.mtggoldfish.com/archetype/modern-titanshift-46457#paper) is the most popular [[Valakut, the Molten Pinnacle:Valakut]] deck. Below shows a "typical" list, plus or minus a bit of personal preference. Notably, there are eight slots reserved for interaction: [[Anger of the Gods]], [[Lightning Bolt]], [[Flame Slash]], [[Reclamation Sage]], and so on. These cards don't directly contribute to getting lands on the table, so as far as the simulation is concerned they're blanks. 

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

We'll simulate four different variations of this deck to cover all combinations of [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]]. We'll also run another four variations as a control: instead of [[Cinder Glade]] and [[Sheltered Thicket]] we'll use [[Taiga]] and [[Shivan Oasis]]. This will allow us to disentangle the positive effects of cycling from the negative effects of always entering the battlefield tapped. We'll look at 5k hands with each build, to get our numbers 

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

**ANALYSIS...**


## Titan Breach

[Titan Breach](https://www.mtggoldfish.com/archetype/modern-titan-breach#paper) is the all-in cousin of Titan Shift. It uses [[Simian Spirit Guide]] and [[Through the Breach]] to get [[Primeval Titan]] onto the battlefield as quickly as possible, potentially winning the game on turn three. Lists look about like the following, with six slots reserved for interaction: [[Anger of the Gods]], [[Chalice of the Void]], [[Lightning Bolt]], and so on. 

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

A quick aside: sometimes you'll see a Titan Breach list shave a copy of [[Simian Spirit Guide]], or cut the card entirely. 










-----



-----







If we could play more than eight copies of [[Sakura-Tribe Elder]], we'd do so in a heartbeat. It's a ramp spell that also blocks to protect our life total. Sadly, we can't. [[Farseek]] and [[Explore]] are the next best options. Conventional wisdom strongly prefers [[Farseek]] for its reliability, but there's reason to be skeptical. 

[[Search for Tomorrow]] and [[Sakura-Tribe Elder]] fill unique roles and can't readily be replaced. Conventional wisdom is to play [[Farseek]] as the third-best ramp spell.

In both [Titan Breach](https://www.mtggoldfish.com/archetype/modern-titan-breach#paper) and [Titan Shift](https://www.mtggoldfish.com/archetype/modern-titanshift-46457#paper), the conventional wisdom strongly prefers [[Farseek]] over [[Explore]]. [[Farseek]] is a reliable ramp spell, while [[Explore]] sometimes whiffs. Similarly, [[Cinder Glade]] is widely played and [[Sheltered Thicket]] is a fringe one-of. [[Cinder Glade]] typically enters the battlefield untapped from turn three onward, while [[Sheltered Thicket]] can be an awkward topdeck when we need the sixth mana for a [[Primeval Titan:Titan]].

Most of the card choices are untouchable. There's no substitute for the curve toppers: [[Primeval Titan]], [[Summoner's Pact]], [[Scapeshift]], and/or [[Through the Breach]]. [[Wooded Foothills:Fetches]], and [[Stomping Ground:shocks]] are the best mana fixing in Modern.






## Titan Shift









## Quick on the Draw





In particular, I became







Specifically, I'm curious about [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]].

![Valakut Preference Poll](/assets/images/valakut-poll-16x9.png)
*A poll of the Valakut group on Facebook gives a sense for the conventional wisdom. [[Cinder Glade]] is strongly preferred over [[Sheltered Thicket]].*

In both [Titan Breach](https://www.mtggoldfish.com/archetype/modern-titan-breach#paper) and [Titan Shift](https://www.mtggoldfish.com/archetype/modern-titanshift-46457#paper), the conventional wisdom strongly prefers [[Farseek]] over [[Explore]]. [[Farseek]] is a reliable ramp spell, while [[Explore]] sometimes whiffs. Similarly, [[Cinder Glade]] is widely played and [[Sheltered Thicket]] is a fringe one-of. [[Cinder Glade]] typically enters the battlefield untapped from turn three onward, while [[Sheltered Thicket]] can be an awkward topdeck when we need the sixth mana for a [[Primeval Titan:Titan]].

But [[Explore]] and [[Sheltered Thicket]] have three important words that [[Farseek]] and [[Cinder Glade]] don't: "draw a card." Early on, drawing an extra card can help us assemble an explosive win on turn three or four. Later on, drawing a card digs us that much closer to a sideboard card or finisher -- especially if our opponent has managed to keep [[Valakut, the Molten Pinnacle:Valakut]] offline. The question is, if we want the flexibility, how does it affect our speed?














## Quick on the Draw


In both [Titan Breach](https://www.mtggoldfish.com/archetype/modern-titan-breach#paper) and [Titan Shift](https://www.mtggoldfish.com/archetype/modern-titanshift-46457#paper), the conventional wisdom strongly prefers [[Farseek]] over [[Explore]]. [[Farseek]] is a reliable ramp spell, while [[Explore]] sometimes whiffs. Similarly, [[Cinder Glade]] is widely played and [[Sheltered Thicket]] is a fringe one-of. [[Cinder Glade]] typically enters the battlefield untapped from turn three onward, while [[Sheltered Thicket]] can be an awkward topdeck when we need the sixth mana for a [[Primeval Titan:Titan]].


Why take the risk?

But [[Explore]] and [[Sheltered Thicket]] have three important words that [[Farseek]] and [[Cinder Glade]] don't: "draw a card." Early on, drawing an extra card can help us assemble an explosive win on turn three or four. Later on, drawing a card digs us that much closer to a sideboard card or finisher -- especially if our opponent has managed to keep [[Valakut, the Molten Pinnacle:Valakut]] offline. The question is, if we want the flexibility, how does it affect our speed?






Specifically, I'm curious about [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]].










Don't get me wrong -- resolving [[Primeval Titan]] is a blast. [[Through the Breach:Breaching]] it it even better. I'm not looking to give that up. But when a game goes sideways -- [[Blood Moon]], [[Surgical Extraction]], [[Leyline of Sanctity]] -- I want to see more cards, maximize my options, and figure out a way to win anyway. Specifically, I'm curious about [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]].

![Valakut Preference Poll](/assets/images/valakut-poll-16x9.png)
*A poll of the Valakut group on Facebook gives a sense for the conventional wisdom. [[Cinder Glade]] is strongly preferred over [[Sheltered Thicket]].*

In both [Titan Breach](https://www.mtggoldfish.com/archetype/modern-titan-breach#paper) and [Titan Shift](https://www.mtggoldfish.com/archetype/modern-titanshift-46457#paper), the conventional wisdom strongly prefers [[Farseek]] over [[Explore]]. [[Farseek]] is a reliable ramp spell, while [[Explore]] sometimes whiffs. Similarly, [[Cinder Glade]] is widely played and [[Sheltered Thicket]] is a fringe one-of. [[Cinder Glade]] typically enters the battlefield untapped from turn three onward, while [[Sheltered Thicket]] can be an awkward topdeck when we need the sixth mana for a [[Primeval Titan:Titan]].

But [[Explore]] and [[Sheltered Thicket]] have three important words that [[Farseek]] and [[Cinder Glade]] don't: "draw a card." Early on, drawing an extra card can help us assemble an explosive win on turn three or four. Later on, drawing a card digs us that much closer to a sideboard card or finisher -- especially if our opponent has managed to keep [[Valakut, the Molten Pinnacle:Valakut]] offline. The question is, if we want the flexibility, how does it affect our speed?

## The Model

This is where the computer comes in. I've written a numerical model (code available on GitHub [here](https://github.com/charles-uno/valakut)) that can read in a deck list, simulate thousands of games, and tell us exactly how fast that list can expect to land a [[Primeval Titan]] or [[Scapeshift]]. The model doesn't know anything about sequencing or strategy. Instead, it tries all possible combinations of legal plays and keeps whichever one wins fastest. This approach is computationally inefficient, but it's guaranteed to find the fastest way to win, even when faced with nontrivial choices.

For example, on turn two, we often have to choose between casting [[Sakura-Tribe Elder:STE]] and [[Explore]]. An experienced player can generally eyeball it, but spelling out the decision explicitly for the computer is tedious and error-prone. We'd have to make a calculation based on how many lands are in our hand, whether we need a second green source, how many live draws we have to make turn-three [[Through the Breach:Breach]] (or [[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]]), and so on. Instead of all that, we just make two copies of the game. One plays [[Sakura-Tribe Elder:STE]] and the other plays [[Explore]]. If *either* copy pulls off turn-three [[Through the Breach:Breach]], it's pretty safe to say a human player could have done the same.

The big caveat is shuffling. The computer is programmed to try all possible options to find the one that wins fastest. But shuffling at just the right time to blind-draw into better cards isn't luck or skill -- it's cheating. So once the game starts, the order of the deck is locked in. There are no mulligans. And any time the computer would search its deck for a [[Forest]], instead it leaves the deck as-is and creates a new [[Forest]] out of thin air. This means neglecting deck thinning, a percent-level[^10] effect.

[^10]: About one land is thinned from the deck each turn. We simulate out to turn four. That means the model draws about one too many lands (and one too few spells) every twenty games. A quick estimate suggests the difference matters less than half the time.

## Titan Shift

The most common [[Valakut, the Molten Pinnacle:Valakut]] deck is [Titan Shift](https://www.mtggoldfish.com/archetype/modern-titanshift-46457#paper), named after [[Primeval Titan]] and [[Scapeshift]].









## Titan Breach

We'll use the following list for Titan Breach.

this is the all-in Valakut deck which can win as early as T3

aside: SSG. look at farseek, cinder glade



We compare [[Cinder Glade]] and [[Sheltered Thicket]] using the following list for Titan Breach, not so different from what we used the last time around. Notably, six slots are reserved for interaction: 3 [[Anger of the Gods]] and 3 [[Lightning Bolt]]. These could just as easily be [[Flame Slash]], [[Obstinate Baloth]], [[Reclamation Sage]], and so on. They don't directly contribute to getting [[Primeval Titan:Titan]] on the table, so as far as the simulation is concerned they're blanks.





<table class="cardlist">
    <caption class="deckname">Titan Breach</caption>
    <tr>
        <td>
            3 [[Anger of the Gods]]<br>
            4 [[Explore]] or [[Farseek]]<br>
            3 [[Lightning Bolt]]<br>
            4 [[Primeval Titan]]<br>
            4 [[Sakura-Tribe Elder]]<br>
            4 [[Search for Tomorrow]]<br>
            4 [[Simian Spirit Guide]]<br>
            4 [[Summoner's Pact]]<br>
            4 [[Through the Breach]]<br>
        </td>
        <td>
			1 [[Blighted Woodland]]<br>
            4 [[Cinder Glade]] or [[Sheltered Thicket]]<br>
            2 [[Forest]]<br>
            7 [[Mountain]]<br>
            4 [[Stomping Ground]]<br>
            4 [[Valakut, the Molten Pinnacle]]<br>
            4 [[Wooded Foothills]]<br>
        </td>
    </tr>
</table>




| Breach Build               | T3   | ≤ T3.5 | ≤ T4   | ≤ T4.5 |
|:---------------------------|:----:|:------:|:------:|:------:|
| Explore, Cinder Glade      | 11%  | 16%    | 38%    | 59%    |
| Farseek, Cinder Glade      | 12%  | 16%    | 38%    | 60%    |
| Explore, Sheltered Thicket | 10%  | 14%    | 40%    | 61%    |
| Farseek, Sheltered Thicket | 10%  | 14%    | 40%    | 62%    |


...


| Breach Build               | T3   | ≤ T3.5 | ≤ T4   | ≤ T4.5 |
|:---------------------------|:----:|:------:|:------:|:------:|
| Explore, "Slow Taiga"      | 11%  | 14%    | 36%    | 59%    |
| Farseek, "Slow Taiga"      | 10%  | 13%    | 36%    | 58%    |
| Explore, Taiga             | 13%  | 19%    | 41%    | 62%    |
| Farseek, Taiga             | 13%  | 18%    | 39%    | 61%    |








It probably depends on how many lands are in your hand, if you need to find another green source for your turn-three plays, what else is in your deck, and so on. Spelling out each step of the decision tree explicitly would be [just about impossible](https://arxiv.org/pdf/1904.09828.pdf). So instead we make two copies of the game and try both ways in parallel.





## Titan Breach












| Build                      | T3   | ≥ T3.5 | ≥ T4   | ≥ T4.5 |
|:---------------------------|:----:|:------:|:------:|:------:|
| Explore, Cinder Glade      | 11%  | 16%    | 38%    | 59%    |
| Explore, Sheltered Thicket | 10%  | 14%    | 40%    | 61%    |
| Explore, "Slow Taiga"      | 11%  | 14%    | 36%    | 59%    |
| Explore, Taiga             | 13%  | 19%    | 41%    | 62%    |

| Build                      | T3   | ≥ T3.5 | ≥ T4   | ≥ T4.5 |
|:---------------------------|:----:|:------:|:------:|:------:|
| Farseek, Cinder Glade      | 12%  | 16%    | 38%    | 60%    |
| Farseek, Sheltered Thicket | 10%  | 14%    | 40%    | 62%    |
| Farseek, "Slow Taiga"      | 10%  | 13%    | 36%    | 58%    |
| Farseek, Taiga             | 13%  | 18%    | 39%    | 61%    |










---

---

---

---

more late-game options without sacrificing early-game consistency
