echo.init({ offset: 500, throttle: 50 });

var themes = [
    {% for theme in site.posts %}
        {
            "title": "{{ theme.title }}",
            "hash": "{{ theme.title | remove: ' ' | strip_newlines | downcase | md5 }}",
            "date": "{{ theme.date | date: "%Y—%m—%-d" }}",
            "thumbnail": "{{ theme.image }}",
            "author": "{{ theme.author }}",
            "url": "{{ site.baseurl }}{{ theme.url }}",
        }{% unless forloop.last %},{% endunless %}
    {% endfor %}
];
