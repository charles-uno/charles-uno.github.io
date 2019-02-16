//. javascript autocard handler
//. written by charles mceachern with help from taylor reece
//. written fall 2013, revised summer 2015

//. to use this script:

//. (1) at the top of the page, add the following <div> element:
//.   <div style="position:absolute; z-index:999;" id="cardPopup"></div>
//. (2) load this script on your page:
//.   <script type="text/javascript" src="http://.../autocard.js"></script>
//. (3) to make a card name into an autocard, wrap it in an <a> tag as follows:
//.   <a class="card">Grizzly Bears</a>

//. this script works by changing the contents of the <div id="cardPopup"> element. it starts out
//. invisible, but whenever the user hovers over a card name, the <div>'s inner html is modified
//. to include an image (the path to which is gleaned from the card name). the <div>'s position is
//. also changed to match that of the cursor. when the cursor stops hovering over the card name,
//. the <div> returns to invisibility.

// ---------------------------------------------------------------------

function processMacros() {
    // Look for expressions of the form [[cardname]] and replace them
    // with <a class="card">cardname</a>.
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) { return; }
    var html_todo = articles[0].innerHTML, html_done = "";
    var i = 0;
    // Keep looping until we have processed all the macros.
    while ( html_todo.includes('[[') && html_todo.includes(']]') && i < 1000 ) {
        // Sanity check: if something goes wrong, don't spin forever.
        i++;
        var i0 = html_todo.indexOf('[[');
        var i1 = html_todo.indexOf(']]');
        // If the close is before the open, skip this close.
        if (i0 > i1) {
            html_done += html_todo.slice(0, i0);
            html_todo = html_todo.slice(i0);
            continue;
        }
        // If the card name is more than 50 characters long, something
        // is wrong.
        if (i1 - i0 > 50) {
            html_done += html_todo.slice(0, i1 + 2);
            html_todo = html_todo.slice(i1+2);
            continue;
        }
        // If there are weird characters in the card name, also
        // something is wrong.
        var oldtag = html_todo.slice(i0, i1 + 2);
        if ( oldtag.includes('<') || oldtag.includes('>') || oldtag.includes('\n') ) {
            html_done += html_todo.slice(0, i1 + 2);
            html_todo = html_todo.slice(i1+2);
            continue;
        }
        // Replace our shortcut with the actual autocard HTML.
        var newtag = '<a class="card">' + html_todo.slice(i0 + 2, i1) + '</a>';
        html_done += html_todo.slice(0, i0) + newtag;
        html_todo = html_todo.slice(i1 + 2);
    }
    articles[0].innerHTML = html_done + html_todo;
}

// ---------------------------------------------------------------------

var previousWindowLoader = window.onload;

function initCards() {
    if (previousWindowLoader) { previousWindowLoader(); }
    processMacros();
    var cards = document.getElementsByClassName("card");
    for(var i=0;i<cards.length;i++){
        // Tolerate <a class="card">cardname:text</a>. Note that pipes
        // would be prettier, but Markdown thinks they're tables.
        var name_text = cards[i].innerHTML.split(":");
        var name = name_text[0], text = name_text[1];
        if (text == undefined) { text = name; }
        //. tell each card link what to do when the cursor hovers over it
        cards[i].onmouseover = showCardHandler(name);
        //. tell each card link what to do when the cursor stops hovering
        cards[i].onmouseout = hideCardHandler();
        //. make card names link to card info on magiccards.info
        cards[i].setAttribute( 'href', searchLink(name) );
        cards[i].innerHTML = text;
    }
}

window.onload = initCards;

// ---------------------------------------------------------------------

//. this is the "closure inside a loop" issue. ideally, we would call showCard(a[i].innerHTML)
//. directly. however, when the onmouseover event triggers, the variable i is no longer defined.
function showCardHandler(cardName){return function(){showCard(cardName);}}

// ---------------------------------------------------------------------

function showCard(cardName){
  document.onmousemove = function(e){
    if(window.event){e = window.event;}
    //. judge the position of the cursor
    parentPos = getPos(getElt("cardPopup").parentElement);
    var l = 5+e.clientX+self.pageXOffset-parentPos.left
    var t = 5+e.clientY+self.pageYOffset-parentPos.top
    //. move the card popup to there
    getElt("cardPopup").style.left = l+"px";
    //. If we're in the bottom half of the window, put the bottom of the card at the mouse instead of the top.
    if ( e.clientY > window.innerHeight/2 ){
        getElt("cardPopup").style.top = (t - 280) + "px";
    } else {
        getElt("cardPopup").style.top = t + "px";
    }
  }
  //. create an image of the card inside the div
  getElt("cardPopup").innerHTML = '<img id="cardPopupCard" src="' + imageLink(cardName) + '">';
  //. the image's size and shape will be set by the parent div, so we can round the corners.
  getElt("cardPopupCard").style.height = '100%';
  getElt("cardPopupCard").style.width = '100%';
  //. grab the natural size of the card image
  var nh = getElt("cardPopupCard").naturalHeight, nw = getElt("cardPopupCard").naturalWidth;
  //. fix the height, then set the width based on the image's natural proportions
  var h = 280
  if(nh*nw > 0){var w = Math.round(h*nw/nh);}else{var w = 200;}
  //. based on the image size, figure out how much to round the corners
  var b = Math.round(Math.min(w,h)/15)
  getElt("cardPopup").style.height = h+'px';
  getElt("cardPopup").style.width = w+'px';
  getElt("cardPopup").style.borderRadius = b+'px';
  getElt("cardPopup").style.overflow = 'hidden';
}

// ---------------------------------------------------------------------

function hideCardHandler() {return function(){hideCard();}}

// ---------------------------------------------------------------------

function hideCard(){
  getElt("cardPopup").style.height = '0px';
  getElt("cardPopup").style.width = '0px';
  getElt("cardPopup").innerHTML = '';
}

// ---------------------------------------------------------------------

//. some shorthand for a long call that gets used a lot
function getElt(id){return document.getElementById(id);}

// ---------------------------------------------------------------------

//. this function adds up the top and left displacements of all parent elements to let us map
//. between the (absolute) position of the cursor and the (relative) position of the popup div.
function getPos(elt) {
  var l = 0, t = 0;
  //. as long as there is a parent element, grab this element's offset compared to the parent.
  while (elt.offsetParent) {
    l += elt.offsetLeft;
    t += elt.offsetTop;
    elt = elt.offsetParent;
  }
  return {left:l, top:t};
}

// ---------------------------------------------------------------------

//. given a card name, this function returns a link to search for info on that card
function searchLink(cardName){
    //. If given a number, we're searching by multiverse id.
    if (!isNaN(cardName)) {
        // http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=383251
        var linkStart = 'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=';
        var linkEnd = '';
    } else {
        //. https://scryfall.com/search?q=!"forest"
        var linkStart = 'https://scryfall.com/search?q=!"';
        var linkEnd = '"';
    }
    return linkStart + cardName.replace('&amp;','').replace('//','').replace('’','') + linkEnd;
}

// ---------------------------------------------------------------------

//. given a card name, this function returns a link to that card image on gatherer.
function imageLink(cardName){
    //. If given a number, we're searching by multiverse id.
    if (!isNaN(cardName)) {
        var linkStart = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=';
        var linkEnd = '&type=card';
    } else {
        var linkStart = 'http://gatherer.wizards.com/Handlers/Image.ashx?type=card&name=';
        var linkEnd = '';
    }
    return linkStart + cardName.replace('&amp;','//').replace('’','\'') + linkEnd;
}

// ---------------------------------------------------------------------
