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



---


## The Deck

The deck is Titan Breach, an all-in cousin of Scapeshift. A good draw can win the game on T3 by [[Through the Breach:Breaching]] a [[Primeval Titan:Titan]] and repeatedly triggering [[Valakut, the Molten Pinnacle]]. It's also possible to use [[Simian Spirit Guide]] to hard-cast [[Primeval Titan]] on T3; this doesn't win outright, but it sets up a board state few opponents can overcome.

Before we get into modeling and optimization, let's establish a baseline. Assuming the "flex slots" are blanks, the the build below can land a T3 [[Primeval Titan]] in about 34% of games (23% on the play, 44% on the draw). Hands without a T3 [[Primeval Titan:Titan]] almost always (88%) have one on T4, which can still be good enough, but is considerably more "fair."

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

The conventional wisdom prefers [[Farseek]], but we play [[Explore]]. The danger of whiffing is (evidently) more than made up for by the chance to find a missing [[Through the Breach]] or [[Simian Spirit Guide]]. If [[Explore]] is swapped for [[Farseek]] in the above list, odds of casting or [[Through the Breach:Breaching]] a T3 [[Primeval Titan:Titan]] drop from 23% to 22% on the play, and from 44% to 42% on the draw (with no effect on T4 numbers).


> Leonin Arbiter


[[Anger of the Gods]] could just as easily be [[Lightning Bolt]], [[Relic of Progenitus]], or [[Chalice of the Void]]. These cards don't help make a T3 [[Primeval Titan:Titan]]. Instead, they serve essentially as three extra sideboard slots, allowing us to kneecap a faster opponent or break open a stalled board.

If we like, we can use our four "flex slots" to bump our interactive suite out to seven cards, but it seems like a waste to do so. If we wanted to sleeve up a bunch of removal and value creatures, we'd play Jund. We're playing Titan Breach because we like to steal games with T3 [[Primeval Titan]]. Let's see how often we can make that happen.

## The Model

