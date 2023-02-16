---
layout: post
title: "Step Up with Markdown"
image: "/assets/images/thumb/pencils-amanda-jones-unsplash.png"
description: Steam your pores, not your vegetables.
tags: stem
---

I'll be honest: I don't enjoy working in Microsoft word (or similar
WYSIWYG

too easy to accidentally mess up your formatting. extra blank line between paragraphs. ambiguous boundaries on text formatting.

the defaults don't look good, and I don't want to fall down the rabbit hole of trying to make them look better.

markdown lets you:
- space things out with extra newlines
- include comments in your text that are not included in the final document
- track changes line-by-line





If we're writing a document that'll be released to the public, Word (or similar) is probably the tool for the job. We can pull in your company letterhead, tweak fonts and colors, drop in some images, and wrap the text around them. With some finagling, Word's under-the-hood HTML/CSS[^2] has the horsepower to do basically whatever we want.

[^2]: If you change the `.docx` extension to `.zip`, you can unzip a Word document and look at the HTML and style elements for yourself!

The thing is, a lot of times, we're not looking to finagle. Word's default style looks mediocre, and we'd rather not fall down the rabbit hole of trying to fix it. And after a decade-plus of writing code, Word's mouse-heavy[^3] workflow feels like driving with the parking brake on. We just want to write our piece, hit a button, and have it look sharp!

[^3]: The mouse is intuitive, but the keyboard is a much faster way to enter information into a computer -- especially if it needs to be precise.

[Markdown](https://daringfireball.net/projects/markdown/basics) handles the first part nicely. It's basically the same shorthand seen in email and chat. To make a list, start each line with a dash. For emphasis, wrap a word in \*asterisks\*. There's also support for headers, links, footnotes, block quotes, images, and a few other common elements. This makes it easy to compose and organize a document without getting bogged down in cosmetic details. Font, color, spacing, margins, and other styles are applied after the fact.

Technical [readmes](https://github.com/charles-uno/charles-uno.github.io/blob/master/README.md) are often written in Markdown. It's nicer to read than plain text, but still plays nicely with version control. Blogging is also increasingly done in Markdown (you can see this post [here](https://raw.githubusercontent.com/charles-uno/charles-uno.github.io/master/_drafts/2019-02-25-markdown-to-pdf.md)). Fonts and colors are set site-wide, so there's no need to worry about them post-by-post. Markdown documents can also be converted to PDFs using a tool called [Pandoc](https://pandoc.org/).





It's basically like that clunky [BBCode](https://en.wikipedia.org/wiki/BBCode) that web forums used in the nineties, but reinvented to be intuitive and legible.


This page is written in Markdown. You can see it raw [here](https://raw.githubusercontent.com/charles-uno/charles-uno.github.io/master/_drafts/2019-02-25-markdown-to-pdf.md).


Markdown is basically that awful [BBCode](https://en.wikipedia.org/wiki/BBCode) that web forums used in the nineties, but reinvented to be intuitive and legible.




https://raw.githubusercontent.com/charles-uno/charles-uno.github.io/master/_drafts/2019-02-25-markdown-to-pdf.md





Step one: write in Markdown.

Step one: input in Markdown

Input-wise, I love working in Markdown.

It lets me easily express everything I want

GitHub and other version control sites render Markdown to HTML, but it's not exactly *nice*.

Basically, I'd rather be working in Markdown.


I'm a software engineer.
Don't make me click through GUI options every time I want footnotes or links or headers.
Working in plain text is kinda my thing

- plays nicely with version control

I spend a decent chunk of my time working with plain text: software engineering at work, number crunching [for fun](http://charles.uno/titan-breach-simulation/), and even a bit of code work as a volunteer[^1].

plain text is great

- it is exactly what it looks like
- no [invisible formatting](https://xkcd.com/2109/)
- never fall down the rabbit hole of
- copy-paste works like you expect
- plays nicely with version control

Microsoft Word is like a slap in the face

- wysiwyg
- click through menus for links, footnotes, headings
- default style settings look "average"

[^1]: Once in a while, I volunteer with the shop at the [Science Museum](https://www.smm.org/). They've got me poking around with a [CirCuitPython Express](https://learn.adafruit.com/welcome-to-circuitpython/what-is-circuitpython) microcontroller -- figuring out how to use it for exhibit automation. Nothing written up about that yet, but if you're curious, my code is available [here](https://github.com/charles-uno/circuit-python).



| Column A | Column B | Column C |
|:---------|:--------:|---------:|
| -0.05    | +8000    | Cats and Dogs |

The thing is, I'm not looking to finagle. I'm looking to write a report today that can impress my boss tomorrow.

polishing my proposal, not messing with my margins.

I want to write my stuff, worry minimally about formatting, and have it look sharp.

It takes a long time, and I'm not great at it. Plus it feels like overkill.

The goal is to look sharp, not to go viral.

I just need a tool I can trust to get the job done.

As the industry-standard tool, almost by definition, its defaults look average.

The thing is, I don't want to deal with nested menus, style options, invisible formatting,
