var previousWindowLoader = window.onload;

function getAutocardFromMacro(macro) {
    // Allowed formats: 'cardname' or 'cardname:text'
    if (macro.length > 50) {
        throw "autocard is too long: " + macro;
    }
    // TODO: watch out for weird characters
    cardname_text = macro.replace('[[', '').replace(']]', '').split(":");
    cardname = cardname_text[0];
    text = cardname_text[1];
    if (text == undefined) {
        text = cardname;
    }
    handler = 'showAutocard("' + cardname + '")';
    return "<a onclick='" + handler + "'>" + text + "</a>";
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

function getAutocardImageSrc(cardName){
    // If given a number, we're searching by multiverse id.
    if (!isNaN(cardName)) {
        var linkStart = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=';
        var linkEnd = '&type=card';
    } else {
        var linkStart = 'http://gatherer.wizards.com/Handlers/Image.ashx?type=card&name=';
        var linkEnd = '';
    }
    return linkStart + cardName.replace('&amp;','//').replace('’','\'') + linkEnd;
}
