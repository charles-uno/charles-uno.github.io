// URL bar is the single source of truth. Apply changes there then refresh

function goToTag(tag) {
    let active_tags = getActiveTags();
    if (tag == null || active_tags.includes(tag)) {
        active_tags = [];
    } else {
        active_tags = [tag];
    }
    window.location.href = "{{ site.url }}/#" + active_tags.join(",");
    applyTags();
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
}

function getActiveTags() {
    if (window.location.hash) {
        return window.location.hash.replace("#", "").split(",");
    } else {
        return [];
    }
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
        goToTag(null);
    }
};
