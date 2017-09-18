---
layout: post
title: Prime Time
image: "/assets/images/prime-time-thumb.png"
description: ""
---


I'm a newcomer to Modern. A few months ago, I would have called <a class="card">Death's Shadow</a> a bulk rare. But then Matthias[^0] lent me a deck, took me to a PPTQ, and I came away with an invite to the regional qualifier in November. So now I'm putting (probably too little) time into learning the format, and (probably too much) time into tweaking my decklist.

[^0]: Matthias Hunt, of [Amulet Bloom](http://www.starcitygames.com/article/28042_Amulet-Combo-Primer.html) notoriety. 

The deck is [Titan Breach](https://www.mtggoldfish.com/deck/757022#paper), a less-played cousin of [Titan Shift](https://www.mtggoldfish.com/archetype/modern-titan-shift#paper). A good draw plays out about like this:

- T1: <a class="card">Stomping Ground</a>, suspend <a class="card">Search for Tomorrow</a>.
- T2: <a class="card">Mountain</a>, <a class="card">Sakura-Tribe Elder</a>, get a Mountain.
- T3: Cast Search from exile, get a Mountain. Mountain for turn. Cast <a class="card">Through the Breach</a>, dropping <a class="card">Primeval Titan</a>, searching up 2 <a class="card">Valakut, the Molten Pinnacle</a>. Then attack with Titan, searching up 2 more Mountains, triggering Valakut 4 times.

That's 6 damage from Titan and another 12 from Valakut, which is typically enough to close out the game[^1]. If not, it clears the opposing board, and from now on each land comes with a pair of free <a class="card">Lightning Bolt</a>s attached. It's rare to lose a game after making Titan on turn 3.

[^1]: Fetch lands (like <a class="card">Wooded Foothills</a>) and shock lands (like <a class="card">Stomping Ground</a>) are prevalent in Modern. It's typical for a player to deal themselves at least 2 damage in the first few turns of the game.

Zach Voss recently piloted Titan Breach to a [3rd place finish](https://www.mtggoldfish.com/deck/757022#paper) at SCG Modern IQ Columbia. When played perfectly, his list produces a turn-3 Titan in **22%** of games on the play; on the draw, that number is 38%. 

The list I played was a bit different. Matthias pulled a pair of <a class="card">Lightning Bolt</a>s, a <a class="card">Chandra, Torch of Defiance</a>, and the <a class="card">Woodfall Primus</a> to add a set of <a class="card">Oath of Nissa</a>s. As Matthias puts it, this isn't a control deck, and it's not a <a class="card">Through the Breach</a> deck -- it's a <a class="card">Primeval Titan</a> deck. With perfect play, Matthias' list (below) makes a turn-3 Titan in **30%** of games on the play, and 50% on the draw.

<table class="cardlist">
    <thead>
        <td colspan="3" class="deckname">Matthias Hunt's Titan Breach</td>
    </thead>
    <tr>
        <td>
            4 <a class="card">Primeval Titan</a><br>
            4 <a class="card">Sakura-Tribe Elder</a><br>
            4 <a class="card">Simian Spirit Guide</a><br>
        </td>
        <td>
            1 <a class="card">Chandra, Torch of Defiance</a><br>
            4 <a class="card">Farseek</a><br>
            2 <a class="card">Lightning Bolt</a><br>
            4 <a class="card">Oath of Nissa</a><br>
            4 <a class="card">Search for Tomorrow</a><br>
            4 <a class="card">Summoner's Pact</a><br>
            4 <a class="card">Through the Breach</a><br>
        </td>
        <td>
            2 <a class="card">Cinder Glade</a><br>
            2 <a class="card">Forest</a><br>
            6 <a class="card">Mountain</a><br>
            4 <a class="card">Stomping Ground</a><br>
            4 <a class="card">Valakut, the Molten Pinnacle</a><br>
            3 <a class="card">Windswept Heath</a><br>
            4 <a class="card">Wooded Foothills</a><br>
        </td>
    </tr>
</table>

To be clear, "perfect play" isn't hyperbolic. I coded up the deck in Python (you can check it out [here](https://github.com/charles-uno/valakut)). The program doesn't know anything about strategy or sequencing -- it just knows the rules. Any time there are multiple legal plays, it clones itself that many times and tries them all[^3]. For any given hand, it's guaranteed to find the fastest[^4] line to a Titan.

[^3]: This is called a [brute force](https://en.wikipedia.org/wiki/Proof_by_exhaustion) solution. It's guaranteed to find the right answer, but it's dreadfully inefficient. To solve [Storm](https://www.mtggoldfish.com/archetype/modern-u-r-gifts-storm-32901#paper) by brute force, you'd probably need a supercomputer. Titan Breach is solvable on a laptop because it makes relatively few choices. It rarely plays more than half a dozen spells over the course of the game, and there's always a best way to tap lands for mana.

[^4]: We're maximizing the odds of turn-3 Titan, but this isn't an all-or-nothing deal. Zach's build is 85% to have Titan on the table by turn 4 on the play. Matthias' build, and the following tweaks, are over 90%.

Admittedly, it's not quite fair to use this program to compare Matthias' build to Zach's. The program cares only about the combo. Zach puts the combo together a bit slower, but it's better at playing control in the meantime, which may be better in some matchups. So let's instead make an apples-to-apples comparison. Let's start with Matthias' build, and see what tweaks might make it better. 

### What's Negotiable?

Most of the deck is set in stone. 

We'd love to have <a class="card">Search for Tomorrow</a> in every opening hand, but we're maxed out at 4 copies. We're also maxed out on <a class="card">Simian Spirit Guide</a>, which lets us drop turn-3 Titan even without Search. We might consider playing more than 4 <a class="card">Through the Breach</a>, but <a class="card">Dramatic Entrance</a> isn't good enough because it doesn't give haste. And we're not about to cut any <a class="card">Summoner's Pact</a>s. We already lose 5% to 10% of games due to not being able to find Titan, plus Pact finds our silver bullet <a class="card">Reclamation Sage</a> to deal with <a class="card">Blood Moon</a> out of the sideboard.

In the interest of an honest comparison to Matthias' list, we also won't touch the <a class="card">Lightning Bolt</a>s or <a class="card">Chandra, Torch of Defiance</a>. Perhaps these aren't the best interactive cards to play, and perhaps 3 isn't the right number of interactive cards, but that's outside the scope of the present analysis. 

That leaves:

- <a class="card">Farseek</a> and <a class="card">Sakura-Tribe Elder</a> -- Are we playing the correct number of 2-cost ramp spells, and are these the best ones? 
- <a class="card">Oath of Nissa</a> -- How much of a benefit are we getting from (essentially) a cantrip? 
- Lands -- What happens if we try 24 or 26 lands instead of 25? 

### Ramp Spells

The deck wants to play a 2-cost ramp spell on turn 2 every game, supplemented by <a class="card">Search for Tomorrow</a> on turn 1 and/or <a class="card">Simian Spirit Guide</a> on turn 3. As far as those 2-cost ramp spells go, <a class="card">Sakura-Tribe Elder</a> is the best option; its ability to soak up damage more than makes up for only getting basics. <a class="card">Farseek</a> is generally considered to be next. If we want to play 9 or more 2-cost ramp spells, we've also got access to <a class="card">Rampant Growth</a>, <a class="card">Explore</a>, and so on. 

First question: is 8 the correct number of 2-cost ramp spells?

> We test this by looking at a 59-card deck (cutting one copy of <a class="card">Farseek</a>) and a 61-card deck (playing a 5th copy). This lets us punt on the question of which card would be swapped in or out. 



> farseek59, farseek61



Second question: is <a class="card">Farseek</a> actually better than <a class="card">Explore</a>?

<a class="card">Farseek</a> is easy to evaluate. It gets a dual land into play, which counts as a Mountain for Valakut and also provides an extra green source. <a class="card">Explore</a> is trickier. It's *usually* a ramp spell on turn 2, but whiffing on the extra land drop means we just paid 2 mana for a cantrip. The trade-off is, it *sometimes* helps find a missing Breach or Titan. It's also significant that Explore lets us play the extra land untapped, which *sometimes* means we can cast an extra Oath or Lightning Bolt after ramping. 

Matthias and Zach both elected to go with the tried-and-true Farseek. But as far as landing Titan on turn 3, Explore is better. Swapping 4 <a class="card">Farseek</a> for 4 <a class="card">Explore</a> in Matthias' build raises the rate of turn-3 Titans from 30% to **36%** on the play (and from 50% to **55%** on the draw).

It bears noting -- again -- that this simulation is concerned only with assembling the combo in the first few turns. In a long game, trying to get in the last few points of damage with Valakut already on the table, we'd prefer to draw <a class="card">Farseek</a> over <a class="card">Explore</a>. 

### Oath of Nissa



---



As a control, we can try a cantrip instead: <a class="card">Dissenter's Deliverance</a>, assuming we always cycle it. Our numbers get a bit worse: instead of 30%, we play a turn-3 Titan in **27%** of games. On the draw, we're down from 50% to **`YYY`**. Oath can't find <a class="card">Through the Breach</a>, and sometimes it whiffs, but even so it's clear that digging 3 cards deep is better than blindly drawing the top card at the same cost. 

But what about blindly drawing the top card at no (mana) cost?

Another possibility is <a class="card">Street Wraith</a>. Wraith doesn't dig for Titan as well as Oath, but its lack of a mana cost almost makes it easier on our tempo. The effect is surprisingly large. Swapping Oath for Wraith, we can hit a turn-3 Titan in **`XXX`** of games on the play, and **`YYY`** on the draw. 

If the cycling on <a class="card">Street Wraith</a> were truly free, we'd play it in a heartbeat -- but 2 life is a real cost. If we draw multiple copies of Wraith against [Burn](https://www.mtggoldfish.com/archetype/modern-burn-34574#paper), it may not matter how fast we get Titan on the table. 


---




### Lands



If we already have Valakut on the table, we're happy to draw another Mountain. If we don't have Valakut, that means we haven't played Titan, so how exactly have we survived to the late game? (Sheltered Thicket)












---

---

---


Adding cantrips significantly improves the odds of dropping Titan on turn 3; Oath even more so. The effect from Street Wraith is even better, but the loss of life will cost games against aggressive decks. 

Explore is better than Farseek, especially if we play the 26th land, which we should. 


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
