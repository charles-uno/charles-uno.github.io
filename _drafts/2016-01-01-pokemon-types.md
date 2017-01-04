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
- Types are thematically inconsistent. Elemental attacks can be as straightforward as breathing a beam of fire, ice, or lightning. But what does it mean for Pin Missile to be a Bug attack? How is Dragon Claw (Dragon) qualitatively different from Slash (Normal)?
- Some types are... bad. Whereas most pokémon are stylized cartoon animals, Fighting-type pokémon are stylized cartoon people -- [most of them](http://bulbapedia.bulbagarden.net/wiki/Fighting_(type)) even wear clothing! Steel is also problematic; beyond [Steelix](http://bulbapedia.bulbagarden.net/wiki/Steelix_(Pok%C3%A9mon)) and [Skarmory](http://bulbapedia.bulbagarden.net/wiki/Skarmory_(Pok%C3%A9mon)), Steel-type pokémon are limited to bizarre legendaries, armored bugs, and living inanimate objects à la Beauty and the Beast[^2].

[^1]: Some interactions are symmetrical: Water attacks are super effective against Fire pokémon, and Fire attacks are not very effective against Water pokémon. Others are not: Bug attacks are not very effective against Fighting pokémon, and Fighting attacks are also not very effective against Bug pokémon.

[^2]: Pokémon illustrations come from [Bulbapedia](http://bulbapedia.bulbagarden.net/wiki/Main_Page).

<div class="tiles">
    <div class="tile">
        <img alt="Klink" src="/assets/images/pokemon/klink.png">
        <em>Rather than a cartoon animal, this pokémon is an inanimate object.</em>
    </div>
    <div class="tile">
        <img alt="Hitmonchan" src="/assets/images/pokemon/hitmonchan.png">
        <em>Rather than a cartoon animal, this pokémon is a cartoon person.</em>
    </div>
    <div class="tile">
        <img alt="Sawk" src="/assets/images/pokemon/sawk.png">
        <em>See the pants? If it has to wear pants, it's not a pokémon. </em>
    </div>
    <div class="tile">
        <img alt="Dialga" src="/assets/images/pokemon/dialga.png">
        <em>???</em>
    </div>
</div>

Suppose we could go back in time and reinvent the pokémon type interaction matrix. How might we do it better?

---

First things first: let's have fewer types. Per above, Bug, Dragon, Faerie, Fighting, and Steel get cut. Next, Dark, Ghost, and Psychic can be consolidated into a single "spooky" type; let's call it Shadow. We can also fold Ice into Water, Poison into Grass, and Ground into Rock -- especially in the first generation of games, these pairs exhibit significant overlap.

Let's tidy up our lexicon as well. Flying becomes Wind. Electric becomes Lightning. Grass becomes Plant. Normal... it's easy to show up to battle when you can breathe fire, but how does [Rattata](http://bulbapedia.bulbagarden.net/wiki/Rattata_(Pok%C3%A9mon)) get out of bed every morning? An abundance of Heart.

This leaves us with the following eight types:

<div class="tiles">
    <div class="tile">
        <img alt="Fire" src="/assets/images/pokemon/ponyta.png">
        <em>Fire</em>
    </div>
    <div class="tile">
        <img alt="Heart" src="/assets/images/pokemon/kangaskhan.png">
        <em>Heart</em>
    </div>
    <div class="tile">
        <img alt="Lightning" src="/assets/images/pokemon/galvantula.png">
        <em>Lightning</em>
    </div>
    <div class="tile">
        <img alt="Plant" src="/assets/images/pokemon/sawsbuck.png">
        <em>Plant</em>
    </div>
    <div class="tile">
        <img alt="Shadow" src="/assets/images/pokemon/arbok.png">
        <em>Shadow</em>
    </div>
    <div class="tile">
        <img alt="Stone" src="/assets/images/pokemon/dwebble.png">
        <em>Stone</em>
    </div>
    <div class="tile">
        <img alt="Water" src="/assets/images/pokemon/spheal.png">
        <em>Water</em>
    </div>
    <div class="tile">
        <img alt="Wind" src="/assets/images/pokemon/doduo.png">
        <em>Wind</em>
    </div>
</div>


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
