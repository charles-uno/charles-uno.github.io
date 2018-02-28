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

The computer makes thousands of copies of each hand. Each copy is played differently, and most of those plays are wrong. For example, one copy passes its first turn without playing a land. Another exiles [[Simian Spirit Guide]] right away, even if there's nothing to cast with it. The upside of this approach is that it can determine with 100% accuracy whether a hand can produce a T3 [[Primeval Titan]].

It bears noting that the computer is actually a little *too* good. Trying every possible line and keeping the best one allows it to exhibit better-than-perfect play. For example, the model doesn't have to commit to a mulligan based on its seven-card hand; it gets to play out that hand, then play out its six-card hand, then play out its five-card hand, and keep whichever turns out best[^8].

[^8]: The model is very aggressive about taking mulligans. It only keeps its seven-card hand about half the time.

Shuffling is also a problem. Imagine if we could crack a [[Wooded Foothills]] for a [[Stomping Ground]], then for a [[Cinder Glade]], then for a [[Mountain]] -- shuffling independently each time --  then compare the top card of each deck and keep the one we like best! As a workaround, whenever we would thin a land from the deck, instead we just create a new one out of thin air. This causes the model to slightly[^7] overestimate the odds of drawing a land as the game goes on.

[^7]: At the start of T3, if we have three lands in play and two in our hand, the computer thinks we have a 41% chance of drawing a land (21/51) this turn. But if we thinned our deck with a [[Wooded Foothills]] and a [[Search for Tomorrow]], that number should be 39% (19/49) instead. That's about a one-in-fifty chance of drawing a land that should have been a spell.

## The Contenders

