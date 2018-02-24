---
layout: post
title: "PRIME TIME"
image: "/assets/images/pt-rix-thumb.png"
description: ""
keywords:
---

As *Magic: the Gathering* players go, I'm mediocre. My practice schedule is (at best) sporadic, and I find full-day tournaments exhausting. But, through a combination of good luck and number crunching, I scored an invite to [Pro Tour Rivals of Ixalan](https://magic.wizards.com/en/events/premierplay/protour/ptrix) in Bilbao, Spain -- and even came out with a winning record in Modern[^1]!

[^1]: In Modern, I went 6-4, despite punting several relevant games due to fatigue. My drafts, on the other hand, were a bloodbath. I was unfamiliar with a powerful archetype, and I got run over by it, going 1-4-1.

The luck isn't much of an interesting story. My friend Matthias[^2] lent me a deck and dragged me to a Preliminary Pro Tour Qualifier, which I won unexpectedly. Then a lucky guess about the metagame allowed me to chew through the Regional Pro Tour Qualifier, scoring tickets to the Pro Tour.

[^2]: Matthias Hunt, of [Amulet Bloom](http://www.starcitygames.com/article/28042_Amulet-Combo-Primer.html) notoriety.

What *is* interesting -- and what might be an asset to others going forward -- is the number crunching. After PPTQ in September, I coded my deck in Python[^3]. In the following months, I compared dozens of variations on the deck, [goldfishing](https://mtg.gamepedia.com/Goldfishing) millions of games overall.

## Jumping in with [[Oath of Nissa:Oath]] Feet

The deck is [Titan Breach](https://www.mtggoldfish.com/archetype/modern-titan-breach-45175#paper), a less-played cousin of [Scapeshift](https://www.mtggoldfish.com/archetype/modern-titan-shift#paper). A good draw plays out about like this:

- T1: [[Stomping Ground]], suspend [[Search for Tomorrow]].
- T2: [[Mountain]], [[Sakura-Tribe Elder]], get a [[Mountain]].
- T3: Cast [[Search for Tomorrow:Search]] from exile, get a [[Mountain]]. [[Cinder Glade:Land]] for turn. Cast [[Through the Breach]], dropping [[Primeval Titan]], searching up two [[Valakut, the Molten Pinnacle]]. Then attack with [[Primeval Titan:Titan]], searching up two more [[Mountain]]s, triggering [[Valakut, the Molten Pinnacle:Valakut]] four times.

That's six damage from attacking with [[Primeval Titan:Titan]] and another twelve from the [[Valakut, the Molten Pinnacle:Valakut]] triggers, which is typically enough to close out the game[^4]. If not, it clears the opposing board, and from now on each land comes with a pair of free [[Lightning Bolt:Bolts]] attached. It's rare to lose a game after making [[Primeval Titan:Titan]] on T3. Hard-casting it on T4 is still quite good, but considerably more "fair."

[^4]: [[Wooded Foothills:Fetch lands]] and [[Stomping Ground:shock lands]] are prevalent in Modern. It's typical for a player to deal themselves at least two damage in the first few turns of the game.

In the Rock-Paper-Scissors of Modern matchups, Titan Breach is a slow proactive deck (like Tron and Dredge). Slow proactive decks are generally good against reactive decks (like Jund and Jeskai) because they're hard to disrupt; [[Fatal Push]] and [[Path to Exile]] are awkward when my win condition is a land. On the other hand, slow proactive decks have trouble with fast proactive decks (like Storm and Infect); we can't race them, and we can't reliably slow them down.

Most of a Titan Breach decklist is non-negotiable -- [[Sakura-Tribe Elder]], [[Search for Tomorrow]], [[Summoner's Pact]], etc -- but there's no consensus on the final few slots. Many players include some disruption -- [[Lightning Bolt]], [[Anger of the Gods]], [[Relic of Progenitus]] -- in hopes of kneecapping a faster opponent. Others play extra haymakers like [[Woodfall Primus]], [[Scapeshift]], or (recently) [[Hour of Promise]] for cases where [[Primeval Titan]] gets discarded or countered.

Matthias' list, the one that carried me through the PPTQ, played [[Oath of Nissa]] instead. As he puts it, this isn't a control deck, and it's not a [[Through the Breach:Breach]] deck. It's a combo deck, and the combo is [[Primeval Titan]]. You don't cut [[Oath of Nissa:Oath]] from Titan Breach just like you don't cut [[Serum Visions]] from Storm.










[^9]: Compared to Scapeshift, Titan Breach is a bit better against counterspell-based decks (because Through the Breach is an instant), but a bit worse against discard-based decks (because Through the Breach doesn't do anything if you make me discard Primeval Titan).






















## Oath of Nissa

At the RPTQ, I played Anger of the Gods instead.

## Desperate Ritual

Blighted Woodland

## Hour of Promise

How often do you win if this is your haymaker? The jury is still out.























[^3]: Code is visible on GitHub [here](https://github.com/charles-uno/valakut/blob/master/driver.py). Comments and pull requests welcome!
