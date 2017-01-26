
// #####################################################################

var indexList = document.getElementById('index-list');

// #####################################################################

// Markdown wraps images in paragraph tags (with no class). Let's bump
// out the width for those tags.
var pars = document.getElementsByTagName('p');
for ( var i=0; i < pars.length; i++ ) {
    if ( pars[i].firstChild.tagName == 'IMG' ) {
        pars[i].style.maxWidth = '100%';
    }
}

// #####################################################################

function nextPost() {
    window.location.href = "";
}

// #####################################################################

function filter() {
    var html = '';
    var input, words;
    input = document.getElementById("index-filter");
    words = input.value.toLowerCase().split(" ");
    // Rather than re-draw the index, skipping some elements, it may be
    // better to grab each title, look up the post, then conditionally
    // set that tile to `display:none`.
    for(var i = 0; i < posts.length; i++) {
        post = posts[i];

        if(!post) { continue; }
        if( !wordsInPost( words, post.words ) ) { continue; }
        html += '<li class="index-item">' +
            '<a href="' + post.url + '" class="index-link">' +
                '<div class="index-cell">' +
                  '<span class="index-date">' + post.date + '</span>' +
                  '<h2 class="index-name">' + post.title + '</h2>' +
                '</div>' +
              '</a>' +
              '<img src="' + post.thumbnail + '" class="index-thumb" />' +
            '</li>';
    }
    // If we're not changing anything, skip the flicker.
    if (html != indexList.innerHTML) { indexList.innerHTML = html; }
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
