// echo.init({ offset: 500, throttle: 50 });

var posts = [
    {% for post in site.posts %}
        {
            "title": "{{ post.title }}",
            "hash": "{{ post.title | remove: ' ' | strip_newlines | downcase | md5 }}",
            "date": "{{ post.date | date: "%Y—%m—%d" }}",
            "thumbnail": "{{ post.image }}",
            "url": "{{ site.baseurl }}{{ post.url }}",
            {% assign words = "" | split: "|" %}
            {% capture content_plus %}{{ post.title }} {{ post.description }} {{ post.content }}{% endcapture %}
            {% assign raw_words = content_plus
                | strip_html
                | downcase
                | replace: "\n", " "
                | replace: "é", "e"
                | remove: "."
                | remove: "↩"
                | remove: ","
                | remove: "?"
                | remove: "…"
                | remove: '"'
                | remove: "!"
                | remove: "-"
                | remove: "/"
                | remove: ":"
                | remove: ";"
                | remove: "("
                | remove: ")"
                | split: " "
            %}
            {% comment %} Skip duplicates {% endcomment %}
            {% for word in raw_words %}
                {% unless words contains word %}
                    {% assign words = words | push: word %}
                {% endunless %}
            {% endfor %}
            "words":"{{ words | join: " " }}",
            "share-url":"{{ post.url | prepend: site.baseurl | prepend: site.url }}",
            "share-title":"{{ post.title | url_encode }}",
            "share-excerpt":"{{ post.description | url_encode }}"
        }{% unless forloop.last %},{% endunless %}
    {% endfor %}
];
