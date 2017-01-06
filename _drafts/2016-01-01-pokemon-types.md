---
layout: post
title: "Rock Paper Pokémon"
image: "/thumbnails/placeholder-08.png"
description: Placeholder description.
author: charles
---

In the Pokémon universe, each trainer carries a team of pocket monsters with them at all times. When two trainers make eye contact, they are honor-bound to battle. Battles cannot end until one trainer's entire team is knocked unconscious. The winner earns both money and social status.

Pokémon battles are not just a matter of scratching and biting (though there is plenty of that). Monsters are also attuned with the natural elements, creating a multidimensional game of rock-paper-scissors: Lightning attacks are super effective against Water pokémon, Water attacks are super effective against Fire pokémon, and so on.

This premise is (evidently) compelling. Seven generations of Pokémon handheld games have been released; each has been a top seller. The franchise has also made successful forays into console games, television, movies, trading cards, and mobile apps. But just because Pokémon is successful doesn't mean every part of it is perfect, or even good. In particular, the type interaction matrix -- the chart that lists the elemental types, as well as which are strong and weak against others -- is a mess:

- There are way too many types! The first generation of games had 15, and 3 more have been added since then to improve balance. The interactions aren't even symmetrical[^1] -- that means there are over 300 attack-defense combinations to know, some of which are not intuitive (Bug is super effective against Psychic, Fairy is super effective against Dragon, Fighting is not very effective against Poison, etc).

- The types are thematically inconsistent. It's straightforward to imagine a mouse that shoots lightning or a lizard that breathes fire. But instead of corresponding to natural elements, the Bug, Dragon, and Fairy types correspond to the shape of a pokémon's body. What does it mean for Pin Missile to be a Bug-type attack? How is Dragon Claw (Dragon) qualitatively different from Slash (Normal)?

