---
layout: post
title: "Measure Twice, Valakut Once"
image: "/assets/images/thumb/valakut-kieran-yanner.png"
description: ""
---




If you wanted to play a Modern PPTQ, but knew nothing about the format, I'd hand you a Valakut deck.



Valakut is the fun patrol of Modern.



The deck is incredibly forgiving. The deck plays a ton of fetches, and there's typically an optimal choice for what (and when) to fetch, but you're rarely punished for making the wrong choice. The bare bones of the deck are about 45% to play Scapeshift or Titan on T3. By that I mean 27 lands and sets of Search, STE, Farseek, Titan, and Scapeshift -- the other 13 cards literal blanks. Basically a coin flip

The deck's matchups are also very swingy. It's very strong against "fair" decks like Jund and Jeskai.








At PT RIX, three of my ten opponents were on Eldrazi Tron. The matchup is probably 75-25 in Valakut's


 that deck basically can't beat Primeval Titan.

E Tron
E Tron
E Tron
WU
WU
Jeskai
Affinity
Burn
Abzan
Shift







Scapeshift is the fun patrol of Modern. It wins on turn 4 or 5, and it's pretty hard to interact with.

Titan Breach is all-in on the combo. Scapeshift can play more of a "Diet Jund" game with Bloodbraid Elf and sweepers.





=SUM(
    ARRAYFORMULA(
        IF(ISBLANK($E$11:$E$99), 0, 1)
        *
        IF(
            (
                IF(EQ($D$11:$D$99,"W"),1, 0)+
                IF(EQ($E$11:$E$99,"W"),1, 0)+
                IF(EQ($F$11:$F$99,"W"),1, 0) >
                IF(EQ($D$11:$D$99,"L"),1, 0)+
                IF(EQ($E$11:$E$99,"L"),1, 0)+
                IF(EQ($F$11:$F$99,"L"),1, 0)
            ),
            1,
            0
        )
    )
)
