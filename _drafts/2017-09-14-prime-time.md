---
layout: post
title: Prime Time
image: "/assets/images/prime-time-thumb.png"
description: ""
---

I'm a newcomer to Modern. A few months ago, I would have called [[Death's Shadow]] a bulk rare. But then Matthias[^0] lent me a deck, took me to a PPTQ, and I came away with an invite to the regional qualifier in November. So now I'm putting (probably too little) time into learning the format, and (probably too much) time into tweaking my decklist.

[^0]: Matthias Hunt, of [Amulet Bloom](http://www.starcitygames.com/article/28042_Amulet-Combo-Primer.html) notoriety.

The deck is [Titan Breach](https://www.mtggoldfish.com/deck/757022#paper), a less-played cousin of [Titan Shift](https://www.mtggoldfish.com/archetype/modern-titan-shift#paper). A good draw plays out about like this:

- T1: [[Stomping Ground]], suspend [[Search for Tomorrow]].
- T2: [[Mountain]], [[Sakura-Tribe Elder]], get a [[Mountain]].
- T3: Cast [[Search for Tomorrow:Search]] from exile, get a [[Mountain]]. [[Cinder Glade:Land]] for turn. Cast [[Through the Breach]], dropping [[Primeval Titan]], searching up 2 [[Valakut, the Molten Pinnacle]]. Then attack with [[Primeval Titan:Titan]], searching up 2 more [[Mountains]], triggering [[Valakut, the Molten Pinnacle:Valakut]] 4 times.

That's 6 damage from [[Primeval Titan:Titan]] and another 12 from [[Valakut, the Molten Pinnacle:Valakut]], which is typically enough to close out the game[^1]. If not, it clears the opposing board, and from now on each land comes with a pair of free [[Lightning Bolt]]s attached. It's rare to lose a game after making [[Primeval Titan:Titan]] on turn 3. Hard-casting it on turn 4 is still quite good, but considerably more "fair."

[^1]: [[Wooded Foothills:Fetch lands]] and [[Stomping Ground:shock lands]] are prevalent in Modern. It's typical for a player to deal themselves at least 2 damage in the first few turns of the game.

### Jumping in with Oath Feet

The Titan Breach [netdeck](https://www.mtggoldfish.com/deck/757022#paper) plays a full set of [[Lightning Bolt:Bolt]]s, some [[Chandra, Torch of Defiance:value cards]], and a random [[Woodfall Primus:fatty]] or two for [[Through the Breach:Breach]]. Matthias slims down the interactive suite to make room for [[Oath of Nissa]] (see list below). As he puts it, this isn't a control deck, and it's not a [[Through the Breach:Breach]] deck. It's a combo deck, and the combo is [[Primeval Titan]]. You don't cut [[Oath of Nissa:Oath]] from Titan Breach just like you don't cut [[Serum Visions]] from [Storm](https://www.mtggoldfish.com/archetype/modern-u-r-gifts-storm-32901#paper).

<table class="cardlist">
    <caption class="deckname">Matthias' Titan Breach</caption>
    <tr>
        <td>
            1 [[Oracle of Mul Daya]]<br>
            4 [[Primeval Titan]]<br>
            4 [[Sakura-Tribe Elder]]<br>
            4 [[Simian Spirit Guide]]<br>
        </td>
        <td>
            4 [[Farseek]]<br>
            2 [[Lightning Bolt]]<br>
            4 [[Oath of Nissa]]<br>
            4 [[Search for Tomorrow]]<br>
            4 [[Summoner's Pact]]<br>
            4 [[Through the Breach]]<br>
        </td>
        <td>
            2 [[Cinder Glade]]<br>
            2 [[Forest]]<br>
            6 [[Mountain]]<br>
            4 [[Stomping Ground]]<br>
            4 [[Valakut, the Molten Pinnacle]]<br>
            3 [[Windswept Heath]]<br>
            4 [[Wooded Foothills]]<br>
        </td>
    </tr>
</table>

Matthias has been a proponent of [[Oath of Nissa:Oath]] in Titan Breach since (at least) [early 2016](http://www.starcitygames.com/events/coverage/rg_valakut_with_matthias_hunt.html), but it hasn't caught on. Honestly, I can see why. Drawing [[Lightning Bolt:Bolt]] usually feels good, but drawing [[Oath of Nissa:Oath]] often feels bad: it doesn't do anything! I have to pay to turn it into a "real" card. It makes my sequencing harder. And sometimes it even whiffs!

But there's a difference between a card that *feels* bad and a card that *is* bad (remember [[Death's Shadow:Shadow]]). In order to figure out which category [[Oath of Nissa:Oath]] falls into, I coded up the deck in Python[^6]. The program doesn't know anything about strategy -- it just knows the rules. Whenever there are multiple legal plays, it clones itself that many times and tries them all[^3]. For any given hand, it's guaranteed to find the fastest line to a Titan.

[^6]: You can check out the code on GitHub [here](https://github.com/charles-uno/valakut). Implementation and optimization details are discussed in the readme. Feedback and pull requests welcome!

[^3]: This is called a [brute force](https://en.wikipedia.org/wiki/Proof_by_exhaustion) solution. It's guaranteed to find the right answer, but it's dreadfully inefficient. To solve [Storm](https://www.mtggoldfish.com/archetype/modern-u-r-gifts-storm-32901#paper) by brute force, you'd probably need a supercomputer. Titan Breach is solvable on a laptop because it makes relatively few choices. It rarely plays more than half a dozen spells over the course of the game, and colors of mana are easy to keep straight.

After over 100k simulated games, Matthias' build is slightly better than the netdeck at producing [[Primeval Titan:Titan]] on turn 3, and considerably better at having one by turn 4 (see table below). Qualitatively, this makes sense. Turn-3 lines are pretty tight; typically there isn't an extra mana floating around to pay for [[Oath of Nissa:Oath]]. Over 4 turns, there's a lot more wiggle room; we can afford to cast an [[Oath of Nissa:Oath]] or two and dig for whatever we're missing.

| Slots 57-60                                   | T3 Play | T3 Draw | T4 Play | T4 Draw |
|:----------------------------------------------|--------:|--------:|--------:|--------:|
| 2 [[Lightning Bolt:Bolt]], 1 [[Chandra, Torch of Defiance:Chandra]], 1 [[Woodfall Primus:Primus]] (Netdeck) |    9.4% |   15.6% |   50.8% |   64.5% |
| 4 [[Oath of Nissa]] (Matthias)                |   11.5% |   20.4% |   64.3% |   75.6% |
| 4 [[Dissenter's Deliverance:Cantrip]]         |   10.4% |   17.5% |   58.8% |   69.8% |
| 4 [[Street Wraith]]                           |   12.3% |   20.6% |   60.8% |   71.9% |
| 2 [[Misty Rainforest:Land]], 2 [[Magmatic Insight]] |   11.4% |   19.6% |   59.7% |   71.6% |
| 4 [[Misty Rainforest:Land]]                   |   12.0% |   19.1% |   60.4% |   68.6% |
| 4 [[Chancellor of the Tangle]]                |   11.3% |   20.5% |   53.5% |   66.0% |
| 4 [[Desperate Ritual]]                        |   22.7% |   36.0% |   64.1% |   74.1% |

<p class="table-caption">The Titan Breach <a href="https://www.mtggoldfish.com/deck/757022#paper">netdeck</a> generally plays about 7 interactive cards. Matthias drops that down to 3 to make room for [[Oath of Nissa]]. The above table shows how that change affects the probability of dropping a [[Primeval Titan:Titan]] on turn 3 or 4. A handful of other plausible configurations are shown for comparison. Values plus-or-minus 0.5% or so.</p>

The netdeck is about 50-50 to drop a [[Primeval Titan:Titan]] by turn 4 on the play, and 2-to-1 on the draw. Matthias' build is 2-to-1 on the play and 3-to-1 on the draw. That's a big difference -- roughly an extra turn-3 or turn-4 [[Primeval Titan:Titan]] every 7 games. Put another way, about once per FNM, [[Oath of Nissa:Oath]] turns a likely loss into a likely win.

Even though [[Oath of Nissa:Oath]] sometimes whiffs, it's still better across the board than a vanilla cantrip (like the cycling on [[Dissenter's Deliverance]]). It even compares favorably to [[Street Wraith]], which serves as a sort of control[^5]. Playing [[Street Wraith:Wraith]] or some extra lands make the deck marginally more consistent on turn 3, but they can't compete with the benefit [[Oath of Nissa:Oath]] provides on turn 4.

[^5]: In real life, [[Street Wraith]] makes mulligan choices difficult, and 2 life is a real cost. My simulation doesn't care about those things, so [[Street Wraith:Wraith]] is just like playing a 56-card deck.

[[Desperate Ritual:Ritual]]s can get [[Primeval Titan:Titan]] onto the table faster than [[Oath of Nissa:Oath]], but there's a problem with that approach: when we go [[Simian Spirit Guide:Guide]]-[[Desperate Ritual:Ritual]]-[[Through the Breach:Breach]], we don't win. [[Valakut, the Molten Pinnacle:Valakut]] doesn't do anything unless we have a bunch of lands on the table.

The above numbers don't tell the whole story. They can't tell us how often Matthias' build loses because it doesn't have a [[Lightning Bolt:Bolt]] for [[Goblin Electromancer]] or [[Karn Liberated:Karn]]. But, assuming it's safe to drop the interactive suite down to 3 cards, [[Oath of Nissa]] is the card to beat for those last four slots.

### Exploration and Experimentation

Having built this simulation of Titan Breach, I had my own bone to pick with the conventional wisdom: could [[Farseek]][^10] really be better than [[Explore]]?

[^10]: [[Sakura-Tribe Elder]] only searches up basic lands, which in a sense makes it worse than [[Farseek]]. But that's more than made up for by its ability to soak up damage against [Burn](https://www.mtggoldfish.com/archetype/modern-burn-34574#paper) and [Affinity](https://www.mtggoldfish.com/archetype/modern-affinity-8972#paper).

[[Farseek]] is easy to evaluate: it ramps us into a [[Cinder Glade:dual land]], which counts as a [[Mountain]] for [[Valakut, the Molten Pinnacle:Valakut]] as well as giving us another green source in case we need to hard-cast [[Primeval Titan:Titan]]. [[Explore]] is trickier. It's *usually* a ramp spell on turn 2, but sometimes it whiffs. The trade-off is, it *sometimes* helps find a missing [[Through the Breach:Breach]] or [[Primeval Titan:Titan]]. It's also significant that [[Explore]] lets us play the extra land untapped, which *occasionally* lets us squeeze in an extra [[Oath of Nissa:Oath]] or [[Lightning Bolt:Bolt]].

All of the lists aggregated by [MTGGoldfish](https://www.mtggoldfish.com/archetype/modern-titanshift-40829#paper) play [[Farseek]] over [[Explore]]. So does Matthias. But it's not obvious -- to me, at least -- whether it's actually better. So I plugged it into the simulation.

| Farseek vs Explore      | T3 Play | T3 Draw | T4 Play | T4 Draw |
|:------------------------|--------:|--------:|--------:|--------:|
| [[Farseek]]             |   11.5% |   20.4% |   64.3% |   75.6% |
| [[Explore]]             |   13.6% |   24.4% |   65.4% |   77.0% |

<p class="table-caption">The conventional wisdom prefers [[Farseek]] over [[Explore]]. It turns out, [[Explore]] is slightly better at producing a fast [[Primeval Titan]]. Values plus-or-minus 0.5% or so.</p>

The difference is modest, but [[Explore]] performs better than [[Farseek]] across the board.

---














My baseline build is now as follows. ([[Lightning Bolt:Bolt]] is good around here. If your local metagame is full of [Shadow](https://www.mtggoldfish.com/archetype/modern-grixis-death-s-shadow#paper)/[Storm](https://www.mtggoldfish.com/archetype/modern-u-r-gifts-storm-32901#paper)/[Dredge](https://www.mtggoldfish.com/archetype/modern-dredge-26688#paper), those 3 slots could just as easily be [[Relic of Progenitus]].)

<table class="cardlist">
    <caption class="deckname">Charles' Titan Breach</caption>
    <tr>
        <td>
            4 [[Primeval Titan]]<br>
            4 [[Sakura-Tribe Elder]]<br>
            4 [[Simian Spirit Guide]]<br>
        </td>
        <td>
            4 [[Explore]]<br>
            3 [[Lightning Bolt]]<br>
            4 [[Oath of Nissa]]<br>
            4 [[Search for Tomorrow]]<br>
            4 [[Summoner's Pact]]<br>
            4 [[Through the Breach]]<br>
        </td>
        <td>
            2 [[Cinder Glade]]<br>
            2 [[Forest]]<br>
            6 [[Mountain]]<br>
            4 [[Stomping Ground]]<br>
            4 [[Valakut, the Molten Pinnacle]]<br>
            3 [[Windswept Heath]]<br>
            4 [[Wooded Foothills]]<br>
        </td>
    </tr>
</table>




---




















---

---

---





https://magic.wizards.com/en/articles/archive/event-coverage/rookie-year-matthias-hunt-2011-11-19






```
[ 1 ] initial

TURN 1
HAND:  Titan ; Elder ; Titan ; Fetch ; Farseek ; Bolt ; *Valakut*
[ 5 ] playing Valakut
[ 7 ] passing turn
HAND:  Titan ; Elder ; Titan ; Fetch ; Farseek ; Bolt
BOARD: (Valakut)

TURN 2
HAND:  Titan ; Elder ; Titan ; Fetch ; Farseek ; Bolt ; *Search*
BOARD: Valakut
[ 15 ] playing Fetch, cracking for Stomp
[ 22 ] casting Farseek for Glade
[ 36 ] passing turn
HAND:  Titan ; Elder ; Titan ; Bolt ; Search
BOARD: (Glade) ; (Stomp) ; (Valakut)

TURN 3
HAND:  Titan ; Elder ; Titan ; Bolt ; Search ; *Fetch*
BOARD: Glade ; Stomp ; Valakut
[ 86 ] casting Search for Forest
[ 157 ] playing Fetch, cracking for Forest
[ 168 ] casting Elder, popping for Mountain
[ 203 ] passing turn
HAND:  Titan ; Titan ; Bolt
BOARD: (Forest) ; (Forest) ; (Glade) ; (Mountain) ; (Stomp) ; (Valakut)

TURN 4
HAND:  Titan ; Titan ; Bolt ; *Guide*
BOARD: Forest ; Forest ; Glade ; Mountain ; Stomp ; Valakut
[ 206 ] casting Titan
```
