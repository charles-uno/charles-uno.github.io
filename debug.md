---
layout: post
permalink: /debug/
---

Keywords are not user-visible. They are bundled in with a post's content for the purpose of searching.

The following keywords are used in posts.

{% assign keywords = "" | split: "|" %}
{% for post in site.posts %}
    {% capture content_plus %}{{ post.title }} {{ post.description }} {{ post.content }} {{ post.keywords }}{% endcapture %}
    {% assign raw_keywords = post.keywords
        | remove: ","
        | split: " "
    %}
    {% comment %} Skip duplicates {% endcomment %}
    {% for word in raw_keywords %}
        {% unless keywords contains word %}
            {% assign keywords = keywords | push: word %}
        {% endunless %}
    {% endfor %}
{% endfor %}

{% assign keywords = keywords | sort %}

{% for word in keywords %}
- {{ word }}
{% endfor %}
