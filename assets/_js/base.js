// echo.init({ offset: 500, throttle: 50 });

var posts = [
    {% for post in site.posts %}
        {% unless post.hidden %}
            {
                "title": "{{ post.title }}",
                "hash": "{{ post.title | remove: ' ' | strip_newlines | downcase | md5 }}",
                "date": "{{ post.date | date: "%F" }}",
                "thumbnail": "{{ post.image }}",
                "url": "{{ site.baseurl }}{{ post.url }}",
                {% assign words = "" | split: "|" %}
                {% capture content_plus %}{{ post.title }} {{ post.description }} {{ post.content }} {{ post.keywords }}{% endcapture %}
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
                // Skip duplicates
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
        {% endunless %}
    {% endfor %}
];

// #####################################################################

// Let's also have a scrambled list of posts, for browsing.
var shuffledTitles = [];

// ---------------------------------------------------------------------

// Populate and shuffle the list of titles. Assign each title a random
// key, and sort by the keys.
function initShuffledTitles() {
    var shuffledPosts = [];
    // Assign each title a random sort key.
    for (var i=0; i < posts.length; i++) {
        shuffledPosts.push( {'title':posts[i].title, 'sortkey':Math.random()} );
    }
    // To shuffle, sort by the sortkeys.
    shuffledPosts.sort( function(a, b){ return a.sortkey < b.sortkey; } );
    // Then throw away the sortkeys and just keep the titles.
    for (var i=0; i < shuffledPosts.length; i++) {
        shuffledTitles.push(shuffledPosts[i].title);
    }

    // TODO -- Redirect pages should be excluded from the shuffle.

    // Let's have the shuffled order persist.
    sessionStorage.setItem('order', JSON.stringify(shuffledTitles));
}

// ---------------------------------------------------------------------

function unoMas(title) {
    var st, i, ii;
    // Try to load the stored list of shuffled titles. If it doesn't
    // exist yet, create it.
    st = JSON.parse(sessionStorage.getItem('order'));
    if (st) { shuffledTitles = st; } else { initShuffledTitles(); }
    // Find the given title in the shuffled list of titles, then figure
    // out which one comes next.
    i = shuffledTitles.indexOf(title);
    ii = (i + 1 ) % shuffledTitles.length;
    // Look through the (unshuffled) list of posts to match up the next
    // title with its URL.
    window.location.href = findUrlFromTitle( shuffledTitles[ii] );
}

// ---------------------------------------------------------------------

function findUrlFromTitle(title) {
    for (var i=0; i < posts.length; i++) {
        if ( posts[i].title == title ) {
            return posts[i].url;
        }
    }
}
