
// #####################################################################

{% assign share-url = page.url | prepend: site.baseurl | prepend: site.url %}
{% assign share-title = page.title | url_encode %}
{% assign share-excerpt = page.description | url_encode %}

// #####################################################################

var defaultPostHead = "";

var defaultIndexHead = "";

// =====================================================================

function headPostActive() {
    var head = document.getElementById('head')

    defaultPostHead = head.innerHTML;

    head.innerHTML =
        '<a href="https://www.facebook.com/sharer/sharer.php?u={{ share-url }}" title="Facebook" class="popup">' +
            '<span class="fa-stack">' +
                '<i class="fa fa-square fa-stack-2x"></i>' +
                '<i class="fa fa-facebook fa-stack-1x fa-lg"></i>' +
            '</span>' +
        '</a>' +
        '<a href="http://www.linkedin.com/shareArticle?mini=true&amp;url={{ share-url }}&amp;title={{ share-title }}&amp;summary={{ share-excerpt }}" title="LinkedIn" class="popup">' +
            '<span class="fa-stack">' +
                '<i class="fa fa-square fa-stack-2x"></i>' +
                '<i class="fa fa-linkedin fa-stack-1x fa-lg"></i>' +
            '</span>' +
        '</a>' +
        '<a href="http://pinterest.com/pin/create/button/?url={{ share-url }}&amp;media={{ share-thumb }}&amp;description={{ share-excerpt }}" class="popup">' +
            '<span class="fa-stack">' +
                '<i class="fa fa-square fa-stack-2x"></i>' +
                '<i class="fa fa-pinterest-p fa-stack-1x fa-lg"></i>' +
            '</span>' +
        '</a>' +
        '<a href="http://www.reddit.com/submit?url={{ share-url }}&amp;title={{ share-title }}" title="Reddit" class="popup">' +
            '<span class="fa-stack">' +
                '<i class="fa fa-square fa-stack-2x"></i>' +
                '<i class="fa fa-reddit-alien fa-stack-1x fa-lg"></i>' +
            '</span>' +
        '</a>' +
        '<a href="https://twitter.com/intent/tweet?text={{ share-title }}&amp;via={{ site.author.twitter }}&amp;url={{ share-url }}" title="Twitter" class="popup">' +
            '<span class="fa-stack">' +
                '<i class="fa fa-square fa-stack-2x"></i>' +
                '<i class="fa fa-twitter fa-stack-1x fa-lg"></i>' +
            '</span>' +
        '</a>' +
        '<a onclick="headPostDefault(); return false;">' +
            '<span class="fa-stack">' +
                '<i class="fa fa-square fa-stack-2x"></i>' +
                '<i class="fa fa-times fa-stack-1x fa-lg"></i>' +
            '</span>' +
        '</a>';
}

// ---------------------------------------------------------------------

function headPostDefault() {
    document.getElementById('head').innerHTML = defaultPostHead;
}

// =====================================================================

function headIndexActive() {
    var head = document.getElementById('head')
    defaultIndexHead = head.innerHTML;
    head.innerHTML =
        '<input type="text" id="index-filter" onkeyup="filter()" placeholder="Filter..">' +
        '<a onclick="headIndexDefault(); return false;">' +
            '<span class="fa-stack">' +
                '<i class="fa fa-square fa-stack-2x"></i>' +
                '<i class="fa fa-times fa-stack-1x fa-lg"></i>' +
            '</span>' +
        '</a>';
}

// ---------------------------------------------------------------------

function headIndexDefault() {
    document.getElementById('head').innerHTML = defaultIndexHead;
}

// #####################################################################

function showSort(){
    var head = document.getElementById('head');
    head.innerHTML =
    '<a href="" onclick="sort(\'alphabetical\'); return false;">' +
        '<span class="fa-stack">' +
            '<i class="fa fa-square fa-stack-2x"></i>' +
            '<i class="fa fa-sort-alpha-asc fa-stack-1x fa-lg"></i>' +
        '</span>' +
    '</a>' +
    '<a href="" onclick="sort(\'latest\'); return false;">' +
        '<span class="fa-stack">' +
            '<i class="fa fa-square fa-stack-2x"></i>' +
            '<i class="fa fa-sort-numeric-asc fa-stack-1x fa-lg"></i>' +
        '</span>' +
    '</a>' +
    '<a href="" onclick="sort(\'shuffle\'); return false;">' +
        '<span class="fa-stack">' +
            '<i class="fa fa-square fa-stack-2x"></i>' +
            '<i class="fa fa-random fa-stack-1x fa-lg fa-rotate-90"></i>' +
        '</span>' +
    '</a>' +
    '<a ontouchstart="hideSort(); return false;">' +
        '<span class="fa-stack">' +
            '<i class="fa fa-square fa-stack-2x"></i>' +
            '<i class="fa fa-sort fa-stack-1x fa-lg"></i>' +
        '</span>' +
    '</a>';
}

