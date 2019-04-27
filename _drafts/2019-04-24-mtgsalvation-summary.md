---
layout: post
title: "Making Mountains out of Molehills"
image: "/assets/images/thumb/sheltered-thicket-sung-choi.png"
description: "Don't underestimate the power of \"draw a card.\""
tags: games stem
---

The first Modern tournament I ever played was a PPTQ. I won it, despite knowing nothing about the format. Then I won the RPTQ. Then, despite a few embarrassing punts, I went 6-4 in the Modern portion of PT RIX. The secret behind my success, honestly, was Valakut. The deck is resilient and redundant, making it incredibly friendly to beginners. All the cards are basically lands. You just keep putting them on the table and eventually your opponent scoops it up. Half the time you don't even have to understand what they're playing!

The downside of "resilient and redundant" is that Valakut can get repetitive. Everything happens at sorcery speed. There are no tricks to dig for, or cantrips to dig with. As I learned the format, I could read my opponents' plays, anticipate their tricks, and guess their sideboard choices. But you wouldn't know it from my plays: ramp spell, ramp spell, ramp spell, Scapeshift.

Don't get me wrong -- resolving Primeval Titan is a rush. Breaching it it even better. I'm not looking to give that up. But when a game goes sideways -- Blood Moon, Surgical Extraction, Leyline of Sanctity -- I want to see more cards, maximize my options, and figure out a way to win anyway.

## The Swaps in Question

A decent fraction of the maindeck is untouchable. There's no substitute for the curve toppers: Primeval Titan, Summoner's Pact, Scapeshift, and/or Through the Breach. Search for Tomorrow, Sakura-Tribe Elder, Wooded Foothills, and Stomping Ground are unquestionably the best at what they do. We need a healthy number of basic lands. But there are two plausible swaps:

- Farseek vs Explore
- Cinder Glade vs Sheltered Thicket

Explore sees fringe play, but the conventional wisdom strongly prefers Farseek in both Titan Shift and Titan Breach. Likewise, Cinder Glade is widely played and Sheltered Thicket is an occasional one-of. And it's easy to see why. Farseek is a reliable ramp spell on turn two, while Explore can sometimes whiff. Cinder Glade typically enters the battlefield untapped from turn three onward, while Sheltered Thicket can be an awkward topdeck when we need the sixth mana for a Titan.

But Explore and Sheltered Thicket also say three of the most important words in the game: "draw a card." Early on, drawing a card in Titan Breach can help find Simian Spirit Guide and Through the Breach for an explosive turn-three win. Later on, drawing a card digs us that much closer to a sideboard card or finisher -- especially if our opponent has managed to keep Valakut offline. The question is, if we want the flexibility, how does it affect our speed?

## The Model

I've written a numerical model to test that very question. We plug in a decklist, hit a button, and it'll play thousands of games to see exactly how fast that particular build can expect to land a Primeval Titan. The model doesn't know anything about sequencing or strategy. It'd be almost impossible to spell out every possible corner case explicitly. Instead, it tries all possible combinations of legal plays and keeps whichever one wins fastest. This strategy is computationally inefficient, but it’s guaranteed to find the best possible line for each game.

In fact, sometimes the computer is a bit *too* good. For example, if it plays Explore and doesn’t like what it draws, it essentially gets to rewind and play Sakura-Tribe Elder instead. This effect is generally not a big deal – there honestly aren’t that many choices to make when goldfishing with a Valakut deck -- but we do have to make a few adjustments to suppress non-human play patterns:

First, the model isn't allowed to mulligan. Mulligans are all about imperfect information, but the model would frequently throw back perfectly good seven-card hands when it knew it would draw a faster six. Second, there's no shuffling. The brute force model is guaranteed to find the fastest way to get Titan on the table each game. But timing your shuffles just right to blind-draw into better cards isn't skill or luck -- it's cheating. So once the game starts, the order of the deck is set. Any time we would fetch a Forest and shuffle, instead we leave the deck as-is and create a new Forest out of thin air.












| Build                      | T3   | ≥ T3.5 | ≥ T4   | ≥ T4.5 |
|:---------------------------|:----:|:------:|:------:|:------:|
| Explore, Cinder Glade      | 11%  | 16%    | 38%    | 59%    |
| Explore, Sheltered Thicket | 10%  | 14%    | 40%    | 61%    |
| Explore, "Slow Taiga"      | 11%  | 14%    | 36%    | 59%    |
| Explore, Taiga             | 13%  | 19%    | 41%    | 62%    |

| Build                      | T3   | ≥ T3.5 | ≥ T4   | ≥ T4.5 |
|:---------------------------|:----:|:------:|:------:|:------:|
| Farseek, Cinder Glade      | 12%  | 16%    | 38%    | 60%    |
| Farseek, Sheltered Thicket | 10%  | 14%    | 40%    | 62%    |
| Farseek, "Slow Taiga"      | 10%  | 13%    | 36%    | 58%    |
| Farseek, Taiga             | 13%  | 18%    | 39%    | 61%    |







---

more late-game options without sacrificing early-game consistency
