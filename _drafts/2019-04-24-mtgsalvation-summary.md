---
layout: post
title: "Deck Chairs on the Titanic"
image: "/assets/images/thumb/pt-rix.png"
description: How do we estimate the value of "draw a card"?
tags: games stem
---

In late 2017, [Matthias](http://www.starcitygames.com/events/coverage/rg_valakut_with_matthias_hunt.html) lent me a deck so I could tag along to my first Modern tournament. A few months later, I flew to Spain and broke even against world-class opponents at the [Pro Tour](https://magic.wizards.com/en/events/premierplay/protour/ptrix). My secret, honestly, was [[Valakut, the Molten Pinnacle:Valakut]]. The deck is resilient and redundant, making it incredibly friendly to beginners. All the cards are basically lands. You keep putting them on the table until your opponent concedes!

The downside of "resilient and redundant" is that the [[Valakut, the Molten Pinnacle:Valakut]] can get repetitive. As I learned the format, I could anticipate my opponents' tricks and guess their sideboard choices. But you wouldn't know it from my plays: ramp spell, ramp spell, ramp spell, [[Primeval Titan]]. I eventually got to wondering how the deck could be made more flexible -- without losing the consistency that's key to its success.

## Quick on the Draw

In particular, I'm curious about [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]]. Conventional wisdom strongly prefers [[Farseek]] for its reliability; [[Explore]] can whiff if we don't have an extra land in hand. Similarly, [[Cinder Glade]] typically enters the battlefield untapped from turn three onward, while [[Sheltered Thicket]] can be an awkward topdeck when we need a sixth mana for [[Primeval Titan]]. [[Sheltered Thicket]] sees fringe play in *addition* to [[Cinder Glade]], but rarely takes its place.

![Valakut Preference Poll](/assets/images/valakut-poll-16x9.png)
*A poll of the Valakut group on Facebook gives a sense for the conventional wisdom. [[Cinder Glade]] is strongly preferred over [[Sheltered Thicket]].*

But [[Explore]] and [[Sheltered Thicket]] have three important words that [[Farseek]] and [[Cinder Glade]] don't: "draw a card." Early on, drawing an extra card can help us assemble an explosive win on turn three or four. Later on, drawing a card increases our exposure to high-impact finishers and sideboard cards. Seeing an extra card is particularly advantageous when our opponent is able to disrupt our plans with [[Cryptic Command:counterspells]], [[Fulminator Mage:land destruction]], and/or [[Blood Moon:lock pieces]]. The question is, if we want the flexibility, how does it affect our speed?

## The Model

This is where the computer comes in. My numerical model[^1] can read in a deck list, [goldfish](https://mtg.gamepedia.com/Goldfishing) thousands of games, and tell us exactly how fast that list can expect to land a [[Primeval Titan]] or [[Scapeshift]]. The model doesn't know anything about sequencing or strategy. Instead, it tries all possible combinations of legal plays and keeps whichever one wins fastest. This approach is computationally inefficient, but it's guaranteed to find the fastest way to win, even when faced with nontrivial choices.

[^1]: The code (written in Go) is available on GitHub [here](https://github.com/charles-uno/valakut). I also have an older version of the model written in [Python](https://github.com/charles-uno/valakut-python).

For example, on turn two, we sometimes have to choose between casting [[Sakura-Tribe Elder:STE]] and [[Explore]]. An experienced player can generally eyeball it, but spelling out the decision explicitly for the computer is tedious and error-prone -- a calculation based on how many lands are in our hand, whether we need a second green source, how many live draws we have to make turn-three [[Through the Breach:Breach]] (or [[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]]), and so on. Instead of all that, we just make two copies of the game. One plays [[Sakura-Tribe Elder:STE]] and the other plays [[Explore]]. If *either* copy pulls off turn-three [[Through the Breach:Breach]], it's pretty safe to say a human player could have done the same.

The big caveat is shuffling. The computer is programmed to try all possible options to find the one that wins fastest -- including sequencing its plays to shuffle at just the right time to blind-draw into better cards. Essentially, the computer has superhuman "instincts" about the order of the deck. To suppress those non-human play patterns, the order of the deck is locked in as soon as the game begins. There are no mulligans. Any time the computer would search its deck for a [[Forest]], instead it leaves the deck as-is and creates a new [[Forest]] out of thin air. This means no deck thinning, which introduces a percent-level[^2] uncertainty.

[^2]: About one land is thinned from the deck each turn. We simulate out to turn five. That means the model draws about one too many lands (and one too few spells) per twenty hands. We eyeball the size of this effect by manually thinning a land from the deck often enough to draw the correct number of lands on average.

## Titan Breach

Let's start with [Titan Breach](https://www.mtggoldfish.com/archetype/modern-titan-breach#paper) -- the deck I played in Spain. The deck uses [[Simian Spirit Guide]] and [[Through the Breach]] to get [[Primeval Titan]] onto the table as quickly as possible, potentially winning the game on turn three. Below is a typical deck list, more or less[^3]. Note that six slots are reserved for interaction: [[Anger of the Gods]], [[Chalice of the Void]], [[Lightning Bolt]], and so on. These cards don't directly contribute to getting [[Primeval Titan]] on the table, so as far as the simulation is concerned they're blanks.

[^3]: Two or three copies of [[Cinder Glade]] would be more typical. We bump it up to the full set to make the difference between [[Cinder Glade]] and [[Sheltered Thicket]] as clear as possible.

<table class="cardlist">
    <caption class="deckname">Titan Breach</caption>
    <tr>
        <td>
            6 [[Anger of the Gods]] or whatever<br>
            4 [[Farseek]]<br>
            4 [[Primeval Titan]]<br>
            4 [[Sakura-Tribe Elder]]<br>
            4 [[Search for Tomorrow]]<br>
            4 [[Simian Spirit Guide]]<br>
            4 [[Summoner's Pact]]<br>
            4 [[Through the Breach]]<br>
            1 [[Woodfall Primus]]<br>
        </td>
        <td>
            1 [[Blighted Woodland]]<br>
            4 [[Cinder Glade]]<br>
            2 [[Forest]]<br>
            6 [[Mountain]]<br>
            4 [[Stomping Ground]]<br>
            4 [[Valakut, the Molten Pinnacle]]<br>
            4 [[Wooded Foothills]]<br>
        </td>
    </tr>
</table>

We simulate four different variations of this deck to cover all combinations of [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]]. We also run the same model back using [[Shivan Oasis]][^4]. This allows us to disentangle the upside of cycling from the downside of always entering the battlefield tapped. The table below shows how the numbers shake out:

[^4]: We would never actually play [[Shivan Oasis]], since it doesn't have the Mountain subtype (which is what makes [[Valakut, the Molten Pinnacle:Valakut]] tick). It's standing in for a [[Taiga]] that always enters the battlefield tapped.

| Titan Breach Variation             | T3   | ≤ T3.5 | ≤ T4   | ≤ T4.5 |
|:-----------------------------------|:----:|:------:|:------:|:------:|
| [[Explore]], [[Cinder Glade]]      | 14%  | 19%    | 42%    | 62%    |
| [[Explore]], [[Sheltered Thicket]] | 13%  | 17%    | 43%    | 63%    |
| [[Explore]], [[Shivan Oasis]]      | 12%  | 16%    | 42%    | 62%    |
| [[Farseek]], [[Cinder Glade]]      | 12%  | 16%    | 40%    | 61%    |
| [[Farseek]], [[Sheltered Thicket]] | 11%  | 15%    | 41%    | 63%    |
| [[Farseek]], [[Shivan Oasis]]      | 11%  | 15%    | 39%    | 60%    |

<p class="table-caption">T3 is the odds to [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on turn three, which wins on the spot. T3.5 refers to hard-casting [[Primeval Titan:Titan]] on turn three, which often stabilizes the board right away, but doesn't win until the next turn. Values are cumulative, so "≤T4" is the sum of T3 odds, T3.5 odds, and T4 odds. All values ±1%.</p>

Right off the bat, we can make a quick sanity check: [[Cinder Glade]] and [[Sheltered Thicket]] both perform better than [[Shivan Oasis]] across the board. If this weren't the case, we'd know something was wrong. It's also reassuring to see that [[Cinder Glade]] is at a relative advantage on turn three, while [[Sheltered Thicket]] performs best on turn four. Even a single tapped land drop makes it hard to curve into a turn-three [[Primeval Titan]], but that extra turn gives us some wiggle room to cycle [[Sheltered Thicket]] in search of a missing piece.

Beyond that, the biggest takeaway is that all the numbers are pretty close together. At most, differences toe the line of statistical significance. That's already a blow to the conventional wisdom. For every hand where we lose a turn whiffing with [[Explore]], there's another where we gain a turn by drawing into a missing [[Through the Breach]]. Likewise, the cycling on [[Sheltered Thicket]] is relevant just as often as [[Cinder Glade]] entering the battlefield untapped. From there, the choice comes down to higher-level considerations, discussed in the wrap-up.

## Intermission

As long as we're crunching numbers, let's spend a moment on [[Simian Spirit Guide]]. Many Titan Breach lists shave a copy, or even cut the card completely, to make room for more interaction. The table below quantifies the effect this has on the deck's speed.

| Number of [[Simian Spirit Guide:SSGs]] | T3   | ≤ T3.5 | ≤ T4   | ≤ T4.5 |
|:---------------------------------------|:----:|:------:|:------:|:------:|
| 0                                      |  3%  |  3%    | 29%    | 47%    |
| 1                                      |  6%  |  7%    | 32%    | 50%    |
| 2                                      |  8%  | 10%    | 34%    | 55%    |
| 3                                      | 11%  | 14%    | 36%    | 56%    |
| 4                                      | 12%  | 16%    | 40%    | 61%    |

<p class="table-caption">T3 is the odds to [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] on turn three, which wins on the spot. T3.5 refers to hard-casting [[Primeval Titan:Titan]] on turn three, which often stabilizes the board right away, but doesn't win until the next turn. Values are cumulative, so "≤T4" is the sum of T3 odds, T3.5 odds, and T4 odds. All values ±1%.</p>

With zero copies of [[Simian Spirit Guide]], only about one in thirty hands can get [[Primeval Titan]] on the table on turn three. A single [[Simian Spirit Guide:SSG]] doubles those odds. A full set *quadruples* them. They also take our turn-four odds from fifty-fifty to two-to-one -- about an extra [[Primeval Titan]] by turn four every six hands. It looks to me like [[Simian Spirit Guide]] and [[Through the Breach]] are a package deal. If you cut either, you might as well cut both and just play Titan Shift, since you're not going to win on turn three anymore.

## Titan Shift

[Titan Shift](https://www.mtggoldfish.com/archetype/modern-titanshift-46457#paper) is the slow-and-steady [[Valakut, the Molten Pinnacle:Valakut]] deck. Instead of trying to win on turn three, it finds time to disrupts its opponent with [[Anger of the Gods]], [[Relic of Progenitus]], or even [[Mwonvuli Acid-Moss]]. The deck has a fair amount of wiggle room -- players often find a place for their pet cards -- but the following is a believable baseline:

<table class="cardlist">
    <caption class="deckname">Titan Shift</caption>
    <tr>
        <td>
            8 [[Anger of the Gods]] or whatever<br>
            4 [[Farseek]]<br>
            1 [[Mwonvuli Acid-Moss]]<br>
            4 [[Primeval Titan]]<br>
            1 [[Prismatic Omen]]<br>
            4 [[Sakura-Tribe Elder]]<br>
            4 [[Scapeshift]]<br>
            4 [[Search for Tomorrow]]<br>
            2 [[Summoner's Pact]]<br>
            1 [[Wood Elves]]<br>
        </td>
        <td>
            1 [[Blighted Woodland]]<br>
            4 [[Cinder Glade]]<br>
            2 [[Forest]]<br>
            8 [[Mountain]]<br>
            4 [[Stomping Ground]]<br>
            4 [[Valakut, the Molten Pinnacle]]<br>
            4 [[Wooded Foothills]]<br>
        </td>
    </tr>
</table>

As with Titan Breach, we simulate all combinations of [[Farseek]] vs [[Explore]] and [[Cinder Glade]] vs [[Sheltered Thicket]]. We also include [[Shivan Oasis]] as a control to disentangle cycling from entering the battlefield untapped. The numbers are below:

| Titan Shift Variation              | T4   | ≤ T4.5 | ≤ T5   | ≤ T5.5 |
|:-----------------------------------|:----:|:------:|:------:|:------:|
| [[Explore]], [[Cinder Glade]]      | 15%  | 40%    | 55%    | 71%    |
| [[Explore]], [[Sheltered Thicket]] | 15%  | 38%    | 54%    | 72%    |
| [[Explore]], [[Shivan Oasis]]      | 14%  | 38%    | 52%    | 69%    |
| [[Farseek]], [[Cinder Glade]]      | 16%  | 41%    | 55%    | 72%    |
| [[Farseek]], [[Sheltered Thicket]] | 16%  | 40%    | 56%    | 73%    |
| [[Farseek]], [[Shivan Oasis]]      | 14%  | 39%    | 55%    | 73%    |

<p class="table-caption">T4 is the odds to cast [[Scapeshift]] on turn four, which wins on the spot. T4.5 refers to hard-casting [[Primeval Titan:Titan]] on T4, which often stabilizes the board right away, but doesn't win until the next turn. Values are cumulative, so "≤T5" is the sum of T4 odds, T4.5 odds, and T5 odds. All values ±1%.</p>

The numbers for Titan Shift tell pretty much the same story we saw for Titan Breach. [[Explore]] and [[Farseek]] put up nearly-identical goldfishing numbers. Same for [[Cinder Glade]] and [[Sheltered Thicket]]. These numbers on their own don't show that [[Explore]] or [[Sheltered Thicket]] are *better* per se -- more on that in a moment -- but they certainly cast doubt on the widespread presumption that they're worse.

## Caveats and Conclusions

As noted up top, the model has superhuman "instincts" about the order of the deck. This means it's a bit too good when making choices about drawing cards with [[Explore]] or [[Sheltered Thicket]]. Luckily, the effect is small. [[Sheltered Thicket]] goldfishes better than [[Shivan Oasis]] once per fifty-ish hands. Some of that benefit is real, while some is due to bias. That puts the scale of the bias around 1%, comparable to our other uncertainties. We don't have a direct comparison for [[Explore]], but we'd expect the effect to be even smaller. The computer's "instincts" only matter when it's making a choice. [[Sheltered Thicket]] always presents a choice between playing it as a land and cycling it, but [[Explore]] only presents a choice when we have the option to cast something else instead.

Let's also be clear about the limitations of goldfishing. The model cares only about winning as fast as possible, but in a real game we also need to *not lose*. [[Cinder Glade]] saves us a few points of life every time we fetch it in place of an untapped [[Stomping Ground]]. [[Farseek]] helps ensure double-green for [[Obstinate Baloth]] on turn three. [[Explore]] dodges [[Ashiok, Dream Render:Ashiok]]. These corner cases cut both ways, and they're tricky to quantify because the metagame is always changing.

That all said, it's not looking good for the conventional wisdom. The main selling point of [[Cinder Glade]] is that it sometimes enters the battlefield untapped at a crucial moment, allowing us to win a turn faster. It turns out this only happens in a few percent of hands -- and that we can get a comparable boost from the cycling on [[Sheltered Thicket]]. After considering our statistical and systematic uncertainties, we're unable to say either goldfishes better than the other. On the other hand, in the late game, [[Sheltered Thicket]] is clearly better. Our curve tops out at six, so past there we rarely care if [[Cinder Glade]] enters the battlefield untapped. Meanwhile, the cycling on [[Sheltered Thicket]] remains relevant to dig for high-impact sideboard cards and finishers. This points to [[Sheltered Thicket]] as the better choice overall for both Titan Breach and Titan Shift, contrary to the conventional wisdom. 



---

---

---

[[Explore]] outperforms the conventional wisdom as well.





After considering statistical and systematic uncertainties, we're unable to distinguish a difference between [[Cinder Glade]] and [[Sheltered Thicket]] in the first few turns of the game. That's bad news for the conventional wisdom. The whole argument in favor of [[Cinder Glade]] is that it sometimes enters the battlefield untapped at a crucial moment, allowing us to win a turn faster. It turns out this only happens in a few percent of hands, and that the cycling on [[Sheltered Thicket]] gives a comparable boost. And things only get worse for [[Cinder Glade]] as the game goes on. Our curve tops out at six, so past there we rarely care if [[Cinder Glade]] enters the battlefield untapped. Meanwhile, the cycling on [[Sheltered Thicket]] remains relevant throughout the game. That means [[Sheltered Thicket]] is overall better than [[Cinder Glade]] for both Titan Breach and Titan Shift.

[[Explore]] outperforms the conventional wisdom as well. In the early game, it lets us win just as quickly and consistently as [[Farseek]]. That means the better ramp spell overall is whichever one we'd prefer to have in the late game.





In my mind, that's [[Explore]]. Once we get five mountains and a [[Valakut, the Molten Pinnacle:Valakut]] on the table, [[Farseek]] is a good draw -- but so is [[Explore]]. Pretty much every card in the deck is a good draw at that point, and a [[Scapeshift:few]] [[Primeval Titan:of]] [[Blighted Woodland:them]] win the game on the spot. On the other hand, if our opponent [[Assassin's Trophy:blows]] [[Field of Ruin:up]] our [[Valakut, the Molten Pinnacle:Valakut]], or [[Blood Moon:locks]] [[Witchbane Orb:it]] [[Surgical Extraction:out]], [[Farseek]] is often a dead draw. [[Explore]] is never dead. It always digs us one card closer to a high-impact sideboard card or finisher to turn the game around.





The late-game comparison is a bit trickier. Once [[Valakut, the Molten Pinnacle:Valakut]] is online, [[Farseek]] guarantees us a trigger and [[Explore]] doesn't. On the other hand, [[Explore]] gives us another chance to win on the spot with [[Primeval Titan]], [[Scapeshift]], or [[Blighted Woodland]].

If [[Valakut, the Molten Pinnacle:Valakut]] is online, [[Farseek]] guarantees us a trigger. [[Explore]] is *usually* worth a trigger. Sometimes it draws [[Scapeshift]] to win on the spot, which is even better. Other times it's worse, for example drawing [[Anger of the Gods]] against [[Teferi, Hero of Dominaria:Teferi]].

Contrary to the conventional wisdom, there is no loss of early-game consistency when a [[Valakut, the Molten Pinnacle:Valakut]] deck swaps [[Farseek]] for [[Explore]]. The odds to whiff with [[Explore]] are offset by the odds to draw a missing piece. Similarly, [[Sheltered Thicket]] does just as well as [[Cinder Glade]]. Each outperforms [[Shivan Oasis]] by a small margin. Even the largest (apparent) gaps in goldfishing performance are comparable to the model's percent-level statistical and systematic uncertainties.

the effect on goldfishing is small, and that the cycling on [[Sheltered Thicket]] gives a similar boost.

[[Cinder Glade]] and [[Sheltered Thicket]] put up similar numbers if we're curving out against a goldfish,

[[Cinder Glade]] and [[Sheltered Thicket]] put up similar goldfishing numbers. Against a real opponent trying to disrupt or race us, that points to [[Sheltered Thicket]] as the better option.

[[Cinder Glade]] and [[Sheltered Thicket]] put up similar goldfishing numbers, but if the game goes long [[Sheltered Thicket]] clearly comes out ahead. Our curve tops out at six mana. Beyond there, we rarely care whether or not [[Cinder Glade]] enters the battlefield untapped -- its job is just to trigger [[Valakut, the Molten Pinnacle:Valakut]]. [[Sheltered Thicket]] triggers [[Valakut, the Molten Pinnacle:Valakut]] too, plus it comes with the option to cycle it in search of high-impact sideboard card or finisher.

Even the largest (apparent) differences are comparable to the model's percent-level statistical and systematic uncertainties.

The choice between ramp spells is closer.
[[Explore]] isn't a [[Farseek]] variant with cycling -- it's a different effect entirely.

The choice between ramp spells is trickier. In the late game, [[Farseek]] is basically an [[Explore]] that always draws [[Shivan Oasis]]. Sometimes that's better than a random card and sometimes it's worse.

There are plenty of corner cases[^5] that suggest either is better than the other.

[^5]: Just to name a few: [[Farseek]] ensures we have double-green on turn three for [[Obstinate Baloth]]. [[Explore]] can make mulligan choices more difficult. [[Farseek]] gets punished by [[Leonin Arbiter]] and [[Shadow of Doubt]]. [[Explore]] interacts favorably with [[Courser of Kruphix]]. [[Explore]] helps us find a basic [[Forest]] or a [[Wooded Foothills:fetch land]] if we're worried about [[Blood Moon]].

When we're faced with [[Field of Ruin:land destruction]], [[Cryptic Command:counterspells]], [[Blood Moon:lock pieces]], or just a [[Glistener Elf:fast]] [[Goblin Guide:clock]], would we rather our two-mana spell be a land ([[Farseek]]) or a re-draw ([[Explore]])?

If this seems impossibly low to you, well, I'm right there with you. So I proxied the deck and goldfished a few dozen hands with it. There were plenty of hands where [[Sheltered Thicket]] was awkward – a lone, tapped green source that prevented me from suspending [[Search for Tomorrow]] on turn one. But that happens with [[Cinder Glade]] too. There was not a single game where [[Cinder Glade]] would have shaved a turn off the clock relative to [[Sheltered Thicket]].

On the other hand, I did find myself cycling [[Sheltered Thicket]] from time to time. The computer’s superhuman “instincts” make the effect hard to quantify, but it’s definitely worth something. Early on, it can help dig you out of a flood. In later turns, it finds you another threat or sideboard card that much faster. If you think it might save you bacon once out of 50 hands, it’s probably worth a try.
