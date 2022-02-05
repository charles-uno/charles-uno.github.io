---
layout: post
title: Deck Chairs on the Titanic
image: "/assets/images/thumb/primeval-titan-aleksi-briclot.png"
description: "What do we learn by simulating a million hands of Titan Breach?"
hidden: true
send_to: /valakut-simulation
tags: games code
---

I'm a newcomer to Modern. A few months ago, I would have called [[Death's Shadow]] a bulk rare. But then Matthias[^0] lent me a deck, took me to a PPTQ, and I came away with an invite to the regional qualifier in November. So now I'm putting (probably too little) time into learning the format, and (probably too much) time into tweaking my decklist.

[^0]: Matthias Hunt, of [Amulet Bloom](http://www.starcitygames.com/article/28042_Amulet-Combo-Primer.html) notoriety.

The deck is [Titan Breach](https://www.mtggoldfish.com/deck/757022#paper), a less-played cousin of [Titan Shift](https://www.mtggoldfish.com/archetype/modern-titan-shift#paper). A good draw plays out about like this:

- T1: [[Stomping Ground]], suspend [[Search for Tomorrow]].
- T2: [[Mountain]], [[Sakura-Tribe Elder]], get a [[Mountain]].
- T3: Cast [[Search for Tomorrow:Search]] from exile, get a [[Mountain]]. [[Cinder Glade:Land]] for turn. Cast [[Through the Breach]], dropping [[Primeval Titan]], searching up two [[Valakut, the Molten Pinnacle]]. Then attack with [[Primeval Titan:Titan]], searching up two more [[Mountain]]s, triggering [[Valakut, the Molten Pinnacle:Valakut]] four times.

That's six damage from [[Primeval Titan:Titan]] and another twelve from [[Valakut, the Molten Pinnacle:Valakut]], which is typically enough to close out the game[^1]. If not, it clears the opposing board, and from now on each land comes with a pair of free [[Lightning Bolt]]s attached. It's rare to lose a game after making [[Primeval Titan:Titan]] on T3. Hard-casting it on T4 is still quite good, but considerably more "fair."

[^1]: [[Wooded Foothills:Fetch lands]] and [[Stomping Ground:shock lands]] are prevalent in Modern. It's typical for a player to deal themselves at least two damage in the first few turns of the game.

### Jumping in with [[Oath of Nissa:Oath]] Feet

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

[^6]: You can check out the code on GitHub [here](https://github.com/charles-uno/mtg-model). Implementation and optimization details are discussed in the readme. Feedback and pull requests welcome!

[^3]: This is called a [brute force](https://en.wikipedia.org/wiki/Proof_by_exhaustion) solution. It's guaranteed to find the right answer, but it's dreadfully inefficient. To solve [Storm](https://www.mtggoldfish.com/archetype/modern-u-r-gifts-storm-32901#paper) by brute force, you'd probably need a supercomputer. Titan Breach is solvable on a laptop because it makes relatively few choices. It rarely plays more than half a dozen spells over the course of the game, and colors of mana are easy to keep straight.

After over 100k simulated games, Matthias' build is slightly better than the netdeck at producing [[Primeval Titan:Titan]] on T3, and considerably better at having one by T4 (see table below). Qualitatively, this makes sense. T3 lines are pretty tight; typically there isn't an extra mana floating around to pay for [[Oath of Nissa:Oath]]. Over four turns, there's a lot more wiggle room; we can afford to cast an [[Oath of Nissa:Oath]] or two and dig for whatever we're missing.

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

<p class="table-caption">The Titan Breach <a href="https://www.mtggoldfish.com/deck/757022#paper">netdeck</a> generally plays about seven interactive cards. Matthias drops that down to three to make room for [[Oath of Nissa]]. The above table shows how that change affects the probability of dropping a [[Primeval Titan:Titan]] on T3 or T4. A handful of other plausible configurations are shown for comparison. T3 (T4) values are plus-or-minus 0.4% (0.8%).</p>

The netdeck is about fifty-fifty to drop a [[Primeval Titan:Titan]] by turn 4 on the play, and two-to-one on the draw. Matthias' build is two-to-one on the play and three-to-one on the draw. That's a big difference -- roughly an extra T3 or T4 [[Primeval Titan:Titan]] every seven games. Put another way, about once per FNM, [[Oath of Nissa:Oath]] turns a likely loss into a likely win.

Even though [[Oath of Nissa:Oath]] sometimes whiffs, it's still better across the board than a vanilla cantrip (like the cycling on [[Dissenter's Deliverance]]). It even compares favorably to [[Street Wraith]], which serves as a sort of control[^5]. Playing [[Street Wraith:Wraith]] or some extra lands make the deck marginally more consistent on T3, but [[Oath of Nissa:Oath]] provides a much larger benefit on T4.

[^5]: In real life, [[Street Wraith]] makes mulligan choices difficult, and two life is a real cost. My simulation doesn't care about those things, so [[Street Wraith:Wraith]] is just like playing a 56-card deck.

[[Desperate Ritual:Ritual]]s can get [[Primeval Titan:Titan]] onto the table faster than [[Oath of Nissa:Oath]], but there's a problem with that approach: when we go [[Desperate Ritual:Ritual]]-[[Desperate Ritual:Ritual]]-[[Through the Breach:Breach]], we don't win[^11]. [[Valakut, the Molten Pinnacle:Valakut]] doesn't do anything unless we've also got a pile of [[Mountain]]s.

[^11]: [Older builds](https://www.mtggoldfish.com/deck/372148#paper) of the deck didn't even play [[Simian Spirit Guide]]. One free mana is good, but [[Simian Spirit Guide:Guide]]-[[Simian Spirit Guide:Guide]]-[[Through the Breach:Breach]] is bad. [[Desperate Ritual]] is much worse than [[Simian Spirit Guide]]; we can't find it with [[Oath of Nissa]], and we can't play it as a blocker to buy ourselves a turn.

The above numbers don't tell the whole story. They can't tell us how often Matthias' build loses because it doesn't have a [[Lightning Bolt:Bolt]] for [[Goblin Electromancer]] or [[Karn Liberated:Karn]]. But, assuming it's safe to drop the interactive suite down to three cards, [[Oath of Nissa]] is the card to beat for those last four slots.

### [[Exploration]] and Experimentation

Having built this simulation of Titan Breach, I had my own bone to pick with the conventional wisdom: is [[Farseek]][^10] really better than [[Explore]]?

[^10]: [[Sakura-Tribe Elder]] only searches up basic lands, which in a sense makes it worse than [[Farseek]]. But that's more than made up for by its ability to soak up damage against [Burn](https://www.mtggoldfish.com/archetype/modern-burn-34574#paper) and [Affinity](https://www.mtggoldfish.com/archetype/modern-affinity-8972#paper).

[[Farseek]] is easy to evaluate: it ramps us into a [[Cinder Glade:dual land]], which counts as a [[Mountain]] for [[Valakut, the Molten Pinnacle:Valakut]] as well as giving us another green source in case we need to hard-cast [[Primeval Titan:Titan]]. [[Explore]] is trickier. It's *usually* a ramp spell on T2, but sometimes it whiffs. The trade-off is, it *sometimes* helps find a missing [[Through the Breach:Breach]] or [[Primeval Titan:Titan]]. [[Explore]] also lets us play the extra land untapped, which *occasionally* lets us squeeze in an extra [[Oath of Nissa:Oath]] or [[Lightning Bolt:Bolt]].

All of the lists aggregated by [MTGGoldfish](https://www.mtggoldfish.com/archetype/modern-titanshift-40829#paper) play [[Farseek]] over [[Explore]]. So does Matthias. But it's not obvious -- to me, at least -- whether it's actually better. So I plugged it into the simulation.

| Farseek vs Explore      | T3 Play | T3 Draw | T4 Play | T4 Draw |
|:------------------------|--------:|--------:|--------:|--------:|
| [[Farseek]]             |   11.5% |   20.4% |   64.3% |   75.6% |
| [[Explore]]             |   13.6% |   24.4% |   65.4% |   77.0% |

<p class="table-caption">The conventional wisdom prefers [[Farseek]] over [[Explore]]. It turns out, [[Explore]] is slightly better at producing a fast [[Primeval Titan]]. T3 (T4) values are plus-or-minus 0.4% (0.8%).</p>

The difference is modest. But -- in terms of getting [[Primeval Titan]] onto the table -- [[Explore]] performs better than [[Farseek]] on T3 as well as T4.

---

At this point, the list looks pretty good. None of the remaining four-ofs seem replaceable. But there may still be room for fine-tuning. Instead of 25 lands, what if we played 24 or 26? What if we bumped our number of two-cost ramp spells from 8 to 9, or dropped it to 7? The table below shows a few plausible swaps.

| Swap in Question                                  | T3 Play | T3 Draw | T4 Play | T4 Draw |
|:--------------------------------------------------|--------:|--------:|--------:|--------:|
| Baseline (4 [[Oath of Nissa]], 4 [[Explore]])     |   13.6% |   24.4% |   65.4% |   77.0% |
| +1 [[Farseek]], -1 [[Oath of Nissa]]              |   13.5% |   23.6% |   63.9% |   75.7% |
| +1 [[Farseek]], -1 [[Summoner's Pact]]            |   13.2% |   23.6% |   63.7% |   75.5% |
| +1 [[Farseek]], -1 [[Windswept Heath]]            |   12.9% |   23.2% |   65.3% |   75.8% |
| +1 [[Windswept Heath]], -1 [[Explore]]            |   13.7% |   23.8% |   65.3% |   76.9% |
| +1 [[Windswept Heath]], -1 [[Sakura-Tribe Elder]] |   14.1% |   24.8% |   65.1% |   76.9% |
| +1 [[Windswept Heath]], -1 [[Oath of Nissa]]      |   14.0% |   24.4% |   65.7% |   77.3% |
| +1 [[Windswept Heath]], -1 [[Summoner's Pact]]    |   13.7% |   23.9% |   64.7% |   75.4% |

<p class="table-caption">The above table compares the odds of T3 and T4 [[Primeval Titan:Titan]] as a result of several prospective swaps in the maindeck. T3 (T4) values are plus-or-minus 0.4% (0.8%).</p>

We're only changing one card at a time here, so the effects are small -- mostly right around the threshold of [statistical significance](https://en.wikipedia.org/wiki/Statistical_significance) -- but it looks like a 26th land would be a good idea. That probably means dropping an [[Oath of Nissa:Oath]], though if your local metagame is light on aggro you might go for [[Sakura-Tribe Elder]] instead.

Swapping our 4th [[Oath of Nissa:Oath]] for a 26th land makes us a hair more likely to drop [[Primeval Titan:Titan]] on T3, and doesn't cost us anything on T4. It also makes us slightly less likely to whiff with the remaining [[Oath of Nissa:Oath]]s, and with [[Explore]]. And, perhaps most importantly, the 26th land accommodates for the fact that these simulations *slightly* over-estimate our odds of drawing lands.

### Warning: Science

Shuffling is a problem for our simulation, so we don't do it. When the computer pops [[Sakura-Tribe Elder]] for a [[Mountain]], it doesn't pull that [[Mountain]] out of our deck; it just creates a new one out of thin air. This means we don't capture the (marginal) effects of deck thinning. The code's [documentation](https://github.com/charles-uno/mtg-model) goes into the issue in detail, but to get the idea, let's walk through an example:

> It's T3. We've got plenty of land and a [[Through the Breach]], but we haven't drawn [[Primeval Titan]] yet. We play a [[Wooded Foothills]] and crack it. The options are [[Cinder Glade]], [[Forest]], [[Mountain]], and [[Stomping Ground]].
>
> Strategically, there's little difference between them. No matter what we fetch, we'll be able to [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] as soon as we draw it. But the computer sees a choice, so it tries all the options. It makes 4 copies of the current game state (including the order of the deck). Then game state #1 fetches a [[Cinder Glade]] and shuffles, game state #2 fetches a [[Forest]] and shuffles, etc.
>
> There are about 48 cards left in the deck at this point, including 4 [[Primeval Titan:Titan]]s and 4 [[Summoner's Pact:Pact]]s, so each game state has a [one-in-six](https://www.youtube.com/watch?v=Dkc0RZ8Ym1Y&t=14) chance to hit. If one of them does, it stops the simulation, saying "I found a line that gets T4 [[Primeval Titan:Titan]]!" But -- because the states were all shuffled independently -- that happens way more often than one-in-six.

When game states shuffle independently, it essentially lets us double-dip on luck. It's like rolling four dice and keeping the best result. We can make the problem smaller by always shuffling in the same way, or by fetching the land but leaving the rest of the deck alone, but it doesn't go away. The only way to completely solve the problem is to make it impossible for the order of our deck to be affected by a "free" choice (like what to fetch).

The thinning effect is small, even though this deck searches up a *lot* of lands. At the start of T4, if we have 4 lands in play and one in our hand, that leaves 21 in the deck; that gives us a 44% chance of drawing a land (21/48) this turn. But the computer didn't thin our deck when we fetched or [[Search for Tomorrow:Search]]ed, so it thinks we have a 46% chance (23/50) instead.

### Deck Chairs on the [[Primeval Titan:Titan]]ic

Keep in mind that I'm a number cruncher, not a professional *Magic* player. I can't tell you much about what the sideboard should look like, or what combination of [[Obstinate Baloth:Baloth]]/[[Lightning Bolt:Bolt]]/[[Chandra, Torch of Defiance:Chandra]]/[[Relic of Progenitus:Relic]]/whatever is ideal in those three interactive slots as the metagame evolves.

<table class="cardlist">
    <caption class="deckname">Charles' Titan Breach</caption>
    <tr>
        <td>
            4 [[Primeval Titan]]<br>
            4 [[Sakura-Tribe Elder]]<br>
            4 [[Simian Spirit Guide]]<br>
        </td>
        <td>
            4 [[Farseek]]<br>
            3 [[Lightning Bolt]]<br>
            3 [[Oath of Nissa]]<br>
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
            4 [[Windswept Heath]]<br>
            4 [[Wooded Foothills]]<br>
        </td>
    </tr>
</table>

But I can tell you, if you want to pinch off [[Primeval Titan:Titan]]s as efficiently as possible, [[Oath of Nissa]] and [[Explore]] probably belong in your sixty.
