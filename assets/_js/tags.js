
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

var tags_toggle = {
    {% for tag in tags %}
        "{{ tag }}": false{% unless forloop.last %},{% endunless %}
    {% endfor %}
};

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


function resetToggles() {
    for (var i = 0; i < tags.length; i++) {
        tags_toggle[tags[i]] = false;
    }
    console.log("resetting toggles")
    applyToggles([]);
}

function toggleTag(tag) {
    tags_toggle[tag] = !tags_toggle[tag];
    console.log("toggling:", tag, "to", tags_toggle[tag]);
    var active_tags = [];
    for (var i = 0; i < tags.length; i++) {
        if (tags_toggle[tags[i]]) {
            active_tags.push(tags[i])
        }
    }
    if (active_tags.length == 0) {
        console.log("nothing selected, showing everything")
    } else {
        console.log("showing only", active_tags)
    }
    applyToggles(active_tags);
}

function applyToggles(active_tags) {
    // Show/hide active toggle icons.
    for (var i = 0; i < tags.length; i++) {
        if (active_tags.length > 0 && intersect(active_tags, [tags[i]])) {
            toggleOn(tags[i]);
        } else {
            toggleOff(tags[i]);
        }
    }
    // Show/hide posts in accordance with toggles.
    for(var i = 0; i < posts.length; i++) {
        post = posts[i];
        if(!post) { continue; }
        if ( active_tags.length == 0 || intersect(post.tags, active_tags) ) {
            showPost(post);
        } else {
            hidePost(post);
        }
    }
    return;
}

function intersect(arr0, arr1) {
    for(var i = 0; i < arr0.length; i++) {
        for(var j = 0; j < arr1.length; j++) {
            if (arr0[i] == arr1[j]) { return true; }
        }
    }
    return false;
}

function toggleOn(tag) {

    // TODO: Instead of hard-coding, judge by logo and copyright colors.

    var id = "#head-tag-" + tag
    var css = id + " { color: #222; } " + id + ":hover { color: #fff; }";
    var style = document.createElement("style");
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName("head")[0].appendChild(style);
    return;
}

function toggleOff(tag) {
    var id = "#head-tag-" + tag
    var css = id + " { color: #fff; } " + id + ":hover { color: #222; }";
    var style = document.createElement("style");
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName("head")[0].appendChild(style);
    return;
}


function showPost(post) {
    console.log("showing", post.slug);
    var item = document.getElementById("item-" + post.slug);
    if (item) { item.style.display = "inline-block"; }
    return;
}

function hidePost(post) {
    console.log("hiding", post.slug);
    var item = document.getElementById("item-" + post.slug);
    if (item) { item.style.display = "none"; }
    return;
}

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
        applyToggles([]);
        headDefault();
    }
};

function goToTag(tag) {
    window.location.href = "{{ site.url }}/#" + tag;
};

function tagHash() {
    console.log("CALLED TAG HASH");

    if (window.location.hash) {
        console.log(window.location.hash);
        toggleTag( window.location.hash.replace("#", "") );
    }
    return;
}

window.onload = tagHash;
