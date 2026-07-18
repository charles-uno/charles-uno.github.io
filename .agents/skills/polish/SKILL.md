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

Reword the post for clarity and coherence. Improve flow between ideas. Cut unnecessary words. Use the same sort of words I'm using; don't substitute fancy synonyms. Maintain my voice.

I only want to worry about three paragraphs at a time. Identify all the paragraphs that could use work, then pick three at random. Make suggestions for how to improve those three only. Do not suggest edits elsewhere. 

If you believe that a section or paragraph should be cut completely, say so. 

A suggestion spanning more than one paragraph is allowed only if it *significantly* improves the flow. Call this out explicitly.

Gotchas:
- Preserve the author's vocabulary. Don't upgrade "good" to "exceptional"
- Keep the same level of formality
- Maintain opinions and judgments as written
- Preserve all Liquid tags, autocard tags, comments, and formatting exactly

## Output Format

The mode is advisory: diagnose what isn't landing, brainstorm, and review what he slots in (the loop is advise → he edits → "take a look" → review). Do NOT silently rewrite paragraphs. 

When suggesting changes to a paragraph, insert another copy of that paragraph immediately following. Apply changes to the copy only. 

Make two versions of every suggestion. Number all suggestions for easy reference and discussion

Do NOT commit to version control

## Voice & Style Guide

Key points:
- **Tone**: First-person, conversational but substantive, direct and opinionated
- **Vocabulary**: Simple, direct words. "great", "fun", "loved". Not "exceptional", "delightful", "adored"
- **Hedging**: Avoid. Say "I didn't like it" not "I perhaps didn't fully appreciate it"
- **Em-dashes**: Do NOT add em-dashes. Only keep existing ones if appropriate.
- **Contractions**: Use naturally. Don't insert needlessly.
- **Oxford comma**: Yes
- **Sentence length**: Prefer short sentences. It's ok to break sentences up for a better flow, even if it means starting with "and" or "but". Avoid consecutive long sentences

Look at the comments. Comments often include phrases that I liked, but couldn't quite figure out how to fit them in. 

Antipatterns (do not do these):
- Don't add too many en-dashes (--) or em-dashes (---)
- Don't add emojis
- Don't add exclamation marks unless the original has them
- Don't use "delve", "tapestry", "nuanced", "compelling"
- Don't add hedging words ("perhaps", "somewhat", "rather")
- Don't make it sound more formal or academic
- Don't add superlatives or intensifiers
- Don't stack comma-separated adjectives ("brutal, high-stakes", "dark, gritty"). Pick one.
- Don't overclaim interpretation. Keep to what the text supports, not what you read into it (character intent, desire, aspiration).
- Don't add metaphors or figurative language. Say it literally.
