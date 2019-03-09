---
layout: post
title: "GP OKC Tournament Report"
image: "/assets/images/thumb/desperate-ritual-wayne-reynolds.png"
description: "Taking an experimental Titan Breach list to OKC for a test drive."
tags: games
hidden: true
---

I hadn't planned to attend last weekend's GP in Oklahoma City. But, two days before the event, flights got cheap, so I decided to go for it.

My results were lackluster. I ended up 4-4 despite the fact that the metagame was evidently[^1] friendly. This was frustrating, but not entirely surprising. I'm still relatively new to Modern. My exposure to the big decks is pretty good, but when I run into something unusual I don't know what to play around. On top of that, I ran an experimental build. I think it's got potential, but it needs more tuning.

[^1]: The top 8 included two Valakut decks. There were also three Tron decks, which have similar matchups.

### Decklist

In my [first post](/modern-primeval-titan-simulation/), I used numerical modeling to look at how extra lands, cantrips, and fast mana affect our chances of making [[Primeval Titan:Titan]] on T3. [[Desperate Ritual]] had a huge effect, but I dismissed it. If we play [[Desperate Ritual:Ritual]]-[[Simian Spirit Guide:SSG]]-[[Through the Breach:Breach]] off three [[Mountain:Mountains]], we don't win.

Off four [[Mountain:Mountains]], we can fetch two [[Valakut, the Molten Pinnacle:Valakuts]] when [[Primeval Titan:Titan]] enters, then two more [[Mountain:Mountains]] on attack. That's four triggers immediately, and another two for every future land drop. But if we only start with three [[Mountain:Mountains]], we end up either down a [[Valakut, the Molten Pinnacle:Valakut]] (half as many triggers) or down a [[Mountain]] (no triggers right away).

It turns out, I was missing a piece of the puzzle: [[Blighted Woodland]][^2]. If we cast [[Through the Breach:Breach]] off three lands, we get to end the turn with 4 [[Mountain:Mountains]], 2 [[Valakut, the Molten Pinnacle:Valakuts]], and a [[Blighted Woodland:Woodland]]. That's four triggers as soon as we untap, and two for each following land drop.

[^2]: I played [[Blighted Woodland]] at the RPTQ, and touched on it in my [report](/rptq-rix-report/), but hadn't yet realized its importance.

I tested 4 [[Desperate Ritual:Desperate Rituals]] in the maindeck for a few weeks, and the increased velocity was obvious; I goldfished T3 [[Primeval Titan:Titans]] more often than not. The downsides were harder to quantify. [[Desperate Ritual:Ritual]] can be stranded by discard. It's blank against [[Thalia, Guardian of Thraben:Thalia]], and a brick when topdecking. It's likely that there's a balance to be struck between speed and resiliency, but I didn't find it in time. Instead, I registered a glass cannon and crossed my fingers:

<table class="cardlist-with-sideboard">
    <caption class="deckname">Charles' Titan Breach (GP OKC)</caption>
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

---

### Round 1: Loss 0-2 vs Bant Eldrazi

**Game 1:** I win the roll and play T1 [[Search for Tomorrow:Search]] into T2 [[Sakura-Tribe Elder:STE]], but I don't find a [[Through the Breach:Breach]] or [[Desperate Ritual:Ritual]] in time to make T3 [[Primeval Titan:Titan]]. Jeff plays T3 [[Thought-Knot Seer:TKS]] to strip the [[Primeval Titan:Titan]] out of my hand, then follows it up with T4 [[Reality Smasher:Smasher]] into T5 [[Drowner of Hope:Drowner]] (shutting down my hope of ever attacking).

**Game 2:** Jeff plays T1 [[Noble Hierarch:Hierarch]] into T2 [[Noble Hierarch:Hierarch]]. I figure he's ramping into something big on T3 and -- like a dummy -- try to race him by jamming main phase [[Summoner's Pact:Pact]]-[[Through the Breach:Breach]]. He blows me out with [[Negate]]. I spend T4 paying for [[Summoner's Pact:Pact]], then cast another [[Through the Breach:Breach]] on T5, but it's too late. He's got [[Eldrazi Displacer:Displacer]], [[Drowner of Hope:Drowner]], and open mana.

### Round 2: Loss 1-2 vs Bogles

**Game 1:** I win the roll, but before my first turn, Ryan puts [[Leyline of Sanctity:Leyline]] into play. I open on [[Simian Spirit Guide:SSG]] into [[Chalice of the Void:Chalice]] and he makes a sad noise. He plays a few lands, cycles a [[Horizon Canopy]], and discards to hand size while I clobber him with (essentially) [[Colossal Dreadmaw:Colossal Dreadmaws]].

**Game 2:** I keep a weak hand with [[Simian Spirit Guide:SSG]] and [[Chalice of the Void:Chalice]], and hope to steal another game. Ryan opens on [[Misty Rainforest]] and passes the turn. If I had played a land and passed it back, I would likely have won this game, but instead I jam [[Chalice of the Void:Chalice]] into his [[Stubborn Denial]]. He then proceeds to run me over.

**Game 3:** Ryan opens on [[Leyline of Sanctity:Leyline]] again, and this time I haven't got the [[Chalice of the Void]]. He plays a [[Gladecover Scout]], then puts some auras on it. I [[Through the Breach:Breach]] on T3, fetching a bunch of [[Valakut, the Molten Pinnacle:Valakuts]] and a [[Blighted Woodland]]. He gave me two turns to topdeck my [[Reclamation Sage]] (or a [[Summoner's Pact:Pact]]) to blow up his [[Leyline of Sanctity:Leyline]] and win on the spot, but I fail to do so.

