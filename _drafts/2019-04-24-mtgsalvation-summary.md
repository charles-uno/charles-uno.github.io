---
layout: post
title: "Deck Chairs on the Titanic"
image: "/assets/images/thumb/pt-rix.png"
description: "What do we learn by simulating a million hands of Valakut?"
tags: games stem
---

The first Modern tournament I ever played was a PPTQ. I won it, despite knowing nothing about the format. Then I won the RPTQ and tickets to [Spain](https://magic.wizards.com/en/events/premierplay/protour/ptrix). Despite a few embarrassing punts, I managed a 6-4 finish in the Modern portion of the event, competing against players much more serious than I am. The secret behind my success, honestly, was [[Valakut, the Molten Pinnacle:Valakut]]. The deck is resilient and redundant, making it incredibly friendly to beginners. All the cards are basically lands. You just keep putting them on the table until your opponent concedes. Half the time you don't even have to understand what they're playing!

The downside of "resilient and redundant" is that the deck can get repetitive. Everything happens at sorcery speed. There are no tricks to dig for, or cantrips to dig with. As I learned the format, I could anticipate my opponents' tricks and guess their sideboard choices. But you wouldn't know it from my plays: ramp spell, ramp spell, ramp spell, [[Primeval Titan]].

Don't get me wrong -- resolving [[Primeval Titan]] is a blast. [[Through the Breach:Breaching]] it it even better. I'm not looking to give that up. But when a game goes sideways -- [[Blood Moon]], [[Surgical Extraction]], [[Leyline of Sanctity]] -- I want to see more cards, maximize my options, and figure out a way to win anyway. Specifically, I'm curious about [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]].

![Valakut Preference Poll](/assets/images/valakut-poll-16x9.png)
*A poll of the Valakut group on Facebook gives a sense for the conventional wisdom. [[Cinder Glade]] is strongly preferred over [[Sheltered Thicket]].*

In both [Titan Breach](https://www.mtggoldfish.com/archetype/modern-titan-breach#paper) and [Titan Shift](https://www.mtggoldfish.com/archetype/modern-titanshift-46457#paper), the conventional wisdom strongly prefers [[Farseek]] over [[Explore]]. [[Farseek]] is a reliable ramp spell, while [[Explore]] sometimes whiffs. Similarly, [[Cinder Glade]] is widely played and [[Sheltered Thicket]] is a fringe one-of. [[Cinder Glade]] typically enters the battlefield untapped from turn three onward, while [[Sheltered Thicket]] can be an awkward topdeck when we need the sixth mana for a [[Primeval Titan:Titan]].

But [[Explore]] and [[Sheltered Thicket]] have three important words that [[Farseek]] and [[Cinder Glade]] don't: "draw a card." Early on, drawing an extra card can help us assemble an explosive win on turn three or four. Later on, drawing a card digs us that much closer to a sideboard card or finisher -- especially if our opponent has managed to keep [[Valakut, the Molten Pinnacle:Valakut]] offline. The question is, if we want the flexibility, how does it affect our speed?

## The Model

This is where the computer comes in. I've written a numerical model (code available on GitHub [here](https://github.com/charles-uno/valakut)) that can read in a deck list, simulate thousands of games, and tell us exactly how fast that list can expect to land a [[Primeval Titan]] or [[Scapeshift]]. The model doesn't know anything about sequencing or strategy. Instead, it tries all possible combinations of legal plays and keeps whichever one wins fastest. This approach is computationally inefficient, but it's guaranteed to find the fastest way to win, even when faced with nontrivial choices.

For example, on turn two, we often have to choose between casting [[Sakura-Tribe Elder:STE]] and [[Explore]]. An experienced player can generally eyeball it, but spelling out the decision explicitly for the computer is tedious and error-prone. We'd have to make a calculation based on how many lands are in our hand, whether we need a second green source, how many live draws we have to make turn-three [[Through the Breach:Breach]] (or [[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]]), and so on. Instead of all that, we just make two copies of the game. One plays [[Sakura-Tribe Elder:STE]] and the other plays [[Explore]]. If *either* copy pulls off turn-three [[Through the Breach:Breach]], it's pretty safe to say a human player could have done the same.

The big caveat is shuffling. The computer is programmed to try all possible options to find the one that wins fastest. But shuffling at just the right time to blind-draw into better cards isn't luck or skill -- it's cheating. So once the game starts, the order of the deck is locked in. There are no mulligans. And any time the computer would search its deck for a [[Forest]], instead it leaves the deck as-is and creates a new [[Forest]] out of thin air. This means neglecting deck thinning, a percent-level[^1] effect.

[^1]: About one land is thinned from the deck each turn. We simulate out to turn four. That means the model draws about one too many lands (and one too few spells) every twenty games. A quick estimate suggests the difference matters less than half the time.

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
