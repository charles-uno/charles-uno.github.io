echo.init({ offset: 500, throttle: 50 });

var themes = [
    {% for theme in site.posts %}
        {
            "title": "{{ theme.title }}",
            "date": "{{ theme.date | date: "%Y—%m—%-d" }}",
            "thumbnail": "{{ theme.thumb }}",
            "author": "{{ theme.author }}",
            "url": "{{ site.baseurl }}{{ theme.url }}",
            "stars": "{{ theme.stars }}",
            "demo": "{{ theme.demo }}"
        }{% unless forloop.last %},{% endunless %}
    {% endfor %}
];
