---
name: polish
description: Suggest improvements to blog posts while preserving voice and style
---

# Polish Skill

Edit drafts for charles.uno while preserving voice and style.

## Usage

```
/polish
```

## Instructions

Follow this prompt:
> Fix errors, make it clearer. Reword to make the arguments and sentences more
> coherent. Use the same sort of words I'm using, don't substitute fancy
> synonyms. Maintain my voice.

You may:
- Fix all grammar/spelling issues
- Restructure sentences for clarity
- Improve flow between ideas
- Cut unnecessary words

You must:
- Preserve the author's vocabulary. Don't upgrade "good" to "exceptional"
- Keep the same level of formality
- Maintain opinions and judgments as written
- Preserve all Liquid tags and formatting exactly

## Output Format

**Add the edited copy to the bottom of the article, separated by a markdown HR break.** This is a first draft, not the final word — the author applies the prose himself.

After the draft, the mode is **advisory**: diagnose what isn't landing, brainstorm, and review what he slots in (the loop is advise → he edits → "take a look" → review). Don't silently rewrite paragraphs. Specifically:

- **Offer 2-4 labeled options plus a recommendation** for a given sentence or transition, and let him choose. Don't converge on one rewrite prematurely.
- **Flag, don't apply, meaning changes.** Any edit that adds interpretation, shifts emphasis, or is a taste call gets flagged for his decision, not applied. Preserve meaning, opinions, humor, and all Liquid tags.
- **Number your suggestions** so they're easy to reference.

## Voice & Style Guide

Key points:
- **Tone**: First-person, conversational but substantive, direct and opinionated
- **Vocabulary**: Simple, direct words. "great", "fun", "loved". Not "exceptional", "delightful", "adored"
- **Hedging**: Avoid. Say "I didn't like it" not "I perhaps didn't fully appreciate it"
- **Em-dashes**: Do NOT add em-dashes. Only keep existing ones if appropriate.
- **Contractions**: Use naturally. Don't insert needlessly.
- **Oxford comma**: Yes
- **Sentence length**: Prefer short sentences. It's ok to break sentences up for a better flow, even if it means starting with "and" or "but". Avoid consecutive long sentences

Look at the comments. Comments often include phrases that I liked, but couldn't quite figure out how to fit them in. If you see a way to include them *nicely* then go for it

Antipatterns (do not do these):
- Don't add too many em-dashes (---)
- Don't add emojis
- Don't add exclamation marks unless the original has them
- Don't use "delve", "tapestry", "nuanced", "compelling"
- Don't add hedging words ("perhaps", "somewhat", "rather")
- Don't make it sound more formal or academic
- Don't add superlatives or intensifiers
- Don't stack comma-separated adjectives ("brutal, high-stakes", "dark, gritty"). Pick one.
- Don't overclaim interpretation. Keep to what the text supports, not what you read into it (character intent, desire, aspiration).
- Don't add metaphors or figurative language. Say it literally.

## Plugin Reference

Do NOT modify:
- HTML comments: `<!-- ... -->`
- Liquid tags: `{% ... %}`
- Autocard tags: `[[ ... ]]`
