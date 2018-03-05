---
layout: post
title: "PRIME TIME"
image: "/assets/images/pt-rix-thumb.png"
description: ""
keywords:
---


{% comment %}

I played my first match of Modern in September. Two months later, I won a Modern RPTQ and tickets to Spain for the Pro Tour. Despite a few embarrassing punts, I piloted [Titan Breach](https://www.mtggoldfish.com/deck/923196#paper) to a 6-4 finish -- pretty good for a guy who's never even made Day 2 of a GP!







---

As *Magic: the Gathering* players go, I'm mediocre. My practice schedule is (at best) sporadic, and I find full-day tournaments exhausting. But, through a combination of good luck and number crunching, I scored an invite to [Pro Tour Rivals of Ixalan](https://magic.wizards.com/en/events/premierplay/protour/ptrix) in Bilbao, Spain -- and even came away with a winning record in Modern[^1]!

[^1]: My Modern record was 6-4, despite punting several relevant games due to fatigue. My drafts, on the other hand, were a bloodbath. I was unfamiliar with a powerful archetype, and I got run over by it, going 1-4-1.

After spiking a PPTQ in September, I coded a simulation of my deck in Python[^3]. The computer's better-than-perfect play (more on this in a moment) then allowed me to compare dozens of variations of the deck by [goldfishing](https://mtg.gamepedia.com/Goldfishing) millions of games. I found a few flaws in the conventional wisdom, and see a few paths for the deck going forward.

[^3]: Code is visible on GitHub [here](https://github.com/charles-uno/valakut/blob/master/driver.py). Comments and pull requests welcome!



---



{% endcomment %}


> TODO: Intro


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

The conventional wisdom prefers [[Farseek]], but we play [[Explore]]. The danger of whiffing is (evidently) more than made up for by the chance to find a missing piece of the combo. If [[Explore]] is swapped for [[Farseek]] in the above list, odds of casting or [[Through the Breach:Breaching]] a T3 [[Primeval Titan:Titan]] drop from 23% to 22% on the play, and from 44% to 42% on the draw (with no effect on T4 numbers).

[[Anger of the Gods]] could just as easily be [[Lightning Bolt]], [[Relic of Progenitus]], or [[Chalice of the Void]]. These cards don't help make a T3 [[Primeval Titan:Titan]]. Instead, they serve essentially as three extra sideboard slots, allowing us to kneecap a faster opponent or break open a stalled board.

If we like, we can use our four flex slots to bump our interactive suite out to seven cards, but it seems like a waste to do so. If we wanted to sleeve up a bunch of removal and value creatures, we'd play Jund. We're playing Titan Breach because we like to steal games with T3 [[Primeval Titan]]. Let's see how often we can make that happen.

## The Model

Unlike [Frank Karsten](https://www.channelfireball.com/articles/how-reliable-is-hollow-one/), we haven't got the patience or skill to spell out explicitly how the computer should sequence its plays. Instead, we use brute force. Every time the computer has a choice between multiple plays, it makes that many copies of the game state and tries them all.

The computer makes thousands of copies of each hand. Each copy is played differently, and most of those plays are awful. For example, one copy passes its first turn without playing a land. Another exiles [[Simian Spirit Guide]] right away, even if there's nothing to cast with it. The upside of this approach is that it can determine with 100% accuracy whether a hand can produce a T3 [[Primeval Titan]].

In fact, the computer is actually a little *too* good. Trying every possible line and keeping the best one allows it to exhibit better-than-perfect play. For example, the model doesn't have to commit to a mulligan based on its seven-card hand; it gets to play out that hand, then play out its six-card hand, then play out its five-card hand, and keep whichever turns out best[^8].

[^8]: The model is very aggressive about taking mulligans. It only keeps its seven-card hand about half the time.

Shuffling is also a problem. Imagine if we could crack a [[Wooded Foothills]] for a [[Stomping Ground]], then for a [[Cinder Glade]], then for a [[Mountain]] -- shuffling independently each time --  then compare the top card of each deck and keep the one we like best! As a workaround, whenever we would thin a land from the deck, instead we just create a new one out of thin air. This causes the model to slightly[^7] overestimate the odds of drawing a land as the game goes on.

[^7]: At the start of T3, if we have three lands in play and two in our hand, the computer thinks we have a 41% chance of drawing a land (21/51) this turn. But if we thinned our deck with a [[Wooded Foothills]] and a [[Search for Tomorrow]], that number should be 39% (19/49) instead. That's about a one-in-fifty chance of drawing a land that should have been a spell.

To be clear, these caveats are at the margin. Based on manual inspection of the computer's sequencing for hundreds of hands, it finds the same lines that a human player would. And it finds them *fast*. A laptop running this model can churn through 100k hands overnight, allowing us to compare builds with far greater precision than is possible by hand.

## The Contenders

The best Titan Breach hands all look about the same: T1 suspend [[Search for Tomorrow:Search]], T2 [[Sakura-Tribe Elder:Steve]]/[[Explore]], T3 [[Through the Breach:Breach]] into [[Summoner's Pact:Pact]]/[[Primeval Titan:Titan]]. With eight two-drop ramp spells and (essentially) eight [[Primeval Titan:Titans]], it's reasonably safe[^10] to expect one of each. The same can't be said for [[Search for Tomorrow]] or [[Through the Breach]]. Even with [[Simian Spirit Guide]] to fill in some gaps, we often have nothing to do on T1, or fall short on T3.

[^10]: With four [[Summoner's Pact]] and four [[Primeval Titan]] in a sixty-card deck, we have a [65% chance](http://www.wolframalpha.com/input/?i=1+-+(52+choose+7)%2F(60+choose+7)) to see one in our opening hand, and a 77% chance to draw one by T3 ([75%](http://www.wolframalpha.com/input/?i=1+-+(52+choose+9)%2F(60+choose+9)) play, [79%](http://www.wolframalpha.com/input/?i=1+-+(52+choose+10)%2F(60+choose+10)) draw). With only four copies of [[Through the Breach]], we have only a [40% chance](http://www.wolframalpha.com/input/?i=1+-+(56+choose+7)%2F(60+choose+7)) to see one in our opening hand and a 51% chance to find one by T3 ([49%](http://www.wolframalpha.com/input/?i=1+-+(56+choose+7)%2F(60+choose+7)) play, [53%](http://www.wolframalpha.com/input/?i=1+-+(56+choose+10)%2F(60+choose+10)) draw).

This suggests three different directions for the flex slots:

- More acceleration. [[Utopia Sprawl]] does a passable impression of [[Search for Tomorrow]] on T1. [[Desperate Ritual]], like [[Through the Breach]], lets us cast [[Primeval Titan]] off five mana on T3. 
- An alternative haymaker. Sometimes we have five mana on T3 but no [[Through the Breach]]. [[Dramatic Entrance]] and [[Hour of Promise]] are plausible substitutes.
- Cantrips. If we don't have [[Search for Tomorrow]] on T1, let's instead use our first land drop to make sure T2 and T3 go as well as possible. [Matthias Hunt](http://www.starcitygames.com/events/coverage/rg_valakut_with_matthias_hunt.html) played [[Oath of Nissa]] in Titan Breach a while back. For comparison, let's also look at vanilla [[Street Wraith:zero-mana]] and [Deadshot Minotaur:one-mana]] cantrips, as well as [[Faithless Looting]], [[Ancient Stirrings]], and even "colorshifted" [[Serum Visions]][^14].

{% comment %}

[^11]: On its face, [[Ancient Stirrings]] seems like an odd choice in this deck. Some builds include an [[Emrakul, the Aeons Torn:Emrakul]] or two, but otherwise the only colorless cards are lands. It actually plays surprisingly well. Finding [[Valakut, the Molten Pinnacle]] is valuable against permission-heavy opponents. Finding fetches (and leaving mountains in the deck) allows us to trigger [[Valakut, the Molten Pinnacle:Valakut]] at instant speed against [[Inkmoth Nexus:creature-lands]]. And many important sideboard cards are colorless: [[Chalice of the Void]], [[Engineered Explosives]], [[Relic of Progenitus]], [[Grafdigger's Cage]], etc.

{% endcomment %}

[^14]: Cantrips like [[Serum Visions]] are a perfect example of why we use a brute force model. Programming a computer to scry correctly would be tedious, plus there's no guarantee that we would get it right. Trying every option tells us about the potential of [[Serum Visions]] as a card, independent of our abilities as players.

The model will allow us to see precisely how each of these options impacts our odds to produce [[Primeval Titan]] on T3. We'll also get a bit into their non-numerical strengths and weaknesses. 

## The Results

The effect of extra acceleration is huge, as shown below. Compared to the baseline list, a set of [[Desperate Ritual]] makes us nearly twice as likely to goldfish a T3 [[Primeval Titan]], with [[Utopia Sprawl]] just a few percentage points behind.

| Flex Slot             | T3 Breach | T3 Breach or Cast |
|:----------------------|:---------:|:-----------------:|
| (Blank)               | 25%       | 33%               |
| [[Desperate Ritual]]  | 42%       | 60%               |
| [[Utopia Sprawl]]     | 39%       | 56%               |

<p class="table-caption">Odds to cast or [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on T3 when the flex slots in the above list are acceleration. Half of games are simulated on the play, the other half on the draw. All values ±1%.</p>

Unfortunately, not all [[Through the Breach:Breaches]] are created equal. Four mountains into [[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]] lets us grab two [[Valakut, the Molten Pinnacle:Valakuts]] and two mountains -- that's four triggers now, and two for each future land drop. But three mountains into [[Desperate Ritual:Ritual]]-[[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]] means we only get one [[Valakut, the Molten Pinnacle:Valakut]] (half as many triggers) or we don't get the sixth mountain (no triggers right away)[^13].

[^13]: [[Blighted Woodland]] is a spicy piece of tech for builds with extra acceleration. When fetched instead of the fifth mountain, it represents a lot of extra [[Valakut, the Molten Pinnacle:Valakut]] triggers -- provided our opponent can't win before we untap.

These gains are also fragile. [[Utopia Sprawl]] sets us up to be clobbered by [[Field of Ruin]], plus it can be knocked off by [[Blood Moon]] or [[Spreading Seas]]. [[Desperate Ritual]] is blanked by [[Thalia, Guardian of Thraben:Thalia]] and easily stranded by discard spells. Plus they're awful topdecks after the first few turns -- at least [[Simian Spirit Guide]] is cast as can be cast as [[Gray Ogre]] in a pinch!

Extra acceleration is at its best in racing matchups with little interaction: Tron, Affinity, and Burn. Once in a while, it'll even let us steal a win against a faster deck like Storm or Infect. But a single [[Thoughtseize]] can make us look like idiots.

---

[[Dramatic Entrance]] jumps us from five mana to six, but it doesn't play well in multiples, doesn't let us cheat on green sources, and doesn't give haste. In other words, at least as far as the model is concerned, it's just a bad version of [[Desperate Ritual]].

| Flex Slot             | T3 Breach | T3 Breach or Cast |
|:----------------------|:---------:|:-----------------:|
| (Blank)               | 25%       | 33%               |
| [[Dramatic Entrance]] | 25%       | 44%               |
| [[Hour of Promise]]   | 25%       | 56%               |

<p class="table-caption">Odds to cast/[[Through the Breach:Breach]]/[[Dramatic Entrance:Enter]] a [[Primeval Titan:Titan]], or cast [[Hour of Promise:Hour]], on T3 when the flex slots in the above list are five-drops. Half of games are simulated on the play, the other half on the draw. All values ±1%.</p>

Judging by the numbers above, [[Dramatic Entrance]] has about half the upside of [[Desperate Ritual]]. It has half the downside as well: it's good against [[Cryptic Command]] but bad against [[Thoughtseize]]. Unless the recent [unbannings](https://magic.wizards.com/en/articles/archive/news/february-12-2018-banned-and-restricted-announcement-2018-02-12) turn Modern into a mono-blue hellscape, we won't be sleeving it up.

[[Hour of Promise]], on the other hand, is a five-drop worth talking about. Number-wise, it falls just shy of [[Desperate Ritual]] in terms of doing something big on T3 -- and, unlike [[Desperate Ritual]], it's great for the deck's resiliency. It gives us four extra topdecks to finish off a stabilized Jund opponent, and four extra must-counter threats against Jeskai's limited number of counterspells.

The problem with [[Hour of Promise]] is that it doesn't close out a game on its own. Tron, Affinity, and Burn don't care about our T3 [[Hour of Promise]] unless we follow it up with a T4 [[Primeval Titan]].

---

First things first: if we're in the market for a cantrip, [[Oath of Nissa]] is our best option. In the first few turns, it digs through our deck about as well as [[Street Wraith]], except without the life loss. [[Oath of Nissa:Oath]] falls a few points short of [[Serum Visions]] (one of the [most played cards](https://www.mtggoldfish.com/format-staples/modern) in Modern) but no other cantrip in our colors comes close.

| Flex Slot             | T3 Breach | T3 Breach or Cast |
|:----------------------|:---------:|:-----------------:|
| (Blank)               | 25%       | 33%               |
| [[Ancient Stirrings]] | 31%       | 40%               |
| [[Deadshot Minotaur]] | 30%       | 39%               |
| [[Faithless Looting]] | 31%       | 39%               |
| [[Oath of Nissa]]     | 34%       | 44%               |
| [[Serum Visions]]     | 37%       | 47%               |
| [[Street Wraith]]     | 34%       | 45%               |

<p class="table-caption">Odds to cast or [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on T3 when the flex slots in the above list are cantrips. Half of games are simulated on the play, the other half on the draw. All values ±1%.</p>

If we don't want to go all-in on [[Desperate Ritual]], [[Oath of Nissa]] presents a compromise: half the boost with none of the risk. [[Oath of Nissa:Oath]] isn't worth countering and can't be stranded by [[Thoughtseize]] -- in fact, it helps us replace whatever they hit.



---

---

---

Put another way, [[Oath of Nissa:Oath]] is the third leg of the speed-resiliency-impact triangle.


[[Desperate Ritual]] drops [[Primeval Titan]] on T3 as often as possible, but is weak against counterspells and discard. [[Hour of Promise]] does *something* big on T3, and is good against disruption,

:

- [[Desperate Ritual:Ritual]] and [[Hour of Promise:Hour]] boost T3 odds of doing something big on T3 by over 20%; [[Oath of Nissa:Oath]] boosts by only 11%.
- [[Hour of Promise:Hour]] and [[Oath of Nissa:Oath]] match up well against disruption; [[Desperate Ritual]] is easily disrupted.
- When we go off with [[Oath of Nissa:Oath]] and [[Desperate Ritual:Ritual]], we're always dropping [[Primeval Titan]]; [[Hour of Promise:Hour]] is a smaller substitute.

If we're on












[[Oath of Nissa:Oath]] gives us only half the boost to a smaller boost on T3, but



Compared to [[Hour of Promise]], [[Oath of Nissa:Oath]] again only gives half the boost on T3. But



[[Oath of Nissa:Oath]] also compares reasonably well to [[Hour of Promise]]. Again, [[Oath of Nissa]]








[[Oath of Nissa]] presents a "safe" option in case we don't want to go all-in on [[Desperate Ritual]] or [[Hour of Promise]]. It's always good, but never great.



about half the speed-up of [[Desperate Ritual]], including a greater chance to win outright on T3


Lower chance than Desperate Ritual or Hour of Promise to do something big on T3. But (unlike with Hour) that big thing will always be Primeval Titan, and (unlike with Ritual) a cantrip is a fine topdeck in the late game
