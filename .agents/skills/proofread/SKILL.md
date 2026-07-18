---
name: proofread
description: check spelling and grammar on blog posts
---

# Proofread Skill

Check spelling, grammar, and link usage in Markdown blog posts to be published at charles.uno

## Usage

```
/proofread
```

## Definitions

A reference-style Markdown link is as follows:
```
This is a paragraph with a [reference link][ref].

[ref]: www.example.com
```

A Markdown footnote is similarly:
```
This text has a footnote[^fn].

[^fn]: Footnote text here
```

## Instructions

Fix:
- Spelling errors
- Grammar mistakes (subject-verb agreement, tense consistency)
- Punctuation errors
- Typos

Also clean up footnotes and reference-style links:
- The reference definition should follow the first paragraph that references it
- Same for footnotes
- If a paragraph includes both references and footnotes, list the footnotes first
- Move unused references and footnotes to the bottom of the document and comment them out. One big comment block, not line-by-line

Do NOT modify:
- HTML comments: `<!-- ... -->`
- Liquid tags: `{% ... %}`
- Autocard tags: `[[ ... ]]`

## Output Format

Change in place. 

Also list the changes made so the author can review them.

Do NOT commit the changes to version control