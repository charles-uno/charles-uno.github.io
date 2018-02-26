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

The deck is Titan Breach, an all-in cousin of Scapeshift. A good draw can win the game on T3 by [[Through the Breach:Breaching]] a [[Primeval Titan:Titan]] and repeatedly triggering [[Valakut, the Molten Pinnacle]]. It's also possible to use [[Simian Spirit Guide]] to hard-cast [[Primeval Titan]] on T3, or [[Through the Breach:Breach]] a [[Woodfall Primus]]; these don't win on the spot, but they set up a board state few opponents can overcome.

Below is the maindeck I registered at PT RIX. It produces a T3 haymaker in about 39% of games (27% on the play, 50% on the draw). Hands without a T3 [[Primeval Titan:Titan]] and/or [[Through the Breach:Breach]] almost always have one on T4, which can still be good enough, but is considerably more "fair."

<table class="cardlist">
    <caption class="deckname">Titan Breach</caption>
    <tr>
        <td>
            4 [[Explore]]<br>
            1 [[Hornet Queen]]<br>
            4 [[Chalice of the Void]]<br>
            4 [[Primeval Titan]]<br>
            4 [[Sakura-Tribe Elder]]<br>
            4 [[Simian Spirit Guide]]<br>
            4 [[Search for Tomorrow]]<br>
            4 [[Summoner's Pact]]<br>
            4 [[Through the Breach]]<br>
            1 [[Woodfall Primus]]<br>
        </td>
        <td>
            1 [[Blighted Woodland]]<br>
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

The singleton [[Blighted Woodland]] is a bit unconventional, but I'm confident it's correct. The deck often burns through its whole hand to get [[Primeval Titan]] on the table, but doesn't have enough Mountains to win on the spot. This can happen if we've drawn our basic [[Forest]], been hit by [[Spreading Seas]], or used [[Simian Spirit Guide]] to cheat on mana. In those situations, tutoring up a [[Blighted Woodland]] often allows us to win as soon as we untap -- even if we topdeck a blank, even if our opponent has a counterspell, and even if we're supposed to use all our green mana to pay for [[Summoner's Pact]]. 

[[Explore]] is also unusual. Most lists play [[Farseek]] instead. With 25 lands, both are equally good (XX%) at producing a T3 haymaker. But with [[Blighted Woodland]] as a 26th land, [[Explore]] is a few points better than [[Farseek]] (39% versus 37%). [[Explore]] sometimes whiffs, which can be frustrating, but it also has a chance to draw us into a missing [[Through the Breach]] or [[Simian Spirit Guide]]. We can also use [[Explore]] to play a tapped [[Cinder Glade]] or [[Valakut, the Molten Pinnacle:Valakut]] without throwing off our curve. 

## The Model













```
pt-25?
pt-25-farseek?
```



It can even be cracked with a [[Summoner's Pact]] trigger on the stack. 

Defer damage until you can one-shot a Shadow player, or blow up a Leyline. 



```
pt                   :  27.0%  ±   0.6%  ;  50.3%  ±   0.8%  ;  38.6%  ±   0.5%
pt-breach            :  17.8%  ±   0.7%  ;  34.2%  ±   1.0%  ;  25.9%  ±   0.6%
pt-cantrip           :  32.9%  ±   0.8%  ;  55.3%  ±   1.0%  ;  44.2%  ±   0.7%
pt-farseek           :  27.1%  ±   0.7%  ;  46.7%  ±   1.0%  ;  37.0%  ±   0.6%
pt-hour              :  47.4%  ±   0.7%  ;  71.4%  ±   0.8%  ;  59.4%  ±   0.5%
pt-oath              :  36.4%  ±   0.6%  ;  61.3%  ±   0.8%  ;  48.8%  ±   0.5%
pt-ritual            :  53.3%  ±   0.7%  ;  73.9%  ±   0.9%  ;  63.6%  ±   0.6%
pt-visions           :  38.9%  ±   0.9%  ;  62.5%  ±   1.1%  ;  50.7%  ±   0.7%
pt-wraith            :  37.9%  ±   0.9%  ;  63.5%  ±   1.1%  ;  50.8%  ±   0.7%
```

A quick note on some unconventional choices:

- Hornet Queen



The list includes a few unconventional choices.

- Blighted Woodland.
- Hornet Queen. Doesn't quite line up with "Plan A," but it's pretty close. It's a resilient threat that can be Breached. Most decks in the format struggle to win through it. Started in the sideboard, but basically never comes out. Tickled to see Malte Smits maindeck one at [GP Lyon](https://www.mtggoldfish.com/deck/948709#paper) shortly after PT RIX.

Matthias, who lent me the deck in the first place, played [[Oath of Nissa]] instead of [[Lightning Bolt]]







[[Farseek]] is easy to evaluate: it ramps us into a [[Cinder Glade:dual land]], which counts as a [[Mountain]] for [[Valakut, the Molten Pinnacle:Valakut]] as well as giving us another green source in case we need to hard-cast [[Primeval Titan:Titan]]. [[Explore]] is trickier. It's *usually* a ramp spell on T2, but sometimes it whiffs. The trade-off is, it *sometimes* helps find a missing [[Through the Breach:Breach]] or [[Primeval Titan:Titan]]. [[Explore]] also lets us play the extra land untapped, which *occasionally* lets us squeeze in an extra [[Oath of Nissa:Oath]] or [[Lightning Bolt:Bolt]].





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