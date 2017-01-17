
// #####################################################################

// NOTE -- These do not work! They link to `app.js`.

{% assign share-url = page.url
    | prepend: site.baseurl
    | prepend: site.url
%}
{% assign share-title = page.title | url_encode %}
{% assign share-excerpt = page.description | url_encode %}

// #####################################################################

function headActive() {
    document.getElementById('wrap-head-active').style.display = "";
    document.getElementById('wrap-head-default').style.display = "none";
}


function headDefault() {
    document.getElementById('wrap-head-active').style.display = "none";
    document.getElementById('wrap-head-default').style.display = "";
}







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

    if (isEscape) {
        headDefault();
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


    indexHeadIsActive = false;
    postHeadIsActive = true;
}

// ---------------------------------------------------------------------

function headPostDefault() {
    indexHeadIsActive = false;
    postHeadIsActive = false;
    document.getElementById('head').innerHTML = defaultPostHead;
}
