// URL bar is the single source of truth. Apply changes there then refresh

function goToTag(tag) {
    let active_tag = getActiveTag();
    if (tag == null || tag == active_tag) {
        window.location.href = "{{ site.url }}/#";
    } else {
        window.location.href = "{{ site.url }}/#" + tag;
    }
    applyTags();
}

function applyTags() {
    let active_tag = getActiveTag();
    console.log("active tag:", active_tag);
    for(post of posts) {
        if (active_tag == null || post.tags.includes(active_tag)) {
            showPost(post);
        } else {
            hidePost(post);
        }
    }
}

function getActiveTag() {
    if (window.location.hash) {
        return window.location.hash.replace("#", "");
    } else {
        return null;
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

// Call here to make sure we catch tag selection from posts to the index.
applyTags();

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
