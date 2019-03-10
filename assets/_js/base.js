
var posts = [
    {% for post in site.posts %}
        {% unless post.hidden %}
            {
                "title": "{{ post.title }}",
                "slug": "{{ post.title | slugify }}",
                "hash": "{{ post.title | remove: ' ' | strip_newlines | downcase | md5 }}",
                "date": "{{ post.date | date: "%F" }}",
                "tags": {{ post.tags | split: " " }},
                "thumbnail": "{{ post.image }}",
                "redirect": {% if post.redirect %} true {% else %} false {% endif %},
                "url": "{{ site.baseurl }}{{ post.url }}",
                "share-url":"{{ post.url | prepend: site.baseurl | prepend: site.url }}",
                "share-title":"{{ post.title | url_encode }}",
                "share-excerpt":"{{ post.description | url_encode }}",
                "sticky": "{{ post.sticky }}",
                "hidden": "{{ post.hidden }}",
            }
            {% unless forloop.last %},{% endunless %}
        {% endunless %}
    {% endfor %}
];
