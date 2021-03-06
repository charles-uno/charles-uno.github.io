---
layout: post
title: "Deck Chairs on the Titanic"
image: "/assets/images/thumb/pt-rix.png"
description: "What do we learn by simulating a million hands of Titan Breach?"
tags: games code
hidden: true
send_to: /valakut-simulation
---


I played my first match of Modern in September. Two months later, I won a Modern RPTQ and tickets to Spain for the [Pro Tour](https://magic.wizards.com/en/events/premierplay/protour/ptrix). Despite a few embarrassing punts, I managed a 6-4 finish in the Modern portion -- pretty good for a guy who's never even made Day 2 of a Grand Prix!

My secret isn't long practice sessions, or spicy sideboard choices, or deep metagame knowledge -- it's number crunching. After spiking the PPTQ in September, I coded up my deck in Python[^3]. The computer's better-than-perfect play (more on this in a moment) then allowed me to compare dozens of variations of the deck by [goldfishing](https://mtg.gamepedia.com/Goldfishing) millions of games -- and finding flaws in the conventional wisdom that could never be discovered by hand.

[^3]: Code is visible on GitHub [here](https://github.com/charles-uno/mtg-model/). Comments and pull requests welcome!

## The Deck

The deck is Titan Breach, an all-in cousin of Scapeshift. A good draw can win the game on T3 by using [[Through the Breach]] and [[Primeval Titan]] to repeatedly trigger [[Valakut, the Molten Pinnacle]]. It's also possible to hard-cast [[Primeval Titan]] on T3 with [[Simian Spirit Guide]]; this doesn't win outright, but it sets up a board state few opponents can overcome.

Before we get into modeling and optimization, let's establish a baseline. Assuming the flex slots (indicated by question marks) are blanks, the build can [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on T3 in 27% of games, and cast a T3 [[Primeval Titan:Titan]] in another 9% of games. Hands without a T3 [[Primeval Titan:Titan]] almost always (90%) have one on T4, which can still be good enough, but is considerably more "fair."

<table class="cardlist">
    <caption class="deckname">Baseline Titan Breach</caption>
    <tr>
        <td>
            4 [[Explore]]<br>
            2 [[Lightning Bolt]]<br>
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
            8 [[Mountain]]<br>
            4 [[Stomping Ground]]<br>
            4 [[Valakut, the Molten Pinnacle]]<br>
            4 [[Windswept Heath]]<br>
            4 [[Wooded Foothills]]<br>
        </td>
    </tr>
</table>

Right off the bat, let's talk about [[Simian Spirit Guide]]. Many lists include only two or three copies, but I enthusiastically play a full set. Per the table below, [[Simian Spirit Guide:SSG]] is hugely important to the explosiveness of Titan Breach. It's a core piece of the deck, right up there with [[Search for Tomorrow]] and [[Through the Breach]]. I would play a different deck before cutting a single copy.

| Number of [[Simian Spirit Guide:SSGs]] | Breach T3 | ≥ Cast T3 | ≥ Breach T4 | ≥ Cast T4 |
|:---------------------------------------|:---------:|:---------:|:-----------:|:---------:|
| 4                                      | 27%       | 36%       | 73%         | 90%       |
| 3                                      | 22%       | 29%       | 69%         | 87%       |
| 2                                      | 17%       | 21%       | 65%         | 84%       |
| 1                                      | 13%       | 14%       | 60%         | 80%       |
| 0                                      | 8%        | 8%        | 56%         | 75%       |

<p class="table-caption">Odds to cast or [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on T3 depends strongly on how many copies of [[Simian Spirit Guide]] we play. Replacement cards are blanks. Values are cumulative from left to right; "≥ Breach T4" gives the deck's odds to <em>at worst</em> Breach on T4. Half of games are simulated on the play, the other half on the draw. All values ±1%.</p>

The conventional wisdom prefers [[Farseek]], but I play [[Explore]]. Sometimes [[Explore]] whiffs, which feels pretty bad, but it also has a chance to draw into a missing [[Through the Breach:Breach]], [[Primeval Titan:Titan]], or [[Simian Spirit Guide:SSG]]. Overall, [[Farseek]] and [[Explore]] are comparably good at landing [[Primeval Titan]] by T4, but [[Explore]] is a bit better at doing so on T3 (see table below).

| Baseline Configuration | Breach T3 | ≥ Cast T3 | ≥ Breach T4 | ≥ Cast T4 |
|:-----------------------|:---------:|:---------:|:-----------:|:---------:|
| [[Explore]], 25 Lands  | 25.0%     | 33.6%     | 70.6%       | 88.3%     |
| [[Farseek]], 25 Lands  | 24.0%     | 32.5%     | 69.2%       | 88.5%     |
| [[Explore]], 26 Lands  | 26.8%     | 36.2%     | 73.1%       | 89.7%     |
| [[Farseek]], 26 Lands  | 25.1%     | 33.7%     | 71.3%       | 89.9%     |

<p class="table-caption">Odds to cast or [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] based on whether we play [[Explore]] or [[Farseek]], and whether we cut a [[Lightning Bolt]] for a 26th land. Half of games are simulated on the play, the other half on the draw. All values ±0.5%.</p>

I also play 26 lands, rather than the tried-and-true 25. The 26th land gives an extra few percentage points to make [[Primeval Titan]] on T3, and it's a good topdeck in games that go long. Goldfishing can't tell us if that's better or worse than an extra [[Lightning Bolt]] (or [[Anger of the Gods:Anger]], or [[Relic of Progenitus:Relic]], or whatever), but my experience suggests that two slots of interaction is about right.

Once in a while, it's possible to steal a win by zapping [[Goblin Electromancer]] or [[Devoted Druid]], but most of the time [[Lightning Bolt]] is either useless or unnecessary. Titan Breach doesn't win by stabilizing the board and depleting the other player's resources. It wins by doing unfair things quickly and consistently -- and [[Lightning Bolt]] doesn't help with that.

## The Model

In Frank Karsten's models, he spells out explicitly how the computer should [mulligan](https://www.channelfireball.com/articles/powerful-mox-amber-brews-in-modern-and-standard/) and [sequence its plays](https://www.channelfireball.com/articles/how-reliable-is-hollow-one/). I haven't got the patience (or credibility) for that, so my model uses brute force. Every time the computer has a choice between multiple plays, it makes that many copies of the game state and tries them all.

The computer makes thousands of copies of each hand. Each copy is played differently, and most of those plays are awful. For example, one copy passes its first turn without playing a land. Another exiles [[Simian Spirit Guide]] right away, even if there's nothing to cast with it. The upside of this approach is that it can determine with 100% accuracy whether a hand can produce a T3 [[Primeval Titan]].

In fact, the computer is a little *too* good. Trying every possible line and keeping the best one allows it to exhibit better-than-perfect play. For example, the model doesn't have to commit to a mulligan based on its seven-card hand; it gets to play out that hand, then play out its six-card hand, then play out its five-card hand, and keep whichever turns out best[^8].

[^8]: The model is very aggressive about taking mulligans. It only keeps its seven-card hand about half the time.

Shuffling is also a problem, though it's a bit more subtle:

> Suppose it's T3. You have three lands in play, another in hand, and you're casting [[Search for Tomorrow]] from exile. You're holding [[Primeval Titan]]. With four [[Through the Breach]] and four [[Simian Spirit Guide:SSG]] in your remaining fifty cards, you've got a 16% chance to draw one and make a T3 [[Primeval Titan:Titan]].
>
> But the computer sees a choice: it could [[Search for Tomorrow:Search]] for a [[Forest]] or for a [[Mountain]]. So it makes two copies of the game and tries them both. Each copy has a 16% chance to make T3 [[Primeval Titan:Titan]] -- but because the two decks were shuffled independently, one of them will hit [almost 30%](http://www.wolframalpha.com/input/?i=1+-+(1+-+16%25)(1+-+16%25)) of the time!

Essentially, by trying all choices and keeping the best outcome, the model gets to double-dip on luck. As a workaround, after shuffling at the start of the game, everything plays out deterministically. Whenever the model would thin a land from the deck, instead it just creates a new one out of thin air. This causes the model to slightly[^7] overestimate the odds of drawing a land as the game goes on.

[^7]: At the start of T3, with three lands in play and two in hand, the computer has a 41% chance of drawing a land (21/51) this turn. But if two lands were thinned  out of the deck with [[Wooded Foothills]] and [[Search for Tomorrow]], that number should be 39% (19/49) instead. Overall, the model draws one too many lands (and one too few spells) about once per thirty games, which bumps all the numbers by about half a percent.

To be clear, these caveats are at the margin. Based on manual inspection of the computer's sequencing for hundreds of hands, it finds the same lines that a human player would. And it finds them *fast*. A laptop running this model can churn through 100k hands overnight, allowing far greater precision than is possible by hand.

## The Contenders

The best Titan Breach hands all look about the same: T1 suspend [[Search for Tomorrow:Search]], T2 [[Sakura-Tribe Elder:Steve]]/[[Explore]], T3 [[Through the Breach:Breach]] into [[Summoner's Pact:Pact]]/[[Primeval Titan:Titan]]. With eight two-drop ramp spells and (essentially) eight [[Primeval Titan:Titans]], it's reasonably safe[^10] to expect one of each. The same can't be said for [[Search for Tomorrow]] or [[Through the Breach]]. Even with [[Simian Spirit Guide]] to fill in some gaps, we often have nothing to do on T1, or fall short on T3.

[^10]: With four [[Summoner's Pact]] and four [[Primeval Titan]] in a sixty-card deck, there's a [65% chance](http://www.wolframalpha.com/input/?i=1+-+(52+choose+7)%2F(60+choose+7)) to see one in the opening hand, and a 77% chance to draw one by T3 ([75%](http://www.wolframalpha.com/input/?i=1+-+(52+choose+9)%2F(60+choose+9)) play, [79%](http://www.wolframalpha.com/input/?i=1+-+(52+choose+10)%2F(60+choose+10)) draw). With only four copies of [[Through the Breach]], we there's only a [40% chance](http://www.wolframalpha.com/input/?i=1+-+(56+choose+7)%2F(60+choose+7)) to see one in our opening hand and a 51% chance to find one by T3 ([49%](http://www.wolframalpha.com/input/?i=1+-+(56+choose+7)%2F(60+choose+7)) play, [53%](http://www.wolframalpha.com/input/?i=1+-+(56+choose+10)%2F(60+choose+10)) draw).

This suggests three different directions for the flex slots:

- **More acceleration.** [[Utopia Sprawl]] does a passable impression of [[Search for Tomorrow]] on T1. [[Desperate Ritual]], like [[Through the Breach]], lets us cast [[Primeval Titan]] off five mana on T3.
- **Extra haymakers.** Sometimes we have five mana on T3 but no [[Through the Breach]]. [[Dramatic Entrance]] and [[Hour of Promise]] are plausible substitutes. We can also check out the effect of an extra set of fatties to [[Through the Breach:Breach]] -- [[Woodfall Primus]] or whatever.
- **Cantrips.** If we don't have [[Search for Tomorrow]] on T1, let's instead use our first land drop to make sure T2 and T3 go as well as possible. [Matthias Hunt](http://www.starcitygames.com/events/coverage/rg_valakut_with_matthias_hunt.html) played [[Oath of Nissa]] in Titan Breach a while back[^12]. For comparison, let's also look at vanilla [[Street Wraith:zero-mana]] and [[Deadshot Minotaur:one-mana]] cantrips, as well as [[Faithless Looting]], [[Ancient Stirrings]][^11], and even "colorshifted" [[Serum Visions]][^14].

[^11]: On its face, [[Ancient Stirrings]] seems like an odd choice in this deck. Some builds include an [[Emrakul, the Aeons Torn:Emrakul]] or two, but otherwise the only colorless cards are lands. It actually plays surprisingly well. Finding [[Valakut, the Molten Pinnacle]] is valuable against permission-heavy opponents. Finding fetches (and leaving mountains in the deck) allows us to trigger [[Valakut, the Molten Pinnacle:Valakut]] at instant speed against [[Inkmoth Nexus:creature-lands]]. And many important sideboard cards are colorless: [[Chalice of the Void]], [[Engineered Explosives]], [[Relic of Progenitus]], [[Grafdigger's Cage]], etc.

[^12]: Matthias' build of Titan Breach is the one that carried me through my PPTQ. When I asked him about [[Oath of Nissa]], he told me: "Titan Breach isn't a control deck, and it's not a [[Through the Breach]] deck. It's a combo deck, and the combo is [[Primeval Titan]]. You don't cut [[Oath of Nissa]] from Titan Breach just like you don't cut [[Serum Visions]] from Storm."

[^14]: Cantrips like [[Serum Visions]] are a perfect example of why we use a brute force model. Programming a computer to scry correctly would be tedious, plus there's no guarantee that we would get it right. Trying every option tells us about the potential of [[Serum Visions]] as a card, independent of our abilities as players.

The model allows us to see precisely how each of these options impacts our odds to produce [[Primeval Titan]] on T3.

## The Results

**The effect of more acceleration is huge.** Over the course of eight rounds, the baseline list will average seven T3 [[Primeval Titan:Titans]]. Adding a set of [[Desperate Ritual:Rituals]] bumps that number up to *twelve*  (with [[Utopia Sprawl]] just a bit behind, see below).

| Flex Slot             | Breach T3 | ≥ Cast T3 | ≥ Breach T4 | ≥ Cast T4 |
|:----------------------|:---------:|:---------:|:-----------:|:---------:|
| (Blank)               | 27%       | 36%       | 73%         | 90%       |
| [[Desperate Ritual]]  | 44%       | 63%       | 85%         | 96%       |
| [[Utopia Sprawl]]     | 40%       | 58%       | 80%         | 95%       |

<p class="table-caption">Odds to cast or [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on T3 when the flex slots in the above list are acceleration. Half of games are simulated on the play, the other half on the draw. All values ±1%.</p>

Unfortunately, not all T3 [[Primeval Titan:Titans]] are created equal. Four mountains into [[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]] lets us grab two [[Valakut, the Molten Pinnacle:Valakuts]] and two mountains -- that's four triggers now, and two for each future land drop. But three mountains into [[Desperate Ritual:Ritual]]-[[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]] means we only get one [[Valakut, the Molten Pinnacle:Valakut]] (half as many triggers) or we don't get the sixth mountain (no triggers right away)[^13].

[^13]: [[Blighted Woodland]] is a spicy piece of tech for builds with extra acceleration. When fetched instead of the fifth mountain, it represents a lot of extra [[Valakut, the Molten Pinnacle:Valakut]] triggers -- provided our opponent can't win before we untap.

These gains are also fragile. [[Utopia Sprawl]] sets us up to be clobbered by [[Field of Ruin]], plus it can be knocked off by [[Blood Moon]] or [[Spreading Seas]]. [[Desperate Ritual]] is blanked by [[Thalia, Guardian of Thraben:Thalia]] and easily stranded by discard spells. Plus they're awful topdecks after the first few turns -- at least [[Simian Spirit Guide]] can be cast as [[Gray Ogre]] in a pinch!

Extra acceleration is at its best in racing matchups with little interaction: Tron, Affinity, and Burn. Once in a while, it'll even let us steal a win against a faster deck like Storm or Infect. But a single [[Thoughtseize]] can make us look like idiots.

---

**The extra haymakers are a mixed bag.** [[Dramatic Entrance]] jumps us from five mana to six, but it doesn't play well in multiples, doesn't let us cheat on green sources, and doesn't give haste. In other words, at least as far as the model is concerned, it's just a worse [[Desperate Ritual]]. Per the table below, it gives about half the T3 boost, and carries half the liability as well: it's good against counterspells but bad against [[Thoughtseize]]. Unless [[Jace, the Mind Sculptor:Jace]] turns Modern into a mono-blue hellscape, we won't be sleeving it up.

| Flex Slot             | Breach T3 | ≥ Cast T3 | ≥ Breach T4 | ≥ Cast T4 |
|:----------------------|:---------:|:---------:|:-----------:|:---------:|
| (Blank)               | 27%       | 36%       | 73%         | 90%       |
| [[Dramatic Entrance]] | 27%       | 47%       | 78%         | 93%       |
| [[Hour of Promise]]   | 27%       | 59%       | 83%         | 97%       |
| [[Woodfall Primus]]   | 33%       | 42%       | 80%         | 93%       |

<p class="table-caption">Odds to cast/[[Through the Breach:Breach]]/[[Dramatic Entrance:Enter]] a [[Primeval Titan:Titan]]/[[Woodfall Primus:Primus]], or cast [[Hour of Promise:Hour]], on T3 when the flex slots in the above list are extra haymakers. Half of games are simulated on the play, the other half on the draw. All values ±1%.</p>

[[Woodfall Primus]] (or [[Worldspine Wurm:Wurmple]], or [[Emrakul, the Aeons Torn:Emmy]], or whatever) is also unimpressive. It looks like it's only about six percent of games where we have 5 mana on T3, and a [[Through the Breach:Breach]] in hand, but no [[Primeval Titan]].

But [[Hour of Promise]] -- now *there's* a haymaker worth talking about. Number-wise, it falls just shy of [[Desperate Ritual]] in terms of doing something big on T3 -- and, unlike [[Desperate Ritual]], it's great for the deck's resiliency. It gives us four extra topdecks to finish off a stabilized Jund opponent, and four extra must-counter threats against Jeskai's limited number of counterspells.

The problem with [[Hour of Promise]] is that it doesn't close out a game on its own. Tron, Affinity, and Burn don't care about our T3 [[Hour of Promise]] unless we follow it up with a T4 [[Primeval Titan]].

---

**Some cantrips are better than others.** It's clear that Matthias was onto something with [[Oath of Nissa]]. In the first few turns, [[Oath of Nissa:Oath]] digs through our deck about as well as a [[Street Wraith:zero-mana cantrip]]. It's better than [[Ancient Stirrings]], which is in turn better than a vanilla [[Deadshot Minotaur:one-mana cantrip]]. [[Oath of Nissa:Oath]] falls just shy of [[Serum Visions]], the [top cantrip in Modern](https://www.mtggoldfish.com/format-staples/modern) (see table).

[[Faithless Looting]] outperforms [[Oath of Nissa]], but probably not by enough. We're not able to use our graveyard as a resource, and we don't have many dead draws to filter through in the late game, so it matters a lot that [[Faithless Looting]] doesn't replace itself[^17].

[^17]: Strictly speaking, [[Oath of Nissa:Oath]] doesn't always replace itself. In a 60 card deck with 26 lands and 12 creatures, it has about a [one-in-twenty](http://www.wolframalpha.com/input/?i=(22+choose+3)%2F(60+choose+3)) chance to whiff.

| Flex Slot             | Breach T3 | ≥ Cast T3 | ≥ Breach T4 | ≥ Cast T4 |
|:----------------------|:---------:|:---------:|:-----------:|:---------:|
| (Blank)               | 27%       | 36%       | 73%         | 90%       |
| [[Ancient Stirrings]] | 33%       | 43%       | 85%         | 96%       |
| [[Deadshot Minotaur]] | 31%       | 41%       | 80%         | 94%       |
| [[Faithless Looting]] | 37%       | 47%       | 89%         | 96%       |
| [[Oath of Nissa]]     | 35%       | 46%       | 86%         | 96%       |
| [[Serum Visions]]     | 37%       | 47%       | 87%         | 95%       |
| [[Street Wraith]]     | 35%       | 46%       | 82%         | 95%       |

<p class="table-caption">Odds to cast or [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on T3 when the flex slots in the above list are cantrips. Half of games are simulated on the play, the other half on the draw. All values ±1%.</p>

After looking at [[Desperate Ritual]] and [[Hour of Promise]], we might see [[Oath of Nissa]] as a compromise between them. The boost it gives is relatively modest. But (unlike with [[Hour of Promise:Hour]]) we're not settling for a smaller haymaker, and (unlike with [[Desperate Ritual:Ritual]]) we're not a glass cannon. Put another way, [[Oath of Nissa:Oath]] is the third leg of the speed-resiliency-impact triangle:

- [[Desperate Ritual]] boosts our odds of landing [[Primeval Titan]] on T3 by 26%, but it doesn't play well against counterspells and discard.
- [[Hour of Promise]] boosts our odds of doing *something* big on T3 by 23%, and insulates us against disruption, but [[Hour of Promise:Hour]] doesn't race as well as an actual [[Primeval Titan:Titan]].
- [[Oath of Nissa]] insulates us against disruption and boosts our odds of landing [[Primeval Titan]] on T3, but only by 10%.

One of these three is probably better than the others in the current metagame. Perhaps one of them is just better outright. But -- if we're looking to steal games with [[Valakut, the Molten Pinnacle:Valakut]] on T3 -- it seems unlikely that we should be playing anything else.

## The Fine Print

What happens if we play a combination of [[Desperate Ritual:Rituals]] and [[Hour of Promise:Hours]]? Does [[Ancient Stirrings]] get better than [[Oath of Nissa]] if we're also playing a singleton [[Emrakul, the Aeons Torn:Emrakul]]? What happens if we go *really* all-in, cutting the [[Lightning Bolt:Bolts]] so we can play [[Desperate Ritual]] *and* [[Faithless Looting]]?

You caught me. I don't know. There are thousands of possible configurations, and I've only looked at a fraction of them. If you're curious about something, head over to [GitHub](https://github.com/charles-uno/mtg-model) and take the model for a spin!
