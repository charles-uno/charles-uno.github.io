---
layout: post
title: "PRIME TIME"
image: "/assets/images/pt-rix-thumb.png"
description: ""
keywords:
---

I played my first match of Modern in September. Two months later, I won a Modern RPTQ and tickets to Spain for the Pro Tour. Despite a few embarrassing punts, I piloted [Titan Breach](https://www.mtggoldfish.com/deck/923196#paper) to a 6-4 finish -- pretty good for a guy who's never even made Day 2 of a GP!







---

As *Magic: the Gathering* players go, I'm mediocre. My practice schedule is (at best) sporadic, and I find full-day tournaments exhausting. But, through a combination of good luck and number crunching, I scored an invite to [Pro Tour Rivals of Ixalan](https://magic.wizards.com/en/events/premierplay/protour/ptrix) in Bilbao, Spain -- and even came away with a winning record in Modern[^1]!

[^1]: My Modern record was 6-4, despite punting several relevant games due to fatigue. My drafts, on the other hand, were a bloodbath. I was unfamiliar with a powerful archetype, and I got run over by it, going 1-4-1.

After spiking a PPTQ in September, I coded a simulation of my deck in Python[^3]. The computer's better-than-perfect play (more on this in a moment) then allowed me to compare dozens of variations of the deck by [goldfishing](https://mtg.gamepedia.com/Goldfishing) millions of games. I found a few flaws in the conventional wisdom, and see a few paths for the deck going forward.

[^3]: Code is visible on GitHub [here](https://github.com/charles-uno/valakut/blob/master/driver.py). Comments and pull requests welcome!


Matthias[^2].

[^2]: Matthias Hunt, of [Amulet Bloom](http://www.starcitygames.com/article/28042_Amulet-Combo-Primer.html) notoriety.



---


## The Deck

The deck is Titan Breach, an all-in cousin of Scapeshift. A good draw can win the game on T3 by [[Through the Breach:Breaching]] a [[Primeval Titan:Titan]] and repeatedly triggering [[Valakut, the Molten Pinnacle]]. It's also possible to use [[Simian Spirit Guide]] to hard-cast [[Primeval Titan]] on T3; this doesn't win outright, but it sets up a board state few opponents can overcome.

Before we get into modeling and optimization, let's establish a baseline. Assuming the "flex slots" are blanks, the the build below can land a T3 [[Primeval Titan]] in about 33% of games (22% on the play, 44% on the draw). Hands without a T3 [[Primeval Titan:Titan]] almost always (88%) have one on T4, which can still be good enough, but is considerably more "fair."

<table class="cardlist">
    <caption class="deckname">Baseline Titan Breach</caption>
    <tr>
        <td>
            3 [[Anger of the Gods]]<br>
            4 [[Explore]]<br>
            4 [[Primeval Titan]]<br>
            4 [[Sakura-Tribe Elder]]<br>
            4 [[Search for Tomorrow]]<br>
            4 [[Simian Spirit Guide]]<br>
            4 [[Summoner's Pact]]<br>
            4 [[Through the Breach]]<br>
            4 ???<br>
        </td>
        <td>
            1 [[Cinder Glade]]<br>
            1 [[Forest]]<br>
            7 [[Mountain]]<br>
            4 [[Stomping Ground]]<br>
            4 [[Valakut, the Molten Pinnacle]]<br>
            4 [[Windswept Heath]]<br>
            4 [[Wooded Foothills]]<br>
        </td>
    </tr>
</table>

The conventional wisdom prefers [[Farseek]], but we play [[Explore]]. The danger of whiffing is more than made up for by the chance to find a missing [[Through the Breach]] or [[Simian Spirit Guide]]. [[Explore]] and [[Farseek]] are equally good at delivering a T3 [[Primeval Titan:Titan]] on the play (22%), but [[Explore]] (44%) is a few points better than [[Farseek]] (42%) on the draw.

[[Anger of the Gods]] could just as easily be [[Lightning Bolt]], [[Relic of Progenitus]], or [[Chalice of the Void]]. These cards don't help make a T3 [[Primeval Titan:Titan]]. Instead, they serve essentially as three extra sideboard slots, allowing us to kneecap a faster opponent or break open a stalled board.

If we like, we can use our four "flex slots" to bump our interactive suite out to seven cards, but it seems like a waste to do so. If we wanted to sleeve up a bunch of removal and value creatures, we'd play Jund. We're playing Titan Breach because we like to steal games with T3 [[Primeval Titan]]. Let's see how often we can make that happen.

## The Model

Unlike [Frank Karsten](https://www.channelfireball.com/articles/how-reliable-is-hollow-one/), we haven't got the patience or play skill to spell out explicitly how the computer should sequence its plays. Instead, we use brute force. Every time the computer has a choice between multiple plays, it makes that many copies of the game state and tries them all. 

The computer makes thousands[^6] of copies of each hand. Each copy is played differently, and most of those plays are wrong. For example, one copy passes its first turn without playing a land. Another exiles [[Simian Spirit Guide]] right away, even if there's nothing to cast with it. The upside of this approach is that it can determine with 100% accuracy whether a hand can produce a T3 [[Primeval Titan]]. 

[^6]: Playing *Magic* by brute force would be impossibly slow to do by hand, but it's pretty quick on a computer. A laptop can churn through 100k hands overnight. That's like goldfishing one hand per minute for two months straight. 

It bears noting that the computer is actually a little *too* good. Playing every possible line and keeping the best one allows it to exhibit better-than-perfect play. For example, the model doesn't have to commit to a mulligan based on its seven-card hand; it gets to play out that hand, then play out its six-card hand, then play out its five-card hand, and keep whichever turns out best.





Shuffling is a problem for our brute force solution, so we don't do it. 




Solving hands by brute force means shuffling is a problem. Imagine we have a [[Wooded Foothills]] on the battlefield and a [[Street Wraith]] in our hand. 









Using a brute force solution also requires that we make a simplifying assumption: no shuffling. 







```
baseline-explore     K  :  10849 trials ;  26.6%  ±   0.7%  ;  48.8%  ±   1.0%  ;  37.3%  ±   0.6%
baseline-explore     M  :   8327 trials ;  22.4%  ±   0.7%  ;  46.0%  ±   1.0%  ;  34.5%  ±   0.6%
baseline-explore     MM :   4290 trials ;  11.7%  ±   0.8%  ;  34.8%  ±   1.2%  ;  24.2%  ±   0.8%
baseline-explore     -  :  23466 trials ;  22.7%  ±   0.4%  ;  45.0%  ±   0.6%  ;  33.9%  ±   0.4%

baseline-farseek     K  :  11304 trials ;  25.0%  ±   0.7%  ;  44.8%  ±   0.9%  ;  34.6%  ±   0.6%
baseline-farseek     M  :   9203 trials ;  22.2%  ±   0.7%  ;  42.0%  ±   0.9%  ;  32.3%  ±   0.6%
baseline-farseek     MM :   4790 trials ;  10.7%  ±   0.7%  ;  32.0%  ±   1.1%  ;  22.3%  ±   0.7%
baseline-farseek     -  :  25297 trials ;  21.5%  ±   0.4%  ;  41.2%  ±   0.6%  ;  31.4%  ±   0.4%

try-hour             K  :  11755 trials ;  48.4%  ±   0.9%  ;  71.0%  ±   1.1%  ;  59.2%  ±   0.7%
try-hour             M  :   9687 trials ;  44.2%  ±   1.0%  ;  68.1%  ±   1.2%  ;  56.5%  ±   0.8%
try-hour             MM :   4929 trials ;  32.4%  ±   1.2%  ;  61.0%  ±   1.5%  ;  47.4%  ±   1.0%
try-hour             -  :  26372 trials ;  44.1%  ±   0.6%  ;  68.0%  ±   0.7%  ;  56.0%  ±   0.5%

try-oath             K  :   9213 trials ;  35.8%  ±   0.9%  ;  60.0%  ±   1.2%  ;  47.4%  ±   0.7%
try-oath             M  :   7298 trials ;  30.2%  ±   0.9%  ;  57.3%  ±   1.2%  ;  43.9%  ±   0.8%
try-oath             MM :   3489 trials ;  19.2%  ±   1.1%  ;  49.3%  ±   1.6%  ;  35.5%  ±   1.0%
try-oath             -  :  20000 trials ;  31.1%  ±   0.6%  ;  57.0%  ±   0.8%  ;  44.1%  ±   0.5%

try-ritual           K  :  10945 trials ;  51.2%  ±   0.9%  ;  72.2%  ±   1.2%  ;  61.3%  ±   0.7%
try-ritual           M  :   8564 trials ;  47.5%  ±   1.1%  ;  69.0%  ±   1.3%  ;  58.4%  ±   0.8%
try-ritual           MM :   4047 trials ;  31.3%  ±   1.3%  ;  63.6%  ±   1.7%  ;  48.5%  ±   1.1%
try-ritual           -  :  23556 trials ;  46.7%  ±   0.6%  ;  69.4%  ±   0.8%  ;  58.1%  ±   0.5%

try-visions          K  :   7521 trials ;  38.2%  ±   1.0%  ;  62.6%  ±   1.3%  ;  50.0%  ±   0.8%
try-visions          M  :   5871 trials ;  31.6%  ±   1.0%  ;  58.6%  ±   1.4%  ;  45.1%  ±   0.9%
try-visions          MM :   2699 trials ;  17.7%  ±   1.2%  ;  50.6%  ±   1.9%  ;  35.7%  ±   1.1%
try-visions          -  :  16091 trials ;  32.7%  ±   0.6%  ;  58.9%  ±   0.9%  ;  45.8%  ±   0.5%

try-wraith           K  :   9140 trials ;  37.7%  ±   0.9%  ;  60.6%  ±   1.2%  ;  48.5%  ±   0.7%
try-wraith           M  :   7281 trials ;  30.8%  ±   0.9%  ;  58.3%  ±   1.3%  ;  44.6%  ±   0.8%
try-wraith           MM :   3579 trials ;  19.3%  ±   1.1%  ;  48.3%  ±   1.6%  ;  35.0%  ±   1.0%
try-wraith           -  :  20000 trials ;  32.2%  ±   0.6%  ;  57.3%  ±   0.8%  ;  44.7%  ±   0.5%
```











---

---

---






The singleton [[Blighted Woodland]] is a bit unconventional, but I'm confident it's correct. The deck often burns through its whole hand to get [[Primeval Titan]] on the table, but doesn't have enough Mountains to win on the spot. This can happen if we've drawn our basic [[Forest]], been hit by [[Spreading Seas]], or used [[Simian Spirit Guide]] to cheat on mana. In those situations, tutoring up a [[Blighted Woodland]] often allows us to win as soon as we untap -- even if we topdeck a blank, even if our opponent has a counterspell, and even if we're supposed to use all our green mana to pay for [[Summoner's Pact]].

[[Explore]] is also unusual. Most lists play [[Farseek]] instead. With 25 lands, both are equally good (XX%) at producing a T3 haymaker. But with [[Blighted Woodland]] as a 26th land, [[Explore]] is a few points better than [[Farseek]] (39% versus 37%). [[Explore]] sometimes whiffs, which can be frustrating, but it also has a chance to draw us into a missing [[Through the Breach]] or [[Simian Spirit Guide]]. We can also use [[Explore]] to play a tapped [[Cinder Glade]] or [[Valakut, the Molten Pinnacle:Valakut]] without throwing off our curve.

## The Model














As a general rule, if you want to see something every game, you should play eight copies in a sixty-card deck. We always want a ramp spell on T2, so we play four [[Sakura-Tribe Elder]] and four [[Explore]]. We can't always have a [[Search for Tomorrow]] on T1, so we play a set of [[Simian Spirit Guide]] to fake it. [[Summoner's Pact]] is basically [[Primeval Titan]] five through eight.

We'd play eight copies of [[Through the Breach]] if we could, but unfortunately there's no substitute.

In the Rock-Paper-Scissors of Modern matchups, Titan Breach is a slow proactive deck (like Tron and Dredge). Slow proactive decks are generally good against reactive decks (like Jund and Jeskai) because they're hard to disrupt; [[Fatal Push]] and [[Path to Exile]] don't do much when my win condition is a land. On the other hand, slow proactive decks have trouble with fast proactive decks (like Storm and Infect); we can't race them, and we can't reliably slow them down.

Flex slots are typically used to include disruption -- [[Lightning Bolt]], [[Anger of the Gods]], [[Relic of Progenitus]] -- in hopes of kneecapping a faster opponent. Some players like to also play an extra haymaker or two: [[Woodfall Primus]], [[Scapeshift]], or (recently) [[Hour of Promise]].

Matthias' list, the one that carried me through the PPTQ, was unusual in that four of those slots were [[Oath of Nissa]]. As he puts it, this isn't a control deck, and it's not a [[Through the Breach:Breach]] deck. It's a combo deck, and the combo is [[Primeval Titan]]. You don't cut [[Oath of Nissa:Oath]] from Titan Breach just like you don't cut [[Serum Visions]] from Storm.

That's quite the claim; let's put it to the test. If our goal is to cast or [[Through the Breach:Breach]] a [[Primeval Titan]] on T3, how does a set of cantrips affect our reliability -- and how does that compare to our other options?


Farseek: 27% / 47% / 37%

| Slot 57-60        | T3 Play | T3 Draw | T3 Average |
|:------------------|:-------:|:-------:|:----------:|
| Lightning Bolt    | 28%     | 50%     | 39%        |
| Deadshot Minotaur | %     | %     | %        |
| Desperate Ritual  | 55%     | 78%     | 67%        |
| Hour of Promise   | 49%     | 70%     | 60%        |
| Oath of Nissa     | 37%     | 62%     | 49%        |
| Serum Visions     | %     | %     | %        |
| Street Wraith     | 38%     | 62%     | 50%        |

<p class="table-caption">Odds to cast or [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] (or other haymaker) on T3, based on the "flex slots" in the above decklist. All values rounded. Uncertainties are within about 1%.</p>

The baseline (six blanks) is about one-in-three to land a T3 [[Primeval Titan:Titan]]; a set of [[Oath of Nissa:Oaths]] (and two blanks) bumps that number up to fifty-fifty. Put another way, [[Oath of Nissa:Oath]] is worth an extra T3 [[Primeval Titan:Titan]] about every three rounds.

[[Oath of Nissa]] is about on par with a zero-mana cycler like [[Street Wraith]], which serves as a sort of control. The model doesn't care about life loss, so it's just a zero-mana cycler. [[Oath of Nissa:Oath]] also falls just shy of [[Serum Visions]], color aside, which is consistently one of the [most-played cards in Modern](https://www.mtggoldfish.com/format-staples/modern).

Serum Visions sculpts draws for combo and grind. we care about both. explosive power and also keeping mountains in our deck to fetch.

These numbers don't tell the whole story, of course. [[Lightning Bolt]] isn't actually blank; sometimes it steals a game by zapping [[Goblin Electromancer]] or [[Devoted Druid]].

But if we're all-in on [[Primeval Titan]], and we want to sculpt our draws

[[Oath of Nissa]] performs comparably to [[Street Wraith]], which serves as a sort of control -- this model doesn't care about the life loss,

Sometimes [[Lightning Bolt]] will turn a game by zapping [[Goblin Electromancer]], [[Karn Liberated]], or [[Devoted Druid]].

- Added resiliency. Against discard-based decks, it helps us find another Titan. Against super grindy decks, it helps us draw fetches instead of mountains.
- Never blank. Some decks don't care about Anger or Relic.


## Simplifying Assumption: Better-than-Perfect Play

## Simplifying Assumption: Shuffling

## Explore vs Farseek

it bears noting that our baseline list runs explore over farseek... the difference is huge with a 1-mana cantrip, but still present always.


## Blighted Woodland

Having played a lot of games with [[Oath of Nissa]], I can tell you that it's usually fine. Once in a while it finds exactly what you need, and once in a while it whiffs. I can also tell you that it would take hundreds (or perhaps thousands) of games to

[^9]: Compared to Scapeshift, Titan Breach is a bit better against counterspell-based decks (because Through the Breach is an instant), but a bit worse against discard-based decks (because Through the Breach doesn't do anything if you make me discard Primeval Titan).
