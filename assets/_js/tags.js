
// Figure out the tags we use and stick them in a list.

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

// ---------------------------------------------------------------------

// Set up the tag glyphs and hover text.

var tags_icon = {
    "self": "fas fa-fingerprint",
    "politics": "fas fa-landmark",
    "games":  "fas fa-dice-d20",
    "stem": "fas fa-atom",
    "food": "fas fa-utensils"
};

var tags_popups = {
    "self": "Myself",
    "politics": "Politics",
    "games":  "Fun & Games",
    "stem": "Math & Science",
    "food": "Food"
};

for (const [key, val] of Object.entries(tags_icon)) {
    var index_tags = document.getElementsByClassName("index-tag-" + key);
    for (var i = 0; i < index_tags.length; i++) {
        index_tags[i].className = index_tags[i].className + " " + val;
    }
    var post_tags = document.getElementsByClassName("post-tag-" + key);
    for (var i = 0; i < post_tags.length; i++) {
        post_tags[i].className = post_tags[i].className + " " + val;
    }
    var head_tag = document.getElementById("head-tag-" + key);
    if (head_tag) {
        head_tag.className = head_tag.className + " " + val;
        // Update the popup text per above.
        head_tag.parentNode.title = tags_popups[head_tag.parentNode.title];
    }
}

// ---------------------------------------------------------------------

// Use the window hash as the single source of truth for which tags (if
// any) are selected. That way we don't have to worry about the header
// glyphs getting out of sync with the post thumbs.

function getActiveTags() {
    if (window.location.hash) {
        console.log(window.location.hash);
        return window.location.hash.replace("#", "").split(",");
    } else {
        return [];
    }
}

function applyTagHash() {
    var active_tags = getActiveTags();
    console.log("APPLYING TAG HASH:", active_tags);
    // Update header glyphs to show which are active.
    for (var i = 0; i < tags.length; i++) {
        if (active_tags.length > 0 && intersect(active_tags, [tags[i]])) {
            toggleOn(tags[i]);
        } else {
            toggleOff(tags[i]);
        }
    }
    // Show/hide posts in accordance with selected tags.
    for(var i = 0; i < posts.length; i++) {

        if(!posts[i]) {
            console.log("POST IS NULL??", posts[i]);
            continue;
        }

        if ( active_tags.length == 0 || intersect(posts[i].tags, active_tags) ) {
            showPost(posts[i]);
        } else {
            hidePost(posts[i]);
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
// appropriate hash. We run applyTagHash runs on window load.

window.onload = applyTagHash;

function goToTags(tags) {
    var tag_hash = tags.join();
    window.location.href = "{{ site.url }}/#" + tag_hash;
    // From a post, execution stops here, and applyTagHash is called
    // automatically when the new window loads. If we're already on the
    // index, the hash is updated, and we apply the changes manually.
    return applyTagHash();
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

// ---------------------------------------------------------------------

// Helpers to select/deselect header glyphs.

// TODO -- See if we can parse these out rather than hard-coding them.
var logoColor = "#fff";
var copyColor = "#222";

function toggleOn(tag) {
    var id = "#head-tag-" + tag
    var css = id + " { color: " + copyColor + "; } " + id + ":hover { color: " + logoColor + "; }";
    var style = document.createElement("style");
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    return document.getElementsByTagName("head")[0].appendChild(style);
}

function toggleOff(tag) {
    var id = "#head-tag-" + tag
    var css = id + " { color: " + logoColor + "; } " + id + ":hover { color: " + copyColor + "; }";
    var style = document.createElement("style");
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    return document.getElementsByTagName("head")[0].appendChild(style);
}

// ---------------------------------------------------------------------

// Helpers to show/hide index posts.

function showPost(post) {
    var item = document.getElementById("item-" + post.slug);
    if (item) { item.style.display = "inline-block"; }
    return;
}

function hidePost(post) {
    var item = document.getElementById("item-" + post.slug);
    if (item) { item.style.display = "none"; }
    return;
}

// ---------------------------------------------------------------------

// On the index, Escape clears any tag filters.

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

function resetToggles() {
    for (var i = 0; i < tags.length; i++) {
        tags_toggle[tags[i]] = false;
    }
    console.log("resetting toggles")
    goToTags([]);
}
