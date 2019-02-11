---
layout: post
title: "Rock Paper Pokémon"
image: "/assets/images/pokemon-graph-thumb.png"
updated: 2017-01-09
description: "Rock beats Ice. Bug beats Psychic. Fairy beats Dragon. What might the Pokémon type system look like if it hadn't jumped the shark?"
tags: games
---

In the Pokémon universe, each trainer carries a team of pocket monsters with them at all times. When two trainers make eye contact, they are honor-bound to battle. The battle cannot end until one trainer wins, by knocking the other trainer's entire team unconscious. The winner earns both money and social status.

Pokémon battles are not just a matter of scratching and biting (though there is plenty of that). Monsters are also attuned with the natural elements, creating a multidimensional game of Rock Paper Scissors: Lightning attacks are super effective against Water pokémon, Water attacks are super effective against Fire pokémon, and so on.

This premise is (evidently) compelling. Seven generations of Pokémon handheld games have been released; each has been a top seller. The franchise has also made successful forays into console games, television, movies, trading cards, and mobile apps.

---

But just because Pokémon is successful doesn't mean every part of it is perfect, or even good. In particular, the type interaction matrix -- the chart that lists the elemental types, as well as their strengths and weaknesses -- is a mess:

- There are way too many types! The first generation of games had 15, and 3 more have been added since then to improve balance. The interactions aren't even symmetrical[^1] -- that means there are over 300 attack-defense combinations to know, some of which are not intuitive (Bug is super effective against Psychic, Fairy is super effective against Dragon, etc).
- The types are thematically inconsistent. It's straightforward to imagine a [mouse that shoots lightning](http://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)) or a [lizard that breathes fire](http://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)). But instead of corresponding to elemental powers, the Bug, Dragon, and Fairy types correspond to the shape of a pokémon's body. What does it mean for Pin Missile to be a Bug-type attack -- especially when it's used by [Jolteon](http://bulbapedia.bulbagarden.net/wiki/Jolteon_(Pok%C3%A9mon))? How is Dragon Claw (Dragon) qualitatively different from Slash (Normal)?
- There are a few types that could perhaps have been good, but fell apart in execution. The worst in this respect is Fighting. Whereas most pokémon are stylized cartoon animals, Fighting pokémon are stylized cartoon people -- [most of them](http://bulbapedia.bulbagarden.net/wiki/Fighting_(type)) even wear clothing! Steel falls into this category as well; beyond [Steelix](http://bulbapedia.bulbagarden.net/wiki/Steelix_(Pok%C3%A9mon)) and [Skarmory](http://bulbapedia.bulbagarden.net/wiki/Skarmory_(Pok%C3%A9mon)), Steel-type pokémon are limited to bizarre legendaries, armored bugs, and living inanimate objects à la Beauty and the Beast[^2].

[^1]: Some interactions are symmetrical: Water attacks are super effective against Fire pokémon, and Fire attacks are not very effective against Water pokémon. Others are not: Bug attacks are not very effective against Fighting pokémon, and Fighting attacks are also not very effective against Bug pokémon.

[^2]: Pokémon illustrations come from [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Main_Page).

1. ![Magnemite](/assets/images/pokemon-magnemite-thumb.png) *Rather than a cartoon animal, this pokémon is an inanimate object.*
2. ![Hitmonchan](/assets/images/pokemon-hitmonchan-thumb.png) *Rather than a cartoon animal, this pokémon is a cartoon person.*
3. ![Dialga](/assets/images/pokemon-dialga-thumb.png) *Rather than a cartoon animal, this pokémon is ???*

[As the saying goes](http://quoteinvestigator.com/2011/05/13/einstein-simple/), everything should be as simple as possible, but no simpler[^5]. Type interactions add a layer of excitement and skill to Pokémon battling; getting that to work requires a baseline of complexity, and that's fine. But we're way above that baseline. The type system is an unwieldy kludge. The large number of interactions poses a steep and unnecessary learning curve for new players.

[^5]: Mark Rosewater, head designer for *Magic: the Gathering*, has written extensively about the importance of simplicity (and the dangers of complexity) in game design. In particular, he took up the topic in [2002](http://magic.wizards.com/en/articles/archive/making-magic/keeping-it-simple-2002-05-20), [2009](http://magic.wizards.com/en/articles/archive/making-magic/magic-lessons-2009-06-22) ([twice](http://magic.wizards.com/en/articles/archive/decisions-decisions-part-ii-2009-08-10)), and [2011](http://magic.wizards.com/en/articles/archive/making-magic/new-world-order-2011-12-05) when rules tweaks led to a concern among some players that the game was being "dumbed down."

So let's try a thought experiment. Suppose we could go back in time and rework the Pokémon type interaction system. How might we simplify it, while preserving the game's flavor?

---

First, we'd have fewer types. Per above, Bug, Dragon, Faerie, Fighting, and Steel get cut. Dark, Ghost, and Psychic get consolidated into a single "spooky" type; let's call it Shadow.

Let's also fold Ice into Water, Poison into Grass, and Ground into Rock -- especially in the first generation of games, these pairs exhibit significant overlap. Water and Grass are favored over Ice and Poison due to the formers' roles as starting types. Similarly, Rock beats out Ground since Rock is associated with the (awesome) [reanimated fossil](http://bulbapedia.bulbagarden.net/wiki/Fossil) pokémon.

We can take this opportunity to clean up the lexicon as well. "Flying" is suggestive of anatomy, not elemental powers; let's rebrand that type as Wind. Electric becomes Lightning. Grass becomes Plant. Normal... it's easy to show up to battle when you can breathe fire, but how does [Rattata](http://bulbapedia.bulbagarden.net/wiki/Rattata_(Pok%C3%A9mon)) get out of bed every morning? An abundance of Heart.

We are left with eight types. An example pokémon is shown below for each:

1. ![Phanpy](/assets/images/pokemon-phanpy-thumb.png) *Phanpy -- Heart*
2. ![Ponyta](/assets/images/pokemon-ponyta-thumb.png) *Ponyta -- Fire*
3. ![Galvantula](/assets/images/pokemon-galvantula-thumb.png) *Galvantula -- Lightning*
4. ![Turtwig](/assets/images/pokemon-turtwig-thumb.png) *Turtwig -- Plant*
5. ![Toucannon](/assets/images/pokemon-toucannon-thumb.png) *Toucannon -- Wind*
6. ![Spheal](/assets/images/pokemon-spheal-thumb.png) *Spheal -- Water*
7. ![Girafarig](/assets/images/pokemon-girafarig-thumb.png) *Girafarig -- Shadow*
8. ![Tyrunt](/assets/images/pokemon-tyrunt-thumb.png) *Tyrunt -- Rock*

Under this paradigm, there would perhaps be fewer dual-typed pokémon. [Bulbasaur](http://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)), [Pidgey](http://bulbapedia.bulbagarden.net/wiki/Pidgey_(Pok%C3%A9mon)), and [Rhyhorn](http://bulbapedia.bulbagarden.net/wiki/Rhyhorn_(Pok%C3%A9mon)) could just be Plant, Wind, and Rock (rather than Grass/Poison, Normal/Flying, and Rock/Ground respectively). But there are still plenty of opportunities for dual typing.

1. ![Blitzle](/assets/images/pokemon-blitzle-thumb.png) *Blitzle -- Shadow/Lightning*
2. ![Magcargo](/assets/images/pokemon-magcargo-thumb.png) *Magcargo -- Fire/Rock*
3. ![Tentacruel](/assets/images/pokemon-tentacruel-thumb.png) *Tentacruel -- Water/Shadow*
4. ![Torterra](/assets/images/pokemon-torterra-thumb.png) *Torterra -- Plant/Rock*
5. ![Gyarados](/assets/images/pokemon-gyarados-thumb.png) *Gyarados -- Water/Wind*

[Slugma](http://bulbapedia.bulbagarden.net/wiki/Slugma_(Pok%C3%A9mon)) grows stony armor when it evolves into [Magcargo](http://bulbapedia.bulbagarden.net/wiki/Magcargo_(Pok%C3%A9mon)). When [Magikarp](http://bulbapedia.bulbagarden.net/wiki/Magikarp_(Pok%C3%A9mon)) evolves into [Gyarados](http://bulbapedia.bulbagarden.net/wiki/Gyarados_(Pok%C3%A9mon)), it gains the ability to fly! Having a pokémon gain a second type when it evolves is a tried-and-true way to make the new form exciting.

---

After reworking the types, it's time to rework their interactions. Rather than choosing them one at a time, and hoping things line up in the end, let's frame type advantage in terms of a handful of cycles, each in the style of Rock Paper Scissors (or [Rock Paper Scissors Lizard Spock](http://www.samkass.com/theories/RPSSL.html)).

1. <p>Fire consumes Plant</p><p>Plant drinks Water</p><p>Water quenches Fire</p>
2. <p>Lightning ionizes Water</p><p>Water erodes Rock</p><p>Rock grounds Lightning</p>
3. <p>Fire illuminates Shadow</p><p>Shadow quiets Wind</p><p>Wind suffocates Fire</p>
4. <p>Wind ambushes Heart</p><p>Heart endures Lightning</p><p>Lightning punctures Wind</p>
5. <p>Shadow starves Plant</p><p>Plant overgrows Rock</p><p>Rock crushes Heart</p><p>Heart outshines Shadow</p>

Judging the interactions one by one, this system looks a lot like the old one -- most interactions are intuitive, and a few feel a bit forced for the sake of balance. The differences become evident when we take a step back and look at the system as a whole:

![Reworked Pokémon Type Interaction Graph](/assets/images/pokemon-graph-big.png)
*Reworked Pokémon Type Interaction Graph*

There are two big changes. First, each of the new interactions is symmetrical; Water beats Fire, regardless of which side is attacking[^3]. Second, under the new model, each type has two good matchups and two bad matchups.

[^3]: As far as symmetry is concerned, some type interactions make more sense than others. When you drop a toaster into the bathtub, whatever's in the water gets fried... but it also does a number on the wiring! That's a level of realism that we have sacrificed in exchange for simplicity.

[Historically](https://www.buzzfeed.com/rdicker23/the-definitive-ranking-of-pokemon-types-11paq), a few types were good for attacking (super effective against a bunch of different types), a few types were good for defending (resistant to a bunch of different types), and a bunch of types were bad. Here, instead, each type starts with the same potential.
