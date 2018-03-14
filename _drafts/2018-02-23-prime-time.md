---
layout: post
title: "PRIME TIME"
image: "/assets/images/pt-rix-thumb.png"
description: ""
keywords:
---


{% comment %}

I played my first match of Modern in September. Two months later, I won a Modern RPTQ and tickets to Spain for the [Pro Tour](https://magic.wizards.com/en/events/premierplay/protour/ptrix). Despite a few embarrassing punts, I managed a 6-4 finish in Modern -- pretty good for a guy who's never even made Day 2 of a GP!







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

Before we get into modeling and optimization, let's establish a baseline. Assuming the flex slots (indicated by question marks) are blanks, the the build below can [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] in about 25% of games, and cast one in another 9% of games. Hands without a T3 [[Primeval Titan:Titan]] almost always (88%) have one on T4, which can still be good enough, but is considerably more "fair."

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

The conventional wisdom prefers [[Farseek]], but we play [[Explore]]. [[Explore]] sometimes whiffs, which feels bad, but it also has a chance to draw us into a missing [[Through the Breach:Breach]], [[Primeval Titan:Titan]], or [[Simian Spirit Guide:SSG]]. Overall, [[Farseek]] and [[Explore]] are equally good at landing [[Primeval Titan]] by T4 (88%), but [[Explore]] makes us a bit better at doing so on T3 (see table below). 

| CMC 2 Ramp Spell      | T3 Breach | T3 Breach or Cast |
|:----------------------|:---------:|:-----------------:|
| [[Explore]]           | 25%       | 34%               |
| [[Farseek]]           | 24%       | 32%               |

<p class="table-caption">Odds to cast or [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on T3 depending on whether we play [[Explore]] or [[Farseek]]. All values ±0.3%.</p>

> Cut one SSG, we drop from 25%/34% to 20%/27%. Cut them all, we're only 7% to Breach (and 0% to cast)

This is also a good opportunity to mention [[Simian Spirit Guide]]. Many lists trim a copy or two, but we enthusiastically play a full set. 


It's difficult to overstate the importance of SSG 




| Number of [[Simian Spirit Guide:SSGs]] | T3 Breach | T3 Breach or Cast |
|:---------------------------------------|:---------:|:-----------------:|
| 4                                      | 25%       | 34%               |
| 3                                      | 21%       | 27%               |
| 2                                      | 16%       | 19%               |
| 1                                      | 13%       | 14%               |
| 0                                      | 7%        | 7%                |






In the above list, [[Anger of the Gods]] is a stand-in for interaction in general -- it could just as easily be [[Lightning Bolt]], [[Relic of Progenitus]], or [[Chalice of the Void]]. These cards don't help make a T3 [[Primeval Titan:Titan]]. Instead, they serve essentially as three extra sideboard slots, allowing us to kneecap a faster opponent or break open a stalled board.





We *could* use our four flex slots to bump our interactive suite out to seven cards, but it seems like a waste to do so. If we wanted to sleeve up a bunch of removal and value creatures, we'd play Jund. We're playing Titan Breach because we like to steal games with T3 [[Primeval Titan]]. Let's see how often we can make that happen.

## The Model

Unlike [Frank Karsten](https://www.channelfireball.com/articles/how-reliable-is-hollow-one/), we haven't got the patience or skill to spell out explicitly how the computer should sequence its plays. Instead, we use brute force. Every time the computer has a choice between multiple plays, it makes that many copies of the game state and tries them all.

The computer makes thousands of copies of each hand. Each copy is played differently, and most of those plays are awful. For example, one copy passes its first turn without playing a land. Another exiles [[Simian Spirit Guide]] right away, even if there's nothing to cast with it. The upside of this approach is that it can determine with 100% accuracy whether a hand can produce a T3 [[Primeval Titan]].

In fact, the computer is actually a little *too* good. Trying every possible line and keeping the best one allows it to exhibit better-than-perfect play. For example, the model doesn't have to commit to a mulligan based on its seven-card hand; it gets to play out that hand, then play out its six-card hand, then play out its five-card hand, and keep whichever turns out best[^8].

[^8]: The model is very aggressive about taking mulligans. It only keeps its seven-card hand about half the time.

Shuffling is also a problem. Imagine if we could crack a [[Wooded Foothills]] for a [[Stomping Ground]], then for a [[Cinder Glade]], then for a [[Mountain]] -- shuffling independently each time --  then compare the top card of each deck and keep the one we like best! As a workaround, whenever we would thin a land from the deck, instead we just create a new one out of thin air. This causes the model to slightly[^7] overestimate the odds of drawing a land as the game goes on.

[^7]: At the start of T3, if we have three lands in play and two in our hand, the computer thinks we have a 41% chance of drawing a land (21/51) this turn. But if we thinned our deck with a [[Wooded Foothills]] and a [[Search for Tomorrow]], that number should be 39% (19/49) instead. Between fetch lands and ramp spells, we probably thin about one land per turn on average; that means the computer will draw about one too many lands (and one too few spells) per forty games.


> A 25/60 deck with Search, Steve, and 8 fetches expects to draw 3.88 lands by T3. Our model draws 3.96 instead.
>
> If we give our model a 24/59 deck, it'll draw on average 3.86 lands by T3. Maybe that's better... have a virtual mountain?




the model's treatment of a 60 card deck with 25 lands lines up with a real-world deck of 59 cards and 24 lands. To look at a real world deck of 60 cards and 25 lands, we should use a model with 61 cards and



## The Contenders

The best Titan Breach hands all look about the same: T1 suspend [[Search for Tomorrow:Search]], T2 [[Sakura-Tribe Elder:Steve]]/[[Explore]], T3 [[Through the Breach:Breach]] into [[Summoner's Pact:Pact]]/[[Primeval Titan:Titan]]. With eight two-drop ramp spells and (essentially) eight [[Primeval Titan:Titans]], it's reasonably safe[^10] to expect one of each. The same can't be said for [[Search for Tomorrow]] or [[Through the Breach]]. Even with [[Simian Spirit Guide]] to fill in some gaps, we often have nothing to do on T1, or fall short on T3.

[^10]: With four [[Summoner's Pact]] and four [[Primeval Titan]] in a sixty-card deck, we have a [65% chance](http://www.wolframalpha.com/input/?i=1+-+(52+choose+7)%2F(60+choose+7)) to see one in our opening hand, and a 77% chance to draw one by T3 ([75%](http://www.wolframalpha.com/input/?i=1+-+(52+choose+9)%2F(60+choose+9)) play, [79%](http://www.wolframalpha.com/input/?i=1+-+(52+choose+10)%2F(60+choose+10)) draw). With only four copies of [[Through the Breach]], we have only a [40% chance](http://www.wolframalpha.com/input/?i=1+-+(56+choose+7)%2F(60+choose+7)) to see one in our opening hand and a 51% chance to find one by T3 ([49%](http://www.wolframalpha.com/input/?i=1+-+(56+choose+7)%2F(60+choose+7)) play, [53%](http://www.wolframalpha.com/input/?i=1+-+(56+choose+10)%2F(60+choose+10)) draw).

This suggests three different directions for the flex slots:

- More acceleration. [[Utopia Sprawl]] does a passable impression of [[Search for Tomorrow]] on T1. [[Desperate Ritual]], like [[Through the Breach]], lets us cast [[Primeval Titan]] off five mana on T3. As a control, we can compare these to [[Farseek]], even though we already play eight two-drop ramp spells.
- An alternative haymaker. Sometimes we have five mana on T3 but no [[Through the Breach]]. [[Dramatic Entrance]] and [[Hour of Promise]] are plausible substitutes. We can also check out the effect of an extra set of fatties to [[Through the Breach:Breach]] -- [[Woodfall Primus]] or whatever.
- Cantrips. If we don't have [[Search for Tomorrow]] on T1, let's instead use our first land drop to make sure T2 and T3 go as well as possible. [Matthias Hunt](http://www.starcitygames.com/events/coverage/rg_valakut_with_matthias_hunt.html) played [[Oath of Nissa]] in Titan Breach a while back[^12]. For comparison, let's also look at vanilla [[Street Wraith:zero-mana]] and [Deadshot Minotaur:one-mana]] cantrips, as well as [[Faithless Looting]], [[Ancient Stirrings]], and even "colorshifted" [[Serum Visions]][^14].

[^12]: Matthias' build of Titan Breach is the one that carried me through my PPTQ. When I asked him about [[Oath of Nissa]], he told me: "Titan Breach isn't a control deck, and it's not a [[Through the Breach]] deck. It's a combo deck, and the combo is [[Primeval Titan]]. You don't cut [[Oath of Nissa]] from Titan Breach just like you don't cut [[Serum Visions]] from Storm."

[^14]: Cantrips like [[Serum Visions]] are a perfect example of why we use a brute force model. Programming a computer to scry correctly would be tedious, plus there's no guarantee that we would get it right. Trying every option tells us about the potential of [[Serum Visions]] as a card, independent of our abilities as players.

The model allows us to see precisely how each of these options impacts our odds to produce [[Primeval Titan]] on T3.

## The Results

Playing [[Farseek]] (in addition to [[Sakura-Tribe Elder]] and [[Explore]]) increases our odds of landing [[Primeval Titan]] on T3 by about six percentage points. In other words, about one game out of sixteen, the baseline build was bottlenecked by a missing two-drop ramp spell. That's not nothing, but it's small potatoes compared to what we can get from an extra T1 or T3 ramp spell, per the table below. Compared to the baseline, a set of [[Desperate Ritual]] or [[Utopia Sprawl]] is worth an extra T3 [[Primeval Titan:Titan]] about one game out of *four*.

| Flex Slot             | T3 Breach | T3 Breach or Cast |
|:----------------------|:---------:|:-----------------:|
| (Blank)               | 25%       | 34%               |
| [[Desperate Ritual]]  | 42%       | 60%               |
| [[Farseek]]           | 30%       | 41%               |
| [[Utopia Sprawl]]     | 39%       | 56%               |

<p class="table-caption">Odds to cast or [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on T3 when the flex slots in the above list are acceleration. Half of games are simulated on the play, the other half on the draw. All values ±1%.</p>

Unfortunately, not all [[Through the Breach:Breaches]] are created equal. Four mountains into [[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]] lets us grab two [[Valakut, the Molten Pinnacle:Valakuts]] and two mountains -- that's four triggers now, and two for each future land drop. But three mountains into [[Desperate Ritual:Ritual]]-[[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]] means we only get one [[Valakut, the Molten Pinnacle:Valakut]] (half as many triggers) or we don't get the sixth mountain (no triggers right away)[^13].

[^13]: [[Blighted Woodland]] is a spicy piece of tech for builds with extra acceleration. When fetched instead of the fifth mountain, it represents a lot of extra [[Valakut, the Molten Pinnacle:Valakut]] triggers -- provided our opponent can't win before we untap.

These gains are also fragile. [[Utopia Sprawl]] sets us up to be clobbered by [[Field of Ruin]], plus it can be knocked off by [[Blood Moon]] or [[Spreading Seas]]. [[Desperate Ritual]] is blanked by [[Thalia, Guardian of Thraben:Thalia]] and easily stranded by discard spells. Plus they're awful topdecks after the first few turns -- at least [[Simian Spirit Guide]] can be cast as [[Gray Ogre]] in a pinch!

Extra acceleration is at its best in racing matchups with little interaction: Tron, Affinity, and Burn. Once in a while, it'll even let us steal a win against a faster deck like Storm or Infect. But a single [[Thoughtseize]] can make us look like idiots.

---

[[Dramatic Entrance]] jumps us from five mana to six, but it doesn't play well in multiples, doesn't let us cheat on green sources, and doesn't give haste. In other words, at least as far as the model is concerned, it's just a bad version of [[Desperate Ritual]].

| Flex Slot             | T3 Breach | T3 Breach or Cast |
|:----------------------|:---------:|:-----------------:|
| (Blank)               | 25%       | 34%               |
| [[Dramatic Entrance]] | 25%       | 44%               |
| [[Hour of Promise]]   | 25%       | 56%               |
| [[Woodfall Primus]]   | 31%       | 39%               |

<p class="table-caption">Odds to cast/[[Through the Breach:Breach]]/[[Dramatic Entrance:Enter]] a [[Primeval Titan:Titan]]/[[Woodfall Primus:Primus]], or cast [[Hour of Promise:Hour]], on T3 when the flex slots in the above list are extra haymakers. Half of games are simulated on the play, the other half on the draw. All values ±1%.</p>

Judging by the numbers above, [[Dramatic Entrance]] has about half the upside of [[Desperate Ritual]]. It has half the downside as well: it's good against [[Cryptic Command]] but bad against [[Thoughtseize]]. Unless the recent [unbannings](https://magic.wizards.com/en/articles/archive/news/february-12-2018-banned-and-restricted-announcement-2018-02-12) turn Modern into a mono-blue hellscape, we won't be sleeving it up.

[[Woodfall Primus]] (or [[Worldspine Wurm:Wurmple]], or [[Emrakul, the Aeons Torn:Emmy]], or whatever) is also unimpressive. It looks like it's only about one game in sixteen where we have 5 mana on T3, and a [[Through the Breach:Breach]] in hand, but no [[Primeval Titan]] -- a comparable boost to [[Farseek]] above.

[[Hour of Promise]], on the other hand, is an extra haymaker worth talking about. Number-wise, it falls just shy of [[Desperate Ritual]] in terms of doing something big on T3 -- and, unlike [[Desperate Ritual]], it's great for the deck's resiliency. It gives us four extra topdecks to finish off a stabilized Jund opponent, and four extra must-counter threats against Jeskai's limited counterspells.

The problem with [[Hour of Promise]] is that it doesn't close out a game on its own. Tron, Affinity, and Burn don't care about our T3 [[Hour of Promise]] unless we follow it up with a T4 [[Primeval Titan]].

---

First things first: if we're in the market for a cantrip, [[Oath of Nissa]] is our best option. In the first few turns, it digs through our deck about as well as [[Street Wraith]], except without the life loss. [[Oath of Nissa:Oath]] falls a few points short of [[Serum Visions]] (one of the [most played cards](https://www.mtggoldfish.com/format-staples/modern) in Modern), but no other cantrip in our colors comes close.

| Flex Slot             | T3 Breach | T3 Breach or Cast |
|:----------------------|:---------:|:-----------------:|
| (Blank)               | 25%       | 34%               |
| [[Ancient Stirrings]] | 31%       | 40%               |
| [[Deadshot Minotaur]] | 30%       | 39%               |
| [[Faithless Looting]] | 31%       | 39%               |
| [[Oath of Nissa]]     | 34%       | 44%               |
| [[Serum Visions]]     | 37%       | 47%               |
| [[Street Wraith]]     | 34%       | 45%               |

<p class="table-caption">Odds to cast or [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on T3 when the flex slots in the above list are cantrips. Half of games are simulated on the play, the other half on the draw. All values ±1%.</p>

After looking at [[Desperate Ritual]] and [[Hour of Promise]], we might look at [[Oath of Nissa]] as a compromise between them. It gives a smaller boost to our percentages. But (unlike with [[Hour of Promise:Hour]]) we're not settling for a smaller haymaker, and (unlike with [[Desperate Ritual:Ritual]]) we're not a glass cannon. Put another way, [[Oath of Nissa:Oath]] is the third leg of the speed-resiliency-impact triangle:

- [[Desperate Ritual]] boosts our odds of playing [[Primeval Titan]] on T3 by 27%, but it doesn't play well against counterspells and discard.
- [[Hour of Promise]] boosts our odds of doing *something* big on T3 by 23%, and insulates us against disruption, but [[Hour of Promise:Hour]] doesn't race as well as an actual [[Primeval Titan:Titan]].
- [[Oath of Nissa]] insulates us against disruption and boosts our odds of playing [[Primeval Titan]] on T3, but only by 11%.


---


---


---



Titan Breach is a combo deck. There are bottlenecks in the combo.

Titan Breach is a combo deck with decent odds to go off on T3. There are cards we can play to make our best draws happen more often, even while improving our inevitability in a long game.


Once in a while, [[Lightning Bolt]] will swing a game by zapping [[Goblin Electromancer]], [[Devoted Druid]], or [[Karn Liberated]].













> something something... we have identified the bottlenecks in this combo. let's shore them up. more fun than turning into a midrange deck






{% comment %}

[^11]: On its face, [[Ancient Stirrings]] seems like an odd choice in this deck. Some builds include an [[Emrakul, the Aeons Torn:Emrakul]] or two, but otherwise the only colorless cards are lands. It actually plays surprisingly well. Finding [[Valakut, the Molten Pinnacle]] is valuable against permission-heavy opponents. Finding fetches (and leaving mountains in the deck) allows us to trigger [[Valakut, the Molten Pinnacle:Valakut]] at instant speed against [[Inkmoth Nexus:creature-lands]]. And many important sideboard cards are colorless: [[Chalice of the Void]], [[Engineered Explosives]], [[Relic of Progenitus]], [[Grafdigger's Cage]], etc.

{% endcomment %}
