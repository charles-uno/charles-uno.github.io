

// #####################################################################

var indexList = document.getElementById('index-list');

// If clicked repeatedly, the sorts toggle forward and backward. The
// name toggle starts flipped; forward sorting by name is the default.
var nameToggle = 1;
var dateToggle = 1;

// if(indexList) { sort('loadOrder'); }

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
        if(!posts[i]) { continue; }
        if( !wordsInPost( words, posts[i].words ) ) { continue; }
        html += '<li class="index-item">' +
            '<a href="' + posts[i].url + '" class="index-link">' +
                '<div class="index-cell">' +
                  '<span class="index-date">' + posts[i].date + '</span>' +
                  '<h2 class="index-name">' + posts[i].title + '</h2>' +
                '</div>' +
              '</a>' +
              '<img src="' + posts[i].thumbnail + '" class="index-thumb" />' +
            '</li>';
    }
    indexList.innerHTML = html;
}

// ---------------------------------------------------------------------

function wordsInPost(words, post) {
    for(var i = 0; i < words.length; i++) {
        if ( post.indexOf( words[i] ) < 0 ) { return false; }
    }
    return true;
}

// #####################################################################

function sort(method) {
    this[method]();
    var html = '';
    html += '<li class="index-item">' +
    '<a href="" class="index-link">' +
        '<div class="index-cell">' +
          '<span class="index-date">TODAY</span>' +
          '<h2 class="index-name">TITLE</h2>' +
        '</div>' +
      '</a>' +
      '<img src="/thumbnails/broth.png" class="index-thumb" />' +
    '</li>';

    for(var i = 0; i < posts.length; i++) {
        if(!posts[i]) { continue; }
        html += '<li class="index-item">' +
            '<a href="' + posts[i].url + '" class="index-link">' +
                '<div class="index-cell">' +
                  '<span class="index-date">' + posts[i].date + '</span>' +
                  '<h2 class="index-name">' + posts[i].title + '</h2>' +
                '</div>' +
              '</a>' +
              '<img src="' + posts[i].thumbnail + '" class="index-thumb" />' +
            '</li>';
    }
    indexList.innerHTML = html;
    saveOrder();
    // Multiple clicks on the name/date sort will reverse the order.
    // Toggles are reset whenever a different sort is applied.
    if (method == 'alphabetical') {nameToggle *= -1;} else {nameToggle = 1;}
    if (method == 'latest') {dateToggle *= -1;} else {dateToggle = 1;}
}

// =====================================================================

function saveOrder() {
    var postTitles = posts.map(function(post) { return post.title; });
    sessionStorage.setItem('order', JSON.stringify(postTitles));
}

// ---------------------------------------------------------------------

function loadOrder() {
    var newOrder = [];
    var postTitles = JSON.parse(sessionStorage.getItem('order'));
    if(!postTitles) { shuffle(); return; }
    posts.forEach(function(post) {
        newOrder[postTitles.indexOf(post.title)] = post;
    });
    posts = newOrder;
}

// =====================================================================

function shuffle() {
    var currentIndex = posts.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = posts[currentIndex];
        posts[currentIndex] = posts[randomIndex];
        posts[randomIndex] = temporaryValue;
    }
}

// ---------------------------------------------------------------------

function alphabetical() {
    posts.sort(function(a, b){
        var titleA = a.title.toLowerCase();
        var titleB = b.title.toLowerCase();
        if(titleA < titleB) return -nameToggle;
        if(titleA > titleB) return nameToggle;
        return 0;
    });
}

// ---------------------------------------------------------------------

function latest() {
    posts.sort(function(a, b){
        if(a.date < b.date) return dateToggle;
        if(a.date > b.date) return -dateToggle;
        return 0;
    });
}

// ---------------------------------------------------------------------

function asis() { return 0; }

// =====================================================================

function shuffleLogo() {
    var logo = document.getElementById('logo');
    var i, html;
    var letters = [
        '<span class="title-base">c</span>',
        '<span class="title-base">h</span>',
        '<span class="title-base">a</span>',
        '<span class="title-base">r</span>',
        '<span class="title-accent">1</span>',
        '<span class="title-base">e</span>',
        '<span class="title-base">s</span>'
    ];
    html = '';
    while ( letters.length !== 0 ) {
        i = Math.floor(Math.random() * letters.length);
        html += letters[i];
        letters.splice(i, 1);
    }
    logo.innerHTML = html;
}

// ---------------------------------------------------------------------

function resetLogo() {
    var logo = document.getElementById('logo');
    var i, html;
    var letters = [
        '<span class="title-base">c</span>',
        '<span class="title-base">h</span>',
        '<span class="title-base">a</span>',
        '<span class="title-base">r</span>',
        '<span class="title-accent">1</span>',
        '<span class="title-base">e</span>',
        '<span class="title-base">s</span>'
    ];
    html = '';
    while ( letters.length !== 0 ) {
        html += letters[0];
        letters.splice(0, 1);
    }
    logo.innerHTML = html;
}

// #####################################################################

function getTag() {
    var url;
    var tag = '';
    url = window.location.href;
    console.log(url);
    if( url.split('#').length > 1 ) { tag = url.split('#')[1]; }
    console.log(tag);
    return tag;
}
