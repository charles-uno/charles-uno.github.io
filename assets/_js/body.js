
// #####################################################################

var indexList = document.getElementById('index-list');

// #####################################################################

function nextPost() {
    window.location.href = "";
}

// #####################################################################

function filter() {
    var input, words;
    var list_items, list_item;
    input = document.getElementById("index-filter");
    words = input.value.toLowerCase().split(" ");
    // Previously, we went through and re-drew only the matching posts
    // in the index. But that didn't behave well with stickies. Now we
    // just toggle display on/off for posts that do/don't match.
    list_items = document.getElementsByClassName("index-item");
    for(var i = 0; i < posts.length; i++) {
        post = posts[i];
        if(!post) { continue; }
        // Find the appropriate list item by checking titles.
        for (var j=0; j<list_items.length; j++) {
            if (post.title.toLowerCase() == list_items[j].getElementsByClassName("index-name")[0].innerHTML.toLowerCase()) {
                list_item = list_items[j];
                console.log(post.title.toLowerCase());
            }
        }
        // If it matches, make sure it's visible.
        if( wordsInPost(words, post.words) ) {
            list_item.style.display = "inline-block";
        // Otherwise, make sure it's invisible.
        } else {
            list_item.style.display = "none";
        }
    }
}

// ---------------------------------------------------------------------

function wordsInPost(words, post) {
    for(var i = 0; i < words.length; i++) {
        if ( post.indexOf( words[i] ) < 0 ) { return false; }
    }
    return true;
}

// #####################################################################

// Not sure if the following is useful, but we may want to leverage it
// for the UNO MAS button.

var post = document.getElementsByClassName('post')[0];
if(post) { loadOrder(); }

function previous(title) {
    var i = findPostIndex(title);
    var ii = (i + posts.length - 1) % posts.length;
    window.location.href = posts[ii].url;
}

function next(title) {
    var i = findPostIndex(title);
    var ii = (i + 1) % posts.length;
    window.location.href = posts[ii].url;
}

function findPostIndex(title) {
    for(var i = 0; i < posts.length; i++) {
        if(posts[i].title === title) {
            return i;
        }
    }
    return 0;
}
