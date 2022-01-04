// List of all the tags we use

{% assign tags = "" | split: "|" %}
{% for post in site.posts %}
    {% for tag in post.tags %}
        {% assign tags = tags | push: tag %}
    {% endfor %}
{% endfor %}
{% assign tags = tags | sort | uniq %}

var tags = [
    {% for tag in tags %}
    "{{ tag }}"{% unless forloop.last %},{% endunless %}
    {% endfor %}
];

// URL bar is the single source of truth. Apply changes there then read from it

function getActiveTags() {
    if (window.location.hash) {
        return window.location.hash.replace("#", "").split(",");
    } else {
        return [];
    }
}

function applyTags() {
    var active_tags = getActiveTags();
    console.log("active tags:", active_tags);
    for(post of posts) {
        if (active_tags.length == 0 || intersect(post.tags, active_tags)) {
            showPost(post);
        } else {
            hidePost(post);
        }
    }
    return;
}

function intersect(arr0, arr1) {
    // Accept two arrays. Return true if they share any elements.
    for(var i = 0; i < arr0.length; i++) {
        for(var j = 0; j < arr1.length; j++) {
            if (arr0[i] == arr1[j]) { return true; }
        }
    }
    return false;
}

// ---------------------------------------------------------------------

// From a post, we access a tag by navigating to the index with the
// appropriate hash. We run applyTags runs on window load.

// window.onload = applyTags;

function goToTag(tag) {
    return goToTags([tag])
}

function goToTags(tags) {
    var tag_hash = tags.join();
    window.location.href = "{{ site.url }}/#" + tag_hash;
    // From a post, execution stops here, and applyTags is called
    // automatically when the new window loads. If we're already on the
    // index, the hash is updated, and we apply the changes manually.
    return applyTags();
}

// ---------------------------------------------------------------------

// On the index, it's easier to send toggle operations rather than
// explicitly list the tags we want to set active. Figure that out here.

function toggleTag(tag) {
    var active_tags = getActiveTags();
    var tag_location = active_tags.indexOf(tag);
    // If the tag isn't active, add it to the list.
    if (tag_location == -1) {
        active_tags.push(tag);
    // If it is active, splice it out.
    } else {
        active_tags.splice(tag_location, 1);
    }
    return goToTags(active_tags);
}

var useHover = true;

function fixStickyHover() {
    if (useHover) {
        useHover = false;
        applyTags();
    }
    return;
}

function showPost(post) {
    var item = document.getElementById("item-" + post.slug);
    if (item) {
        item.style.display = "inline-block";
    }
}

function hidePost(post) {
    var item = document.getElementById("item-" + post.slug);
    if (item) {
        item.style.display = "none";
    }
}

// ---------------------------------------------------------------------

// Escape clears any tag filters.
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    // For portability.
    if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
        isEscape = (evt.keyCode == 27);
    }
    if (isEscape) {
        goToTags([]);
    }
};
