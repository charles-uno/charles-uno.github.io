---
layout: post
title: "Measure Twice, Valakut Once"
image: "/assets/images/thumb/sheltered-thicket-sung-choi.png"
description: "Don't underestimate the power of \"draw a card.\""
tags: games stem
---

A while back, I wrote a computer simulation of [Titan Breach](https://www.mtggoldfish.com/archetype/modern-titan-breach#paper) -- a semi-mainstream [[Valakut, the Molten Pinnacle:Valakut]] deck in Modern. My [writeup](/titan-breach-simulation/) looked at how different card choices affected the deck's speed and consistency. In particular, I looked at [[Farseek]] versus [[Explore]]. Conventional wisdom prefers [[Farseek]] for its reliability. But if the goal is to land a T3 [[Primeval Titan]] as often as possible, it turns out [[Explore]] is a bit better. The risk of whiffing is more than made up for by the chance to draw a missing combo piece: [[Primeval Titan:Titan]], [[Through the Breach:Breach]], or [[Simian Spirit Guide:SSG]].

The question today is similar, but instead of [[Farseek]] versus [[Explore]] we're looking at [[Cinder Glade]] versus [[Sheltered Thicket]]. The two lands fill a similar role. They're both typed duals[^1], and neither can be used to suspend a T1 [[Search for Tomorrow]]. Conventional wisdom prefers [[Cinder Glade]] for its reliability. It typically enters the battlefield untapped from T3 onward. It's widely played in both [Titan Breach](https://www.mtggoldfish.com/archetype/modern-titan-breach#paper) and [Titan Shift](https://www.mtggoldfish.com/archetype/modern-titanshift-46457#paper). On the other hand, [[Sheltered Thicket]] always enters the battlefield tapped, which can sometimes make it an awkward topdeck. It's rarely played.

[^1]: A *typed* dual land has two basic land types, in this case Forest and Mountain, as opposed to a non-typed dual land like [[Raging Ravine]] or [[Kazandu Refuge]]. This is important because most of the spells in the deck require green mana, but [[Valakut, the Molten Pinnacle:Valakut]] only works with Mountains.

But [[Sheltered Thicket]] also has cycling. If you don't want it, you can pay a cost and discard it to draw something else. This doesn't come up much in the early game, when resources are tight, but the flexibility is very powerful in the late game. In fact, I'd go so far as to say that [[Sheltered Thicket]] is clearly better after about T6. By that point we should have plenty of mana, so coming into play tapped or untapped is not really a concern. The question is: how much better is [[Cinder Glade]] in the early game?

## The Model

The model[^4] we're using is essentially the same one as [last time](/titan-breach-simulation). For each simulation, it shuffles up, draws an opening hand, then attempts all possible sequences of legal plays until it finds a way to get [[Primeval Titan]] onto the table. This strategy is computationally inefficient, but it's guaranteed to find the best possible sequence of plays for every opening hand.

[^4]: The original model, written in Python, is available on GitHub [here](https://github.com/charles-uno/valakut-python). As an exercise, I went back and rewrote it in Go [here](https://github.com/charles-uno/valakut). Pull requests are welcome on either repo!

Sometimes the computer is a bit *too* good. For example, if it plays [[Explore]] and doesn't like what it draws, it essentially gets to rewind and play [[Sakura-Tribe Elder]] instead. This effect is generally[^5] not a big deal -- there honestly aren't that many choices to make when goldfishing with a [[Valakut, the Molten Pinnacle:Valakut]] deck -- but it does mean the numbers we get reflect upper bounds rather than typical play.

[^5]: The big issue with this model is shuffling. Playing all possible lines exhaustively means the computer will always find the best sequence of plays. But fetching so you can shuffle and blind-draw the optimal card isn't luck or skill -- it's cheating. We mitigate this effect by getting rid of randomness. Instead of fetching a [[Forest]] out of the deck and shuffling, we leave the deck as it is and create a new [[Forest]] out of thin air. This means we neglect deck thinning, a percent-level effect.

## Titan Breach

We compare [[Cinder Glade]] and [[Sheltered Thicket]] using the following list for Titan Breach, not so different from what we used the last time around:

<table class="cardlist">
    <caption class="deckname">Titan Breach</caption>
    <tr>
        <td>
            3 [[Anger of the Gods]]<br>
            4 [[Explore]]<br>
            3 [[Lightning Bolt]]<br>
            4 [[Primeval Titan]]<br>
            4 [[Sakura-Tribe Elder]]<br>
            4 [[Search for Tomorrow]]<br>
            4 [[Simian Spirit Guide]]<br>
            4 [[Summoner's Pact]]<br>
            4 [[Through the Breach]]<br>
        </td>
        <td>
            4 ???<br>
            2 [[Forest]]<br>
            8 [[Mountain]]<br>
            4 [[Stomping Ground]]<br>
            4 [[Valakut, the Molten Pinnacle]]<br>
            4 [[Wooded Foothills]]<br>
        </td>
    </tr>
</table>

We simulate 10k games using 4 [[Cinder Glade]] in the slots marked "???" then simulate another 10k games with [[Sheltered Thicket]] in those slots. The other 56 cards[^2] remain unchanged. We also look at a pair of controlled variables: [[Taiga]] (which always enters the battlefield untapped) and "Slow Taiga" (which always enters tapped). This will allow us to disentangle the advantage of cycling from the disadvantage of always entering the battlefield tapped.

[^2]: The list reserves 6 slots for interaction: [[Anger of the Gods]] and [[Lightning Bolt]]. This number is about typical. These slots could just as easily be [[Flame Slash]], [[Obstinate Baloth]], [[Reclamation Sage]], etc. They don't contribute to getting [[Primeval Titan:Titan]] on the table, so as far as the simulation is concerned they're blanks.

The numbers shake out as follows:

| Land                  | T3   | ≥ T3.5 | ≥ T4   | ≥ T4.5 |
|:----------------------|:----:|:------:|:------:|:------:|
| [[Cinder Glade]]      | 21%  | 29%    | 59%    | 82%    |
| [[Sheltered Thicket]] | 20%  | 27%    | 60%    | 84%    |
|  "Slow Taiga"         | 20%  | 27%    | 58%    | 81%    |
| [[Taiga]]             | 23%  | 32%    | 61%    | 83%    |

<p class="table-caption">T3 is the odds to [[Through the Breach:Breach]] on T3, which wins on the spot. T3.5 refers to hard-casting [[Primeval Titan:Titan]] on T3, which often stabilizes the board right away, but doesn't win until the next turn. Values are cumulative, so "≥T4" is the odds to <em>at worst</em> cast [[Through the Breach:Breach]] on T4. All values ±1%.</p>

In terms of getting [[Primeval Titan:Titan]] on the table on T3, [[Sheltered Thicket]] is basically the same as "Slow Taiga." This rings true. It's technically possible for cycling on T2 to set us up for a big T3, but things have to line up *perfectly*[^3] -- which happens in less than 1% of games.

[^3]: Cycling helps set up T3 in only the exact following situation: T1 suspend [[Search for Tomorrow:Search]] into T2 cycle [[Sheltered Thicket]] into T3 [[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]], with untapped lands all three turns.

We can also see that [[Cinder Glade]] is better than "Slow Taiga" across the board, but worse than [[Taiga]]. This is a nice sanity check. If [[Cinder Glade]] ever performed better than [[Taiga]], we'd know something was wrong with the simulation.

What's striking is how close all the numbers are to one another. The difference between [[Taiga]] and "Slow Taiga" comes up once per 20 to 30 games. And [[Cinder Glade]] and [[Sheltered Thicket]] are even closer. In terms of getting [[Primeval Titan:Titan]] on the table on T3, [[Cinder Glade]] is better than [[Sheltered Thicket]] about once every 50 games. It just doesn't matter that much whether lands 23 to 26 enter the battlefield tapped or not.

## Titan Shift

We can run a similar experiment with Titan Shift, using the list below. As before, we run 10k simulations with [[Cinder Glade]] in the slots marked "???" then another 10k simulations with each of [[Sheltered Thicket]], "Slow Taiga," and [[Taiga]].

<table class="cardlist">
    <caption class="deckname">Titan Shift</caption>
    <tr>
        <td>
            4 [[Anger of the Gods]]<br>
            3 [[Explore]]<br>
            3 [[Farseek]]<br>
            3 [[Lightning Bolt]]<br>
            2 [[Prismatic Omen]]<br>
            4 [[Primeval Titan]]<br>
            4 [[Sakura-Tribe Elder]]<br>
            4 [[Scapeshift]]<br>
            4 [[Search for Tomorrow]]<br>
            2 [[Summoner's Pact]]<br>
        </td>
        <td>
            4 ???<br>
            3 [[Forest]]<br>
            6 [[Mountain]]<br>
            4 [[Stomping Ground]]<br>
            4 [[Valakut, the Molten Pinnacle]]<br>
            2 [[Windswept Heath]]<br>
            4 [[Wooded Foothills]]<br>
        </td>
    </tr>
</table>

The numbers tell more or less the same story as with Titan Breach.

| Land                  | T4   | ≥ T4.5 | ≥ T5   | ≥ T5.5 |
|:----------------------|:----:|:------:|:------:|:------:|
| [[Cinder Glade]]      | 28%  | 64%    | 78%    | 91%    |
| [[Sheltered Thicket]] | 29%  | 66%    | 80%    | 93%    |
|  "Slow [[Taiga]]"     | 27%  | 63%    | 77%    | 91%    |
| [[Taiga]]             | 29%  | 66%    | 80%    | 92%    |

<p class="table-caption">T4 is the odds to [[Scapeshift]] on T4, which wins on the spot. T4.5 refers to hard-casting [[Primeval Titan:Titan]] on T4, which often stabilizes the board right away, but doesn't win until the next turn. Values are cumulative, so "≥T5" is the odds to <em>at worst</em> cast [[Scapeshift]] on T5. All values ±1%.</p>

[[Taiga]] and "Slow Taiga" behave similarly. The difference comes up about once every 50 games. [[Cinder Glade]] is about halfway between them -- it's only better than "Slow Taiga" about once every 100 games. And as the game goes on, the ability to cycle [[Sheltered Thicket]] becomes more and more of an advantage.

## Caveats and Conclusions

The Titan Shift numbers suggest that by T5, [[Sheltered Thicket]] is better than [[Taiga]]. There's reason to be skeptical. As noted above, the model plays each game every possible way and keeps the best outcome. If the model cycles [[Sheltered Thicket]] and doesn't like what it finds, it essentially gets to rewind and do something else instead. This means it has superhuman "luck" in terms of drawing exactly what it needs.

But I think it's still fair to say that the conventional wisdom undervalues [[Sheltered Thicket]] -- or perhaps overvalues [[Cinder Glade]]. In 98% of games, [[Cinder Glade]] will enter the battlefield tapped, or it'll enter untapped at a time when it doesn't matter. It's only that other 2% of games where [[Cinder Glade]] enters the battlefield untapped at a crucial time. Once out of 50 games.

The upside on [[Sheltered Thicket]] is harder to quantify. It'll rarely get cycled on T2 or T3, but in a game that goes long it helps you find a [[Primeval Titan:Titan]] or sideboard card that much faster. If you think that might save your bacon once out of 50 games, it's probably worth a try.
