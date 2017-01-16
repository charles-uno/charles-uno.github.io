
// #####################################################################

// NOTE -- These do not work! They link to `app.js`.

{% assign share-url = page.url
    | prepend: site.baseurl
    | prepend: site.url
%}
{% assign share-title = page.title | url_encode %}
{% assign share-excerpt = page.description | url_encode %}

// #####################################################################

var indexHeadIsActive = false;
var postHeadIsActive = false;

// ---------------------------------------------------------------------

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;

    if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
        isEscape = (evt.keyCode == 27);
    }

    if (indexHeadIsActive && isEscape) {
        headIndexDefault();
    }

    if (postHeadIsActive && isEscape) {
        headPostDefault();
    }

};

// #####################################################################

var defaultIndexHead = "";

// ---------------------------------------------------------------------

function headIndexActive() {
    var head = document.getElementById('head')
    var input;
    defaultIndexHead = head.innerHTML;
    head.innerHTML =
        '<input type="text" id="index-filter" onkeyup="filter()" ' +
            'placeholder="Filter...">' +
        '<a onclick="headIndexDefault(); return false;">' +
            '<span class="glyph-nowrapper">' +
                '<i class="fa fa-times"></i>' +
            '</span>' +
        '</a>';
    indexHeadIsActive = true;
    postHeadIsActive = false;
    // Don't make people click on the search bar.
    document.getElementById('index-filter').select();
    document.getElementById('index-filter').focus();
}

// ---------------------------------------------------------------------

function headIndexDefault() {
    indexHeadIsActive = false;
    postHeadIsActive = false;
    // When we hide the search bar, clear the filter.
    document.getElementById("index-filter").value = "";
    filter();
    document.getElementById('head').innerHTML = defaultIndexHead;
}

// #####################################################################

var defaultPostHead = "";

// ---------------------------------------------------------------------

function headPostActive() {
    var head = document.getElementById('head')
    defaultPostHead = head.innerHTML;
    head.innerHTML =
        '<a href="https://www.facebook.com/sharer/sharer.php?u=' +
            '{{ share-url }}" title="Facebook" class="popup">' +
            '<span class="glyph-wrapper">' +
                '<i class="fa fa-facebook"></i>' +
            '</span>' +
        '</a>' +
        '<a href="http://www.linkedin.com/shareArticle?mini=true' +
            '&amp;url={{ share-url }}&amp;title={{ share-title }}' +
            '&amp;summary={{ share-excerpt }}" title="LinkedIn" ' +
            'class="popup">' +
            '<span class="glyph-wrapper">' +
                '<i class="fa fa-linkedin"></i>' +
            '</span>' +
        '</a>' +
        '<a href="http://pinterest.com/pin/create/button/?url=' +
            '{{ share-url }}&amp;media={{ share-thumb }}&amp;' +
            'description={{ share-excerpt }}" class="popup">' +
            '<span class="glyph-wrapper">' +
                '<i class="fa fa-pinterest-p"></i>' +
            '</span>' +
        '</a>' +
        '<a href="http://www.reddit.com/submit?url={{ share-url }}' +
            '&amp;title={{ share-title }}" title="Reddit" ' +
            'class="popup">' +
            '<span class="glyph-wrapper">' +
                '<i class="fa fa-reddit-alien"></i>' +
            '</span>' +
        '</a>' +
        '<a href="https://twitter.com/intent/tweet?text=' +
            '{{ share-title }}&amp;via={{ site.author.twitter }}&amp;' +
            'url={{ share-url }}" title="Twitter" class="popup">' +
            '<span class="glyph-wrapper">' +
                '<i class="fa fa-twitter"></i>' +
            '</span>' +
        '</a>' +
        '<a onclick="headPostDefault(); return false;">' +
            '<span class="glyph-nowrapper">' +
                '<i class="fa fa-times"></i>' +
            '</span>' +
        '</a>';
    indexHeadIsActive = false;
    postHeadIsActive = true;
}

// ---------------------------------------------------------------------

function headPostDefault() {
    indexHeadIsActive = false;
    postHeadIsActive = false;
    document.getElementById('head').innerHTML = defaultPostHead;
}
