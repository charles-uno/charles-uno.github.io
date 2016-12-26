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
- Types are thematically inconsistent. Elemental attacks can be as straightforward as breathing a beam of fire, ice, or lightning. But some types correspond to the shape of the pokémon's body, rather than an elemental power. What does it mean for Pin Missile to be a Bug attack? How is Dragon Claw (Dragon) qualitatively different from Slash (Normal)?
- Some types are... bad. Whereas most pokémon are stylized cartoon animals, Fighting-type pokémon are stylized cartoon people -- [most of them](http://bulbapedia.bulbagarden.net/wiki/Fighting_(type)) even wear clothing! Steel is also problematic; beyond [Steelix](http://bulbapedia.bulbagarden.net/wiki/Steelix_(Pok%C3%A9mon)) and [Skarmory](http://bulbapedia.bulbagarden.net/wiki/Skarmory_(Pok%C3%A9mon)), Steel-type pokémon are pretty much all bizarre legendaries, armored bugs, and/or living inanimate objects à la Beauty and the Beast.

<table class="thirds"><tr>
    <td>
        <img alt="Sawk" src="/assets/images/pokemon/sawk.png">
        <em>Rather than a cartoon animal, this pokémon is a cartoon person.</em>
    </td>
    <td>
        <img alt="Klink" src="/assets/images/pokemon/klink.png">
        <em>Rather than a cartoon animal, this pokémon is an inanimate object.</em>
    </td>
    <td>
        <img alt="Dialga" src="/assets/images/pokemon/dialga.png">
        <em>Rather than a cartoon animal, this pokémon is ???</em>
    </td>
</tr></table>

[^1]: Some interactions are symmetrical: Water attacks are super effective against Fire pokémon, and Fire attacks are not very effective against Water pokémon. Others are not: Bug attacks are not very effective against Fighting pokémon, and Fighting attacks are also not very effective against Bug pokémon.

Suppose we could go back in time and reinvent the pokémon type interaction matrix. How might we do it better?

---

Fewer types. Clear flavor. Not so specific.

Defined strengths and weaknesses in terms of cycles à la rock-paper-scissors, rather than one-of interactions. (Also symmetry.)



<table class="thirds">
    <tr>
        <td>
            <img alt="Ponyta" src="/assets/images/pokemon/ponyta.png">
            <em>Ponyta (Fire)</em>
        </td>
        <td>
            <img alt="Charizard" src="/assets/images/pokemon/charizard.png">
            <em>Charizard (Fire + Wind)</em>
        </td>
        <td>
            <img alt="Torkoal" src="/assets/images/pokemon/torkoal.png">
            <em>Torkoal (Fire)</em>
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Ponyta" src="/assets/images/pokemon/ponyta.png">
            <em>Ponyta (Fire)</em>
        </td>
        <td>
            <img alt="Charizard" src="/assets/images/pokemon/charizard.png">
            <em>Charizard (Fire + Wind)</em>
        </td>
        <td>
            <img alt="Torkoal" src="/assets/images/pokemon/torkoal.png">
            <em>Torkoal (Fire)</em>
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Ponyta" src="/assets/images/pokemon/ponyta.png">
            <em>Ponyta (Fire)</em>
        </td>
        <td>
            <img alt="Charizard" src="/assets/images/pokemon/charizard.png">
            <em>Charizard (Fire + Wind)</em>
        </td>
        <td>
            <img alt="Torkoal" src="/assets/images/pokemon/torkoal.png">
            <em>Torkoal (Fire)</em>
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Ponyta" src="/assets/images/pokemon/ponyta.png">
            <em>Ponyta (Fire)</em>
        </td>
        <td>
            <img alt="Charizard" src="/assets/images/pokemon/charizard.png">
            <em>Charizard (Fire + Wind)</em>
        </td>
        <td>
            <img alt="Torkoal" src="/assets/images/pokemon/torkoal.png">
            <em>Torkoal (Fire)</em>
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Ponyta" src="/assets/images/pokemon/ponyta.png">
            <em>Ponyta (Fire)</em>
        </td>
        <td>
            <img alt="Charizard" src="/assets/images/pokemon/charizard.png">
            <em>Charizard (Fire + Wind)</em>
        </td>
        <td>
            <img alt="Torkoal" src="/assets/images/pokemon/torkoal.png">
            <em>Torkoal (Fire)</em>
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Ponyta" src="/assets/images/pokemon/ponyta.png">
            <em>Ponyta (Fire)</em>
        </td>
        <td>
            <img alt="Charizard" src="/assets/images/pokemon/charizard.png">
            <em>Charizard (Fire + Wind)</em>
        </td>
        <td>
            <img alt="Torkoal" src="/assets/images/pokemon/torkoal.png">
            <em>Torkoal (Fire)</em>
        </td>
    </tr>
    <tr>
        <td>
            <img alt="Ponyta" src="/assets/images/pokemon/ponyta.png">
            <em>Ponyta (Fire)</em>
        </td>
        <td>
            <img alt="Charizard" src="/assets/images/pokemon/charizard.png">
            <em>Charizard (Fire + Wind)</em>
        </td>
        <td>
            <img alt="Torkoal" src="/assets/images/pokemon/torkoal.png">
            <em>Torkoal (Fire)</em>
        </td>
    </tr>

</table>


---

Stone + Fire -- Camerupt
Fire + Wind -- Charizard
Wind + Water -- Pelipper
Water + Lightning -- Lanturn
Lightning + Shadow -- Blitzle
Shadow + Plant -- Exeggutor
Plant + Stone -- Torterra



---


# Fire

<table class="thirds"><tr>
    <td>
        <img alt="Ponyta" src="/assets/images/pokemon/ponyta.png">
        <em>Ponyta (Fire)</em>
    </td>
    <td>
        <img alt="Charizard" src="/assets/images/pokemon/charizard.png">
        <em>Charizard (Fire + Wind)</em>
    </td>
    <td>
        <img alt="Torkoal" src="/assets/images/pokemon/torkoal.png">
        <em>Torkoal (Fire)</em>
    </td>
</tr></table>


# Wind

Rebranded from Flying.

<table class="thirds"><tr>
    <td>
        <img alt="Toucannon" src="/assets/images/pokemon/toucannon.png">
        <em>Toucannon (Wind)</em>
    </td>
    <td>
        <img alt="Tropius" src="/assets/images/pokemon/tropius.png">
        <em>Tropius (Wind + Plant)</em>
    </td>
    <td>
        <img alt="Butterfree" src="/assets/images/pokemon/butterfree.png">
        <em>Butterfree (Wind)</em>
    </td>
</tr></table>

# Plant

Rebranded from Plant.

<table class="thirds"><tr>
    <td>
        <img alt="Tropius" src="/assets/images/pokemon/gogoat.png">
        <em>Gogoat (Plant)</em>
    </td>
    <td>
        <img alt="Exeggutor" src="/assets/images/pokemon/exeggutor.png">
        <em>Exeggutor (Plant + Shadow)</em>
    </td>
    <td>
        <img alt="Parasect" src="/assets/images/pokemon/parasect.png">
        <em>Parasect (Plant)</em>
    </td>
</tr></table>

# Shadow

Psychic, dark, ghost, and poison are all consolidated into a single "spooky" type.

<table class="thirds"><tr>
    <td>
        <img alt="Arbok" src="/assets/images/pokemon/arbok.png">
        <em>Arbok (Shadow)</em>
    </td>
    <td>
        <img alt="Blitzle" src="/assets/images/pokemon/blitzle.png">
        <em>Blitzle (Shadow + Lightning)</em>
    </td>
    <td>
        <img alt="Gengar" src="/assets/images/pokemon/gengar.png">
        <em>Gengar (Shadow)</em>
    </td>
</tr></table>

# Lightning

Rebranded from Electric

<table class="thirds"><tr>
    <td>
        <img alt="Pikachu" src="/assets/images/pokemon/pikachu.png">
        <em>Pikachu</em>
    </td>
    <td>
        <img alt="Lanturn" src="/assets/images/pokemon/lanturn.png">
        <em>Galvantula (Lightning + Water)</em>
    </td>
    <td>
        <img alt="Galvantula" src="/assets/images/pokemon/galvantula.png">
        <em>Galvantula</em>
    </td>
</tr></table>

# Water

<table class="thirds"><tr>
    <td>
        <img alt="Spheal" src="/assets/images/pokemon/spheal.png">
        <em>Spheal (Water)</em>
    </td>
    <td>
        <img alt="Omanyte" src="/assets/images/pokemon/omanyte.png">
        <em>Omanyte (Water + Stone)</em>
    </td>
    <td>
        <img alt="Corphish" src="/assets/images/pokemon/corphish.png">
        <em>Corphish (Water)</em>
    </td>
</tr></table>

# Earth

Rock and ground. Fossils!

<table class="thirds"><tr>
    <td>
        <img alt="Tyrunt" src="/assets/images/pokemon/tyrunt.png">
        <em>Tyrunt (Stone)</em>
    </td>
    <td>
        <img alt="Camerupt" src="/assets/images/pokemon/camerupt.png">
        <em>Camerupt (Stone + Fire)</em>
    </td>
    <td>
        <img alt="Dwebble" src="/assets/images/pokemon/dwebble.png">
        <em>Dwebble (Stone)</em>
    </td>
</tr></table>

# Heart

Heart doesn't tend to get mixed with other types. But there are some, like Kecleon, that can change type.

<table class="thirds"><tr>
    <td>
        <img alt="Kangaskhan" src="/assets/images/pokemon/kangaskhan.png">
        <em>Kangaskhan (Heart)</em>
    </td>
    <td>
        <img alt="Kecleon" src="/assets/images/pokemon/kecleon.png">
        <em>Kecleon (Heart)</em>
    </td>
    <td>
        <img alt="Omanyte" src="/assets/images/pokemon/omanyte.png">
        <em>Omanyte (Heart)</em>
    </td>
</tr></table>

---

Bulbapedia uses official artwork from Ken Sugimori, under [fair use](https://en.wikipedia.org/wiki/Fair_use).

---

fire > plant > water

lightning > water > stone

lightning > wind > heart

fire > shadow > wind

shadow > plant > stone > heart

> If we could go back in time and rebuild the Pokemon interaction matrix, what might we do differently?

The crux of any Pokemon game is battling.

Rock-paper-scissors where some types are good against others.

In hindsight, that matrix is a mess.