The best Titan Breach hands all look about the same: T1 suspend [[Search for Tomorrow:Search]], T2 [[Sakura-Tribe Elder:Steve]]/[[Explore]], T3 [[Through the Breach:Breach]] into [[Summoner's Pact:Pact]]/[[Primeval Titan:Titan]]. With eight two-drop ramp spells and (essentially) eight [[Primeval Titan:Titans]], it's reasonably safe[^10] to expect one of each. The same can't be said for [[Search for Tomorrow]] or [[Through the Breach]]. Even with [[Simian Spirit Guide]] to fill in some gaps, we often have nothing to do on T1, or fall short on T3. 

[^10]: With four [[Summoner's Pact]] and four [[Primeval Titan]] in a sixty-card deck, we have a [65% chance](http://www.wolframalpha.com/input/?i=1+-+(52+choose+7)%2F(60+choose+7)) to see one in our opening seven, and a 77% chance to draw one by T3 ([75%](http://www.wolframalpha.com/input/?i=1+-+(52+choose+9)%2F(60+choose+9)) play, [79%](http://www.wolframalpha.com/input/?i=1+-+(52+choose+10)%2F(60+choose+10)) draw). With only four copies of [[Through the Breach]], we have only a [40% chance](http://www.wolframalpha.com/input/?i=1+-+(56+choose+7)%2F(60+choose+7)) to see one in our opening seven and a 51% chance to find one by T3 ([49%](http://www.wolframalpha.com/input/?i=1+-+(56+choose+7)%2F(60+choose+7)) play, [53%](http://www.wolframalpha.com/input/?i=1+-+(56+choose+10)%2F(60+choose+10)) draw). 

This suggests three different directions for the flex slots:

- More acceleration. [[Utopia Sprawl]] does a passable impression of [[Search for Tomorrow]]. [[Desperate Ritual]], like [[Through the Breach]], lets us cast [[Primeval Titan]] off five mana on T3.
- An alternative haymaker. If we have five mana on T3 but no [[Through the Breach]], what if we cast [[Hour of Promise]] instead? 
- Cantrips. If we don't have [[Search for Tomorrow]] on T1, let's instead use our first land drop to make sure T2 and T3 go as well as possible. [Matthias Hunt](http://www.starcitygames.com/events/coverage/rg_valakut_with_matthias_hunt.html) played [[Oath of Nissa]] in Titan Breach a while back; we can also check out [[Street Wraith]], [[Faithless Looting]], [[Ancient Stirrings]][^11], and even "colorshifted" [[Serum Visions]] for comparison. 



[^11]: On its face, [[Ancient Stirrings]] seems like an odd choice in this deck. Sometimes people like to play an [[Emrakul, the Aeons Torn:Emrakul]] or two, but otherwise the only colorless cards are lands. It actually plays surprisingly well. Finding [[Valakut, the Molten Pinnacle]] is valuable against permission-heavy opponents. Finding fetches (and leaving mountains in the deck) allows us to trigger [[Valakut, the Molten Pinnacle:Valakut]] at instant speed against [[Inkmoth Nexus:creature-lands]]. And many important sideboard cards are colorless: [[Chalice of the Void]], [[Engineered Explosives]], [[Relic of Progenitus]], [[Grafdigger's Cage]], etc. 











---

---




```
baseline-explore     K  :  27798 trials ;  26.7%  ±   0.4%  ;  48.2%  ±   0.6%  ;  37.0%  ±   0.4%
baseline-explore     M  :  21374 trials ;  21.9%  ±   0.5%  ;  44.7%  ±   0.6%  ;  33.6%  ±   0.4%
baseline-explore     MM :  10828 trials ;  11.5%  ±   0.5%  ;  35.2%  ±   0.8%  ;  24.3%  ±   0.5%
baseline-explore     -  :  60000 trials ;  22.5%  ±   0.3%  ;  44.4%  ±   0.4%  ;  33.5%  ±   0.2%

baseline-farseek     K  :  26903 trials ;  25.7%  ±   0.4%  ;  45.2%  ±   0.6%  ;  35.1%  ±   0.4%
baseline-farseek     M  :  21704 trials ;  21.9%  ±   0.5%  ;  42.2%  ±   0.6%  ;  32.2%  ±   0.4%
baseline-farseek     MM :  11393 trials ;  11.4%  ±   0.5%  ;  33.2%  ±   0.7%  ;  23.2%  ±   0.5%
baseline-farseek     -  :  60000 trials ;  21.8%  ±   0.3%  ;  41.6%  ±   0.4%  ;  31.8%  ±   0.2%

try-hour             K  :  17865 trials ;  48.2%  ±   0.7%  ;  70.6%  ±   0.9%  ;  58.9%  ±   0.6%
try-hour             M  :  14722 trials ;  44.1%  ±   0.8%  ;  67.5%  ±   1.0%  ;  55.9%  ±   0.6%
try-hour             MM :   7413 trials ;  33.0%  ±   1.0%  ;  61.9%  ±   1.3%  ;  48.3%  ±   0.8%
try-hour             -  :  40000 trials ;  44.0%  ±   0.5%  ;  67.7%  ±   0.6%  ;  55.8%  ±   0.4%

try-oath             K  :  18387 trials ;  36.0%  ±   0.6%  ;  59.3%  ±   0.8%  ;  47.2%  ±   0.5%
try-oath             M  :  14644 trials ;  30.5%  ±   0.6%  ;  57.1%  ±   0.9%  ;  43.9%  ±   0.5%
try-oath             MM :   6969 trials ;  19.1%  ±   0.8%  ;  49.2%  ±   1.1%  ;  35.4%  ±   0.7%
try-oath             -  :  40000 trials ;  31.3%  ±   0.4%  ;  56.6%  ±   0.5%  ;  43.9%  ±   0.3%

try-ritual           K  :  18487 trials ;  51.9%  ±   0.7%  ;  71.7%  ±   0.9%  ;  61.3%  ±   0.6%
try-ritual           M  :  14602 trials ;  46.9%  ±   0.8%  ;  69.7%  ±   1.0%  ;  58.5%  ±   0.6%
try-ritual           MM :   6911 trials ;  30.1%  ±   1.0%  ;  62.7%  ±   1.3%  ;  47.5%  ±   0.8%
try-ritual           -  :  40000 trials ;  46.6%  ±   0.5%  ;  69.3%  ±   0.6%  ;  57.9%  ±   0.4%

try-visions          K  :  13245 trials ;  38.1%  ±   0.7%  ;  61.4%  ±   1.0%  ;  49.3%  ±   0.6%
try-visions          M  :  10421 trials ;  32.0%  ±   0.8%  ;  58.7%  ±   1.1%  ;  45.4%  ±   0.7%
try-visions          MM :   4811 trials ;  18.5%  ±   0.9%  ;  50.6%  ±   1.4%  ;  36.1%  ±   0.9%
try-visions          -  :  28478 trials ;  32.9%  ±   0.5%  ;  58.4%  ±   0.6%  ;  45.6%  ±   0.4%

try-wraith           K  :  18332 trials ;  37.5%  ±   0.6%  ;  61.0%  ±   0.8%  ;  48.6%  ±   0.5%
try-wraith           M  :  14533 trials ;  31.3%  ±   0.7%  ;  57.4%  ±   0.9%  ;  44.3%  ±   0.6%
try-wraith           MM :   7135 trials ;  18.9%  ±   0.8%  ;  47.9%  ±   1.1%  ;  34.4%  ±   0.7%
try-wraith           -  :  40000 trials ;  32.2%  ±   0.4%  ;  57.1%  ±   0.5%  ;  44.5%  ±   0.3%
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
