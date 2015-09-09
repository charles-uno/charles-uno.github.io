---
layout: post
title: reveal-jekyll
homepage: https://github.com/tasmo/reveal-jekyll
date: 2014-05-14 12:54:59
licence_link: https://github.com/tasmo/reveal-jekyll/blob/master/LICENSE
---
# reveal-jekyll

Transforms Markdown files into presentation slides using [Jekyll](http://jekyllrb.com/). The theme is based on [Solarized colors by Ethan Schoonover](https://github.com/altercation/solarized) ([MIT License](https://github.com/altercation/solarized/blob/master/LICENSE)) containing a light and a dark theme.

reveal-jekyll contains the third party fonts [Open Sans](https://www.google.com/fonts/specimen/Open+Sans) ([Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)), [Droid Serif](https://www.google.com/fonts/specimen/Droid+Serif) ([Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)) and [Font Awesome](https://github.com/FortAwesome/Font-Awesome) ([License: SIL OFL 1.1](http://fontawesome.io/license/)).

## [reveal.js](http://lab.hakim.se/reveal-js/)

A framework for easily creating beautiful presentations using HTML.

[reveal.js](https://github.com/hakimel/reveal.js) comes with a broad range of features including [nested slides](https://github.com/hakimel/reveal.js#markup), [markdown contents](https://github.com/hakimel/reveal.js#markdown), [PDF export](https://github.com/hakimel/reveal.js#pdf-export), [speaker notes](https://github.com/hakimel/reveal.js#speaker-notes) and a [JavaScript API](https://github.com/hakimel/reveal.js#api). It's best viewed in a browser with support for CSS 3D transforms but [fallbacks](https://github.com/hakimel/reveal.js/wiki/Browser-Support) are available to make sure your presentation can still be viewed elsewhere.

### Links for reveal.js:

- [Installation](#installation): Step-by-step instructions for getting reveal.js running on your computer.
- [Changelog](https://github.com/hakimel/reveal.js/releases): Up-to-date version history.
- [Examples](https://github.com/hakimel/reveal.js/wiki/Example-Presentations): Presentations created with reveal.js, add your own!
- [Browser Support](https://github.com/hakimel/reveal.js/wiki/Browser-Support): Explanation of browser support and fallbacks.
- [Instructions](https://github.com/hakimel/reveal.js#instructions) How to use reveal.js.
- [MIT License](https://github.com/hakimel/reveal.js/blob/master/LICENSE)

## [Jekyll](http://jekyllrb.com/)

[Jekyll](https://github.com/jekyll/jekyll) is a simple, blog-aware, static site generator perfect for personal, project, or organization sites. Think of it like a file-based CMS, without all the complexity. Jekyll takes your content, renders Markdown and Liquid templates, and spits out a complete, static website ready to be served by Apache, Nginx or another web server. Jekyll is the engine behind [GitHub Pages](http://pages.github.com), which you can use to host sites right from your GitHub repositories.

### Links for Jekyll:

- [Getting Started](https://github.com/jekyll/jekyll#getting-started) If you don't know Jekyll yet.
- [Runtime Dependencies](https://github.com/jekyll/jekyll#runtime-dependencies)
- [MIT License](https://github.com/jekyll/jekyll/blob/master/LICENSE)
- [Contributors](https://github.com/jekyll/jekyll/graphs/contributors)

## Differences and Limitations

### Slide Attributes

Attributes to the slide `<section>` elements are written in the [Front-matter](http://jekyllrb.com/docs/frontmatter/):

```markdown
