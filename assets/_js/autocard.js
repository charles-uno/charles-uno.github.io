var previousWindowLoader = window.onload;

function getAutocardFromMacro(macro) {
    if (macro.length > 50) {
        throw "autocard is too long: " + macro;
    }
    // TODO: watch out for weird characters
    // Allowed formats: 'cardname' or 'cardname:text'
    cardname_text = macro.replace('[[', '').replace(']]', '').split(":");
    cardname = cardname_text[0];
    text = cardname_text[1];
    if (text == undefined) {
        text = cardname;
    }
    handler = "'showAutocard(\"" + cardname + "\")'";
    return "<a onclick=" + handler + " ontouchstart=" + handler + ">" + text + "</a>";
}

function initAutocard() {
    let articles = document.getElementsByTagName("article");
    if (articles[0] == undefined) {
        return;
    }
    articles[0].innerHTML = articles[0].innerHTML.replaceAll(
        /\[\[.*?\]\]/ig,
        getAutocardFromMacro,
    );
    return;
}

window.onload = initAutocard;

function hideAutocard() {
    document.getElementById("autocard-wrap").style.display = "none";
}

function showAutocard(cardname) {
    document.getElementById("autocard").src = getAutocardImageSrc(cardname);
    document.getElementById("autocard-wrap").style.display = "block";
}

function getAutocardImageSrc(cardname){
    let baseurl = 'http://gatherer.wizards.com/Handlers/Image.ashx?';
    // If given a number, we're searching by multiverse id.
    if (!isNaN(cardname)) {
        var query = 'multiverseid=' + cardname;
    } else {
        var query = 'name=' + cardname.replace('&amp;', '//').replace('’', '\'');
    }
    return baseurl + query + '&type=card';
}

// TODO: close autocard on esc