### Round 3: Win 2-1 vs Death & Taxes

At this point, I realize that my Round 1 loss has dropped me into the bracket of terrible matchups. To my left, I see Infect vs Humans. One of the players to my right is playing maindecked [[Blood Moon]].

**Game 1:** I win the roll and keep a hand with multiple fetch lands. Tim opens on T2 [[Leonin Arbiter]] into T3 [[Selfless Spirit]] into T4 [[Leonin Arbiter:Arbiter]]. A [[Blade Splicer]] joins the party at some point. When I finally resolve [[Primeval Titan:Titan]], he flashes in [[Restoration Angel]] to seal the deal.

**Game 2:** Tim opens on [[Leonin Arbiter:Arbiter]] into [[Thalia, Guardian of Thraben:Thalia]], but I wipe his board with [[Anger of the Gods:Anger]]. He plays a [[Kor Firewalker]] and gains a few life off my [[Desperate Ritual:Rituals]], but not enough to matter.

**Game 3:** Tim stumbles on lands. I play [[Anger of the Gods:Anger]] to kill a [[Leonin Arbiter]]. He follows up with [[Kor Firewalker]]. I follow up with [[Primeval Titan]].

### Round 4: Win 2-0 vs Esper Control

**Game 1:** I win the roll. Hans Jacob plays T1 [[Opt]], and I play T2 [[Chalice of the Void:Chalice]]. I play a few ramp spells, but mostly it's draw-go. On his end step, I cast [[Desperate Ritual:Ritual]]-splice-[[Through the Breach:Breach]]. He counters it with [[Cryptic Command]], bouncing my [[Chalice of the Void:Chalice]]. I untap, cast [[Summoner's Pact]][^3], and [[Through the Breach:Breach]] for the win.

