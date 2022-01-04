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

function showPost(post) {
    let item = document.getElementById("item-" + post.slug);
    if (item) {
        item.style.display = "inline-block";
    }
}

function hidePost(post) {
    let item = document.getElementById("item-" + post.slug);
    if (item) {
        item.style.display = "none";
    }
}

var useHover = true;

function fixStickyHover() {
    if (useHover) {
        useHover = false;
        applyTags();
    }
    return;
}

document.onkeydown = function(e) {
    e = e || window.event;
    if (e.key == "Escape" || e.key == "Esc" || e.keyCode == 27) {
        goToTag(null);
    }
};

// Call here to make sure we catch tag selection from posts to the index
applyTags();
