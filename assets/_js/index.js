// echo.init({ offset: 500, throttle: 50 });

var posts = [
    {% for post in site.posts %}
        {
            "title": "{{ post.title }}",
            "hash": "{{ post.title | remove: ' ' | strip_newlines | downcase | md5 }}",
            "date": "{{ post.date | date: "%Y—%m—%d" }}",
            "thumbnail": "{{ post.image }}",
            "url": "{{ site.baseurl }}{{ post.url }}",
            "share-url":"{{ page.url | prepend: site.baseurl | prepend: site.url }}",
            "share-title":"{{ page.title | url_encode }}",
            "share-excerpt":"{{ page.description | url_encode }}"
        }{% unless forloop.last %},{% endunless %}
    {% endfor %}
];
