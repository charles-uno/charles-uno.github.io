---
layout: post
title: "The Rule of Eight"
image: "/assets/images/placeholder-06-thumb.png"
description: ""
keywords: magic the gathering, modern, mtg, primeval titan, valakut, games, desperate ritual, GPOKC
---

Rule of eight. With four copies of a card, you can't count on drawing one naturally. About 50-50 to have a copy in your top 10 cards. But with eight copies, you're 65% to see at least one copy in your opening seven, and almost 80% to see one in the top ten. 

With Goblin Electromancer, Storm was a T4 or T5 combo deck that could sometimes put up a T3 win. With Baral, it's a T3 combo deck. (Though, due to overloading on cantrips, they often get away with 6 or 7). 

The rule of eight is visible in Valakut decks as well. We always want a ramp spell on T2, so we play 4 STE and 4 Explore (or Farseek). Breach builds win with Titan, so we play 4 copies plus 4 Pact. 

Traditionally, Titan Breach is a T4 combo that goes off on T3 once in a while. A typical game looks about like:

- T1: Suspend Search.
- T2: Cast STE or Explore. 
- T3: Play Anger, I guess? Or maybe another ramp spell. 
- T4: Cast Titan. 

or

- T1: Tapped Shockland, or maybe Bolt a mana dork.
- T2: Cast STE or Explore. 
- T3: Play land, cross fingers. 
- T4: Cast Breach. 

The best draws need Search *and* Breach, and there's no good substitute for either. That leaves a lot of slack in our curve. This is why, for example, Oath of Nissa gives the deck such a boost -- it's essentially free. 





<table class="cardlist-with-sideboard">
    <caption class="deckname">Charles' Titan Breach</caption>
    <tr>
        <td>
            4 [[Primeval Titan]]<br>
            4 [[Sakura-Tribe Elder]]<br>
            4 [[Simian Spirit Guide]]<br>
        </td>
        <td>
            4 [[Desperate Ritual]]<br>
            4 [[Explore]]<br>
            2 [[Chalice of the Void]]<br>
            4 [[Search for Tomorrow]]<br>
            4 [[Summoner's Pact]]<br>
            4 [[Through the Breach]]<br>
        </td>
        <td>
            1 [[Blighted Woodland]]<br>
            2 [[Forest]]<br>
            7 [[Mountain]]<br>
            4 [[Stomping Ground]]<br>
            4 [[Valakut, the Molten Pinnacle:Valakut]]<br>
            4 [[Windswept Heath]]<br>
            4 [[Wooded Foothills]]<br>
        </td>
        <td>
            4 [[Ancient Grudge]]<br>
            3 [[Anger of the Gods]]<br>
            2 [[Chalice of the Void]]<br>
            1 [[Gaea's Revenge]]<br>
            3 [[Hour of Promise]]<br>
            1 [[Obstinate Baloth]]<br>
            1 [[Reclamation Sage]]<br>
        </td>
    </tr>
</table>



# TODO -- run a few numbers. 

4 Search
4 STE
4 Explore
4 Breach
4 Pact
4 Titan
10 X
20 Land
6 (Land)

vs turning 4 of those blanks into SSG

Simian Spirit Guide was a relatively recent innovation to the deck that opens up a few new lines to dropping Titan on T3. If we don't have Search, we can go Guide into Breach. If we don't have Breach (but do have Search), we can use Guide to hard-cast Titan. 

In a hand-wavey way, we can think of SSG as an extra 2 Search and 2 Breach. 

- 50% to hit 4x Search
- 80% to hit 8x STE/Explore
- 50% to hit 4x Breach
- 80% to hit 8x Pact/Titan
- Total: 16%

vs

- 65% to hit 6x Search/SSG
- 80% to hit 8x STE/Explore
- 65% to hit 6x Breach/SSG
- 80% to hit 8x Pact/Titan
- Total: 27%

vs

- 80% to hit 6x Search/SSG
- 80% to hit 8x STE/Explore
- 80% to hit 6x Breach/Ritual
- 80% to hit 8x Pact/Titan
- Total: 40%

Note that these numbers are hand-wavey. We're treating these odds as if they're independent, which they're not. We're not worrying about mulligans, and taking our land drops for granted. We're ignoring the possibility of going SSG-SSG-Breach. And so on. 





# NOTE -- new model knows how to mulligan, hence higher numbers across the board. Still brute force -- essentially, the computer tries a 7, a 6, and a 5, and keeps whatever results are best. So the numbers are a bit inflated. 

# NOTE -- Land simplification in model. 


Instead of needing to go Search-Explore-Breach, 









---




No Aether Vial 5-8. 

Mana dorks. Just Heirarch isn't enough to usually have on on the first turn. If it's important to play a 3-drop on turn 2, you'll also need Birds of Paradise or Utopia Sprawl. 

Valakut decks respect the rule of eight as well. 