[^3]: The whole point of casting [[Through the Breach:Breach]] on my opponent's end step is to overload their counterspells; if they counter it, I just untap and hard-cast [[Primeval Titan:Titan]]. That doesn't work if I have to pay for [[Summoner's Pact:Pact]] on my upkeep. So if I'm pretty sure my opponent has a counterspell, I'll sometimes cast [[Through the Breach:Breach]] without actually fetching the [[Primeval Titan:Titan]]. It's a cute trick, but I doubt it'll work at the Pro Tour.

**Game 2:** I don't know my opponent's list; I saw black mana but no black cards. He seemed to care about the [[Chalice of the Void:Chalice]] in Game 1, so I bring in the rest. I bring in the [[Gaea's Revenge]], too, as well as [[Hour of Promise]] to overload his counterspells. Hans Jacob makes land drops while I go T1 [[Search for Tomorrow:Search]] into T2 double-[[Search for Tomorrow:Search]] into T3 [[Chalice of the Void:Chalice]] for one. He flashes in [[Vendilion Clique:Clique]] on my draw step, then later an [[Snapcaster Mage:Ambush Viper]], and starts beating down. He drops me to 6. Then I draw a [[Through the Breach:Breach]] and win.

### Round 5: Loss 1-2 vs Tron

**Game 1:** Nick wins the roll and plays T1 [[Chromatic Star:Egg]] into T2 [[Ancient Stirrings:Stirrings]]-[[Chromatic Star:Egg]] into T3 [[World Breaker]] into T4 [[Karn Liberated:Karn]]. I lose.

**Game 2:** This time, Nick plays T1 [[Expedition Map:Map]] into T3 [[Karn Liberated:Karn]]. He eats one of my lands, but I [[Through the Breach:Breach]] a [[Primeval Titan:Titan]] at him anyway. I win.

**Game 3:** Nick has another T3 [[World Breaker]] on the play, blowing up my only green source. On his T4, he knocks me to 14, then plays [[Thragtusk]] (taking a damage from his [[Llanowar Wastes]] to do so). My board is 3 [[Mountain:Mountains]] and a [[Blighted Woodland]]. I cast [[Desperate Ritual:Ritual]]-[[Through the Breach:Breach]], knocking him to 18 and fetching 3 [[Valakut, the Molten Pinnacle:Valakuts]] and a [[Stomping Ground]]. If he lets me untap, I have a win on the table... but he doesn't. His swing knocks me to 4, then he plays [[Walking Ballista]] for exactly lethal.

### Round 6: Loss 1-2 vs Burn

**Game 1:** Derek wins the roll. I keep an awkward seven that includes [[Simian Spirit Guide:SSG]] and [[Chalice of the Void:Chalice]]. He opens on [[Goblin Guide]]. I (incorrectly) wait until T2, then go [[Simian Spirit Guide:SSG]]-[[Desperate Ritual:Ritual]]-[[Chalice of the Void:Chalice]]. He's upset by it, but I've given up too much tempo, and I lose.

**Game 2:** I play a ramp spell, but then miss a land drop, so [[Obstinate Baloth:Baloth]] doesn't hit the table until T4. Luckily, Derek has over-boarded. After I fetch, he hits my [[Windswept Heath]] with [[Surgical Extraction]]. He then complains that his hand is full of [[Ancient Grudge:Grudges]] (for the [[Chalice of the Void:Chalices]], which I have boarded out). I find enough lands to play [[Primeval Titan:Titan]], and narrowly win the race.

**Game 3:** My seven is terrible. My six is four lands and double-[[Explore]], which I strongly consider keeping. My five has two lands, [[Sakura-Tribe Elder:STE]], and [[Obstinate Baloth:Baloth]], which seems great! Unfortunately, I never draw another land. I curve T2 [[Sakura-Tribe Elder:STE]] into T3 [[Anger of the Gods:Anger]] into T4 [[Search for Tomorrow:Search]]. [[Obstinate Baloth:Baloth]] hits the table on T5, but at that point it's too late.

### Round 7: No-Show

Devin forgot to drop, I guess.

### Round 8: Win 2-1 vs Affinity

**Game 1:** Jeremiah opens on a bad beat story that reveals he's playing Affinity. He wins the roll and I mulligan to six. He laments, repeatedly, that he's running on nothing but Five Hour Energy... and it shows. His opening is strong, but he repeatedly forgets to activate [[Blinkmoth Nexus:Blinky]] (instead just swinging with his double [[Signal Pest:Pests]]). I'm at 6 when I win.

**Game 2:** He has [[Dispatch]] for my first [[Primeval Titan:Titan]] and kills me before I find a second one.

**Game 3:** This game was not close. I went T2 [[Ancient Grudge:Grudge]] into T3 [[Anger of the Gods:Anger]] into T4 [[Through the Breach:Breach]].

### Round 9: Win 2-1 vs Five-Color Shadow

**Game 1:** I win the roll and suspend [[Search for Tomorrow:Search]]. Jason plays T1 [[Mishra's Bauble:Bauble]]-[[Thoughtseize]] into T2 [[Mishra's Bauble:Bauble]]-[[Inquisition of Kozilek:IOK]]. On T3, when he plays another [[Inquisition of Kozilek:IOK]], I realize I've made a mistake: I only have one green source on the table, so I can't [[Summoner's Pact:Pact]] in response. He then plays some [[Tarmogoyf:Goyfs]] and [[Death's Shadow:Shadows]] to finish me off.

**Game 2:** I mulligan to five, and get hit right away with [[Inquisition of Kozilek:IOK]], but after that he seems to have a hand full of [[Death's Shadow:Shadows]] and no way to drop himself below 13 life. By the time he finds a fetch land, I've lined up five [[Mountain:Mountains]] and a pair of [[Valakut, the Molten Pinnacle:Valakuts]].

**Game 3:** Jason counters my first haymaker with [[Disdainful Stroke]]. I hard-cast [[Primeval Titan:Titan]], which finds a pair of [[Valakut, the Molten Pinnacle:Valakuts]] before he kills it. He's got lethal on the board and blue mana open. But he can't counter [[Blighted Woodland]]!

---

My loss to Tron was bad luck. I drew well, and I played well, but he was just too fast. It's unlikely that a different build would have done better; I'm maindecking [[Desperate Ritual:Rituals]] and [[Chalice of the Void:Chalices]] (which are decent against Tron) over [[Lightning Bolt:Bolts]], [[Anger of the Gods:Angers]], and/or [[Relic of Progenitus:Relics]] (which are bad against Tron).

My other losses were punts. I was too eager to go all-in. I walked into counterspells that I could have afforded to respect.

The good news is that I'm learning by reflecting on my misplays. I'll be a stronger player in Spain than I was in OKC. The bad news is that my mistakes make it hard to assess my build. I'm confident that [[Blighted Woodland]] belongs in Titan Breach. As for [[Desperate Ritual]]... I guess I have 7 weeks to figure it out!