Unlike [Frank Karsten](https://www.channelfireball.com/articles/how-reliable-is-hollow-one/), we haven't got the patience or play skill to spell out explicitly how the computer should sequence its plays. Instead, we use brute force. Every time the computer has a choice between multiple plays, it makes that many copies of the game state and tries them all.

The computer makes thousands of copies of each hand. Each copy is played differently, and most of those plays are wrong. For example, one copy passes its first turn without playing a land. Another exiles [[Simian Spirit Guide]] right away, even if there's nothing to cast with it. The upside of this approach is that it can determine with 100% accuracy whether a hand can produce a T3 [[Primeval Titan]].

It bears noting that the computer is actually a little *too* good. Trying every possible line and keeping the best one allows it to exhibit better-than-perfect play. For example, the model doesn't have to commit to a mulligan based on its seven-card hand; it gets to play out that hand, then play out its six-card hand, then play out its five-card hand, and keep whichever turns out best[^8].

[^8]: The model is very aggressive about taking mulligans. It only keeps its seven-card hand about half the time.

Shuffling is also a problem. Imagine if we could crack a [[Wooded Foothills]] for a [[Stomping Ground]], then for a [[Cinder Glade]], then for a [[Mountain]] -- shuffling independently each time --  then compare the top card of each deck and keep the one we like best! As a workaround, whenever we would thin a land from the deck, instead we just create a new one out of thin air. This causes the model to slightly[^7] overestimate the odds of drawing a land as the game goes on.

[^7]: At the start of T3, if we have three lands in play and two in our hand, the computer thinks we have a 41% chance of drawing a land (21/51) this turn. But if we thinned our deck with a [[Wooded Foothills]] and a [[Search for Tomorrow]], that number should be 39% (19/49) instead. That's about a one-in-fifty chance of drawing a land that should have been a spell.

> These caveats are at the margins. Bottom line: we have a model that can tell us how often a build produces T3 Primeval Titan.

## The Contenders

The best Titan Breach hands all look about the same: T1 suspend [[Search for Tomorrow:Search]], T2 [[Sakura-Tribe Elder:Steve]]/[[Explore]], T3 [[Through the Breach:Breach]] into [[Summoner's Pact:Pact]]/[[Primeval Titan:Titan]]. With eight two-drop ramp spells and (essentially) eight [[Primeval Titan:Titans]], it's reasonably safe[^10] to expect one of each. The same can't be said for [[Search for Tomorrow]] or [[Through the Breach]]. Even with [[Simian Spirit Guide]] to fill in some gaps, we often have nothing to do on T1, or fall short on T3.

[^10]: With four [[Summoner's Pact]] and four [[Primeval Titan]] in a sixty-card deck, we have a [65% chance](http://www.wolframalpha.com/input/?i=1+-+(52+choose+7)%2F(60+choose+7)) to see one in our opening seven, and a 77% chance to draw one by T3 ([75%](http://www.wolframalpha.com/input/?i=1+-+(52+choose+9)%2F(60+choose+9)) play, [79%](http://www.wolframalpha.com/input/?i=1+-+(52+choose+10)%2F(60+choose+10)) draw). With only four copies of [[Through the Breach]], we have only a [40% chance](http://www.wolframalpha.com/input/?i=1+-+(56+choose+7)%2F(60+choose+7)) to see one in our opening seven and a 51% chance to find one by T3 ([49%](http://www.wolframalpha.com/input/?i=1+-+(56+choose+7)%2F(60+choose+7)) play, [53%](http://www.wolframalpha.com/input/?i=1+-+(56+choose+10)%2F(60+choose+10)) draw).

This suggests three different directions for the flex slots:

- More acceleration. [[Utopia Sprawl]] does a passable impression of [[Search for Tomorrow]]. [[Desperate Ritual]], like [[Through the Breach]], lets us cast [[Primeval Titan]] off five mana on T3.
- An alternative haymaker. If we have five mana on T3 but no [[Through the Breach]], what if we cast [[Hour of Promise]] instead?
- Cantrips. If we don't have [[Search for Tomorrow]] on T1, let's instead use our first land drop to make sure T2 and T3 go as well as possible. [Matthias Hunt](http://www.starcitygames.com/events/coverage/rg_valakut_with_matthias_hunt.html) played [[Oath of Nissa]] in Titan Breach a while back; we can also check out [[Street Wraith]], [[Faithless Looting]], [[Ancient Stirrings]][^11], and even "colorshifted" [[Serum Visions]] for comparison.

[^11]: On its face, [[Ancient Stirrings]] seems like an odd choice in this deck. Sometimes people like to play an [[Emrakul, the Aeons Torn:Emrakul]] or two, but otherwise the only colorless cards are lands. It actually plays surprisingly well. Finding [[Valakut, the Molten Pinnacle]] is valuable against permission-heavy opponents. Finding fetches (and leaving mountains in the deck) allows us to trigger [[Valakut, the Molten Pinnacle:Valakut]] at instant speed against [[Inkmoth Nexus:creature-lands]]. And many important sideboard cards are colorless: [[Chalice of the Void]], [[Engineered Explosives]], [[Relic of Progenitus]], [[Grafdigger's Cage]], etc.

Incidentally, cantrips like [[Serum Visions]] are a perfect example of why we use a brute force model. Programming a computer to scry correctly would be tedious, plus there's no guarantee that we would get it right. Trying every option tells us about the potential of [[Serum Visions]] as a card, independent of our abilities as players.

> Transition?

## The Results


> The following tables show...


| Slot 57-60        | T3 Play | T3 Draw | T3 Average |
|:------------------|:-------:|:-------:|:----------:|
| (Blank)           | 23%     | 44%     | 34%        |
| Desperate Ritual  | 47%     | 69%     | 58%        |
| Utopia Sprawl     | 43%     | 68%     | 55%        |

<p class="table-caption">Odds to cast or [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on T3 when the "flex slots" in the above list are acceleration. All values ±1%.</p>

The effect of extra acceleration is huge. Compared to the baseline list, a set of [[Desperate Ritual]] or [[Utopia Sprawl]] makes us half again as consistent on the draw and *twice* as consistent on the play. In an eight-round event like Day 1 of a GP, we would expect the baseline list to make about seven T3 [[Primeval Titan:Titans]]; a list with this extra acceleration would instead make twelve.

Unfortunately, these gains are fragile. [[Utopia Sprawl]] lets our opponent two-for-one us with [[Field of Ruin]], plus it can be knocked off by [[Blood Moon]] or [[Spreading Seas]]. [[Desperate Ritual]] is blanked by [[Thalia, Guardian of Thraben:Thalia]] and easily stranded by discard spells. Plus they're awful topdecks after the first few turns -- at least [[Simian Spirit Guide]] can be cast as [[Gray Ogre]] in a pinch!

Overloading on fast mana is also antisynergistic with [[Valakut, the Molten Pinnacle:Valakut]]. Four mountains into [[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]] lets us grab two [[Valakut, the Molten Pinnacle:Valakuts]] and two mountains -- that's four triggers now, and two for each future land drop. But three mountains into [[Desperate Ritual:Ritual]]-[[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]] means we only get one [[Valakut, the Molten Pinnacle:Valakut]] (half as many triggers) or we don't get the sixth mountain (no triggers right away)[^13].


[^13]: Blighted Woodland










| Slot 57-60        | T3 Play | T3 Draw | T3 Average |
|:------------------|:-------:|:-------:|:----------:|
| (Blank)           | 23%     | 44%     | 34%        |
| Hour of Promise   | 44%     | 68%     | 56%        |

<p class="table-caption">Odds to cast or [[Through the Breach:Breach]] a [[Primeval Titan:Titan]], or cast [[Hour of Promise:Hour]], on T3 when the "flex slots" in the above list are [[Hour of Promise]]. All values ±1%.</p>


[[Hour of Promise]] puts up similar numbers to [[Utopia Sprawl]] and [[Desperate Ritual]].

Would we rather cast/breach Titan off 3-4 lands or cast Hour off 4-5? Not obvious.






- It's good in grindy matchups. Jund has tons of removal, so we rarely get to turn a Titan sideways. Blue-based decks probably lose if they let it resolve. We're pretty good here anyway.
- It's bad in racing matchups. Unlike Breach, it can't kill Storm, Infect, or Bogles on the spot. These matchups are awful anyway.

| Slot 57-60        | T3 Play | T3 Draw | T3 Average |
|:------------------|:-------:|:-------:|:----------:|
| (Blank)           | 23%     | 44%     | 34%        |
| Ancient Stirrings | 28%     | 53%     | 41%        |
| Deadshot Minotaur | 27%     | 50%     | 38%        |
| Faithless Looting | 31%     | 57%     | 44%        |
| Oath of Nissa     | 31%     | 57%     | 44%        |
| Serum Visions     | 33%     | 58%     | 46%        |
| Street Wraith     | 32%     | 57%     | 45%        |

<p class="table-caption">Odds to cast or [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on T3 when the "flex slots" in the above list are cantrips. All values ±1%.</p>

- Lower numbers than acceleration or Hour.
- Unlike acceleration, it's resilient.
- Unlike Hour, it increases our odds of actually winning on T3.