- There are also a few types that could perhaps have been good, but fell apart in execution. The worst in this respect is Fighting. Whereas most pokémon are stylized cartoon animals, Fighting pokémon are stylized cartoon people -- [most of them](http://bulbapedia.bulbagarden.net/wiki/Fighting_(type)) even wear clothing! Steel falls into this category as well; beyond [Steelix](http://bulbapedia.bulbagarden.net/wiki/Steelix_(Pok%C3%A9mon)) and [Skarmory](http://bulbapedia.bulbagarden.net/wiki/Skarmory_(Pok%C3%A9mon)), Steel-type pokémon are limited to bizarre legendaries, armored bugs, and living inanimate objects à la Beauty and the Beast[^2].

[^1]: Some interactions are symmetrical: Water attacks are super effective against Fire pokémon, and Fire attacks are not very effective against Water pokémon. Others are not: Bug attacks are not very effective against Fighting pokémon, and Fighting attacks are also not very effective against Bug pokémon.

[^2]: Pokémon illustrations come from [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Main_Page).

<span class="tiles">
    <span class="tile">
        ![Magnemite](/assets/images/pokemon/magnemite.png)
        *Rather than a cartoon animal, this pokémon is an inanimate object.*
    </span>
    <span class="tile">
        ![Hitmonchan](/assets/images/pokemon/hitmonchan.png)
        *Rather than a cartoon animal, this pokémon is a cartoon person.*
    </span>
    <span class="tile">
        ![Dialga](/assets/images/pokemon/dialga.png)
        *Rather than a cartoon animal, this pokémon is ???*
    </span>
</span>


Suppose we could go back in time and reinvent the pokémon type interaction matrix. How might we do it better?

---

First things first: let's have fewer types. Per above, Bug, Dragon, Faerie, Fighting, and Steel get cut. Next, Dark, Ghost, and Psychic can be consolidated into a single "spooky" type; let's call it Shadow. We can also fold Ice into Water, Poison into Grass, and Ground into Rock -- especially in the first generation of games, these pairs exhibit significant overlap. We prefer Water and Grass over Ice and Poison due to the formers' roles as starting types. Similarly, we prefer Rock over Ground since Rock is associated with the perennial fossil pokémon.

Let's tidy up our lexicon as well. Flying becomes Wind. Electric becomes Lightning. Grass becomes Plant. Normal... it's easy to show up to battle when you can breathe fire, but how does [Rattata](http://bulbapedia.bulbagarden.net/wiki/Rattata_(Pok%C3%A9mon)) get out of bed every morning? An abundance of Heart.

This leaves us with eight types, each shown below with an example:

<span class="tiles">
    <span class="tile">
        ![Fire](/assets/images/pokemon/ponyta.png)
        *Fire -- Ponyta*
    </span>
    <span class="tile">
        ![Heart](/assets/images/pokemon/kecleon.png)
        *Heart -- Kecleon*
    </span>
    <span class="tile">
        ![Lightning](/assets/images/pokemon/galvantula.png)
        *Lightning -- Galvantula*
    </span>
    <span class="tile">
        ![Plant](/assets/images/pokemon/turtwig.png)
        *Plant -- Turtwig*
    </span>
    <span class="tile">
        ![Rock](/assets/images/pokemon/tyrunt.png)
        *Rock -- Tyrunt*
    </span>
    <span class="tile">
        ![Shadow](/assets/images/pokemon/girafarig.png)
        *Shadow -- Girafarig*
    </span>
    <span class="tile">
        ![Water](/assets/images/pokemon/spheal.png)
        *Water -- Spheal*
    </span>
    <span class="tile">
        ![Wind](/assets/images/pokemon/toucannon.png)
        *Wind -- Toucannon*
    </span>
</span>




<span class="tiles">
    <span class="tile">
        ![Fire](/assets/images/pokemon/blitzle.png)
        *Shadow + Lightning --- Blitzle*
    </span>
    <span class="tile">
        ![Heart](/assets/images/pokemon/magcargo.png)
        *Fire + Rock --- Magcargo*
    </span>
    <span class="tile">
        ![Heart](/assets/images/pokemon/tentacruel.png)
        *Water + Shadow --- Tentacruel*
    </span>
</span>





---

Second, define strengths and weaknesses in terms of cycles à la rock-paper-scissors, rather than one-of interactions. (Also symmetry.)

---


- Stone + Fire -- Camerupt
- Fire + Wind -- Charizard
- Wind + Water -- Pelipper
- Water + Lightning -- Lanturn
- Lightning + Shadow -- Blitzle
- Shadow + Plant -- Exeggutor
- Plant + Stone -- Torterra


<div class="tiles">
    <div class="tile">
        <img alt="Fire" src="/assets/images/pokemon/camerupt.png">
        <em>Fire</em>
    </div>
    <div class="tile">
        <img alt="Heart" src="/assets/images/pokemon/charizard.png">
        <em>Heart</em>
    </div>
    <div class="tile">
        <img alt="Lightning" src="/assets/images/pokemon/pelipper.png">
        <em>Lightning</em>
    </div>
    <div class="tile">
        <img alt="Plant" src="/assets/images/pokemon/lanturn.png">
        <em>Plant</em>
    </div>
    <div class="tile">
        <img alt="Shadow" src="/assets/images/pokemon/blitzle.png">
        <em>Shadow</em>
    </div>
    <div class="tile">
        <img alt="Stone" src="/assets/images/pokemon/exeggutor.png">
        <em>Stone</em>
    </div>
    <div class="tile">
        <img alt="Water" src="/assets/images/pokemon/torterra.png">
        <em>Water</em>
    </div>
    <div class="tile">
        <img alt="Wind" src="/assets/images/pokemon/kecleon.png">
        <em>Wind</em>
    </div>
</div>

---

Fossils!

---

fire > plant > water

lightning > water > stone

lightning > wind > heart

fire > shadow > wind

shadow > plant > stone > heart


<!-- hr before the footnotes -->
---