// ---------------------------------------------------------------------

function hideSort(){
    var head = document.getElementById('head');
    head.innerHTML =
    '<a href="" id="logo" onclick="return false;">' +
        '{% if site.htmltitle %}{{ site.htmltitle }}{% else %}{{ site.title }}{% endif %}' +
    '</a>' +
    '<a ontouchstart="showSort(); return false;" onmouseover="showSort();">' +
        '<span class="fa-stack">' +
            '<i class="fa fa-square fa-stack-2x"></i>' +
            '<i class="fa fa-sort fa-stack-1x fa-lg"></i>' +
        '</span>' +
    '</a>';
}

// =====================================================================

function showShare(){
    var head = document.getElementById('head');
    head.innerHTML =
        '<a href="https://www.facebook.com/sharer/sharer.php?u={{ share-url }}" title="Facebook" class="popup">' +
            '<span class="fa-stack">' +
                '<i class="fa fa-square fa-stack-2x"></i>' +
                '<i class="fa fa-facebook fa-stack-1x fa-lg"></i>' +
            '</span>' +
        '</a>' +
        '<a href="http://www.linkedin.com/shareArticle?mini=true&amp;url={{ share-url }}&amp;title={{ share-title }}&amp;summary={{ share-excerpt }}" title="LinkedIn" class="popup">' +
            '<span class="fa-stack">' +
                '<i class="fa fa-square fa-stack-2x"></i>' +
                '<i class="fa fa-linkedin fa-stack-1x fa-lg"></i>' +
            '</span>' +
        '</a>' +
        '<a href="http://pinterest.com/pin/create/button/?url={{ share-url }}&amp;media={{ share-thumb }}&amp;description={{ share-excerpt }}" class="popup">' +
            '<span class="fa-stack">' +
                '<i class="fa fa-square fa-stack-2x"></i>' +
                '<i class="fa fa-pinterest-p fa-stack-1x fa-lg"></i>' +
            '</span>' +
        '</a>' +
        '<a href="http://www.reddit.com/submit?url={{ share-url }}&amp;title={{ share-title }}" title="Reddit" class="popup">' +
            '<span class="fa-stack">' +
                '<i class="fa fa-square fa-stack-2x"></i>' +
                '<i class="fa fa-reddit-alien fa-stack-1x fa-lg"></i>' +
            '</span>' +
        '</a>' +
        '<a href="https://twitter.com/intent/tweet?text={{ share-title }}&amp;via={{ site.author.twitter }}&amp;url={{ share-url }}" title="Twitter" class="popup">' +
            '<span class="fa-stack">' +
                '<i class="fa fa-square fa-stack-2x"></i>' +
                '<i class="fa fa-twitter fa-stack-1x fa-lg"></i>' +
            '</span>' +
        '</a>' +
        '<a ontouchstart="hideShare(); return false;">' +
            '<span class="fa-stack">' +
                '<i class="fa fa-square fa-stack-2x"></i>' +
                '<i class="fa fa-share-alt fa-stack-1x fa-lg"></i>' +
            '</span>' +
        '</a>';
}

// ---------------------------------------------------------------------

function hideShare(){
    var head = document.getElementById('head');
    head.innerHTML =
    '<a id="logo" href="{{ site.baseurl }}/">' +
        '{% if site.htmltitle %}{{ site.htmltitle }}{% else %}{{ site.title }}{% endif %}' +
    '</a>' +
    '<a onclick="showShare(); return false;" onmouseover="showShare();">' +
        '<span class="fa-stack">' +
            '<i class="fa fa-square fa-stack-2x"></i>' +
            '<i class="fa fa-share-alt fa-stack-1x fa-lg"></i>' +
        '</span>' +
    '</a>';
}
