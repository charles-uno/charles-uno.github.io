var transparentImage = '{{ site.baseurl }}/assets/transparent.png';
var indexList = document.getElementById('index-list');


// If clicked repeatedly, the sorts toggle forward and backward. The name toggle
// starts flipped, because forward sorting by name is the default.
var nameToggle = -1;
var dateToggle = 1;

//var logoIsFixed = 0;

if(indexList) { sort('loadOrder'); }

function sort(method) {
    this[method]();
    var html = '';
    for(var i = 0; i < themes.length; i++) {
        if(!themes[i]) { continue; }
            html += '<li class="index-item">' +
                '<a href="' + themes[i].url + '" class="index-link">' +
                    '<div class="index-cell">' +
                      '<span class="index-date">' + themes[i].date + '</span>' +
                      '<h2 class="index-name">' + themes[i].title + '</h2>' +
                    '</div>' +
                  '</a>' +
                  '<img src="' + themes[i].thumbnail + '" class="index-thumb" />' +
                '</li>';
    }
    indexList.innerHTML = html;
    echo.render();
    saveOrder();

    // Not really clear what's going wrong here... these changes get reversed right away.
    /*
    if (method == 'alphabetical') {
        flipNameToggle();
        resetDateToggle();
        resetLogo();
    } else if (method == 'latest') {
        resetNameToggle();
        flipDateToggle();
        resetLogo();
    } else if (method == 'shuffle') {
        resetNameToggle();
        resetDateToggle();
        shuffleLogo();
    }
    // Else, for a fresh page, do nothing.
    */
}

function saveOrder() {
    var themeTitles = themes.map(function(theme) { return theme.title; });
    sessionStorage.setItem('order', JSON.stringify(themeTitles));
}

function loadOrder() {
    var newOrder = [];
    var themeTitles = JSON.parse(sessionStorage.getItem('order'));
    if(!themeTitles) { shuffle(); return; }
    themes.forEach(function(theme) {
        newOrder[themeTitles.indexOf(theme.title)] = theme;
    });
    themes = newOrder;
}

function shuffle() {
    var currentIndex = themes.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = themes[currentIndex];
        themes[currentIndex] = themes[randomIndex];
        themes[randomIndex] = temporaryValue;
    }
}

function alphabetical() {
    themes.sort(function(a, b){
        var titleA = a.title.toLowerCase();
        var titleB = b.title.toLowerCase();
        if(titleA < titleB) return -nameToggle;
        if(titleA > titleB) return nameToggle;
        return 0;
    });
}

function latest() {
    themes.sort(function(a, b){
        if(a.date < b.date) return dateToggle;
        if(a.date > b.date) return -dateToggle;
        return 0;
    });
}

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
    resetNameToggle();
    resetDateToggle();
}

function flipNameToggle() {
    var cell = document.getElementById('name-cell');
    if (nameToggle == 1) {
        cell.innerHTML = '<a class="fa fa-sort-alpha-desc" aria-hidden="true" href="" onclick="sort(\'alphabetical\'); flipNameToggle(); return false;"></a>';
        nameToggle = -1;
    } else {
        resetNameToggle();
    }
    resetLogo();
    resetDateToggle();
}


function flipDateToggle() {
    var cell = document.getElementById('date-cell');
    if (dateToggle == 1) {
        cell.innerHTML = '<a class="fa fa-sort-numeric-desc" aria-hidden="true" href="" onclick="sort(\'latest\'); flipDateToggle(); return false;"></a>';
        dateToggle = -1;
    } else {
        resetDateToggle();
    }
    resetLogo();
    resetNameToggle();
}

function resetLogo() {
    var logo = document.getElementById('logo');
    logo.innerHTML = '<span class="title-base">char</span><span class="title-accent">1</span><span class="title-base">es</span>';
}

function resetNameToggle() {
    var cell = document.getElementById('name-cell');
    cell.innerHTML = '<a class="fa fa-sort-alpha-asc" aria-hidden="true" href="" onclick="sort(\'alphabetical\'); flipNameToggle(); return false;"></a>';
    nameToggle = 1;
}

function resetDateToggle() {
    var cell = document.getElementById('date-cell');
    cell.innerHTML = '<a class="fa fa-sort-numeric-asc" aria-hidden="true" href="" onclick="sort(\'latest\'); flipDateToggle(); return false;"></a>';
    dateToggle = 1;
}





/*
function fixlogosize() {
    var logo = document.getElementById('logo');
    var cell = document.getElementById('logo-cell');
    var link = document.getElementById('logo-link');
    var div = document.getElementById('logo-div');
    var width = logo.clientWidth;

    // debug
    var wdiv = document.getElementById('logo-width');
    wdiv.innerHTML = width;

    if (logoIsFixed == 0) {
        logoIsFixed = 1;
        cell.style.width = width + "px";
        link.style.width = "100%";
        div.style.width = "100%";
        logo.style.width = "100%";
        logo.style.display = "inline";
        div.style.display = "inline";
        link.style.display = "inline";
    }
}
*/

/*
function test1() {
    var obj = document.getElementById('test');
    obj.innerHTML = "SHUFFLED";
}

function test2() {
    var obj = document.getElementById('test');
    obj.innerHTML = "RESTORED";
}
*/

/*
function reversealphabetical() {
  themes.sort(function(a, b){
    var titleA = a.title.toLowerCase();
    var titleB = b.title.toLowerCase();
    if(titleA > titleB) return -1;
    if(titleA < titleB) return 1;
    return 0;
  });
}
*/

/*
function reverselatest() {
  themes.sort(function(a, b){
    if(a.date > b.date) return 1;
    if(a.date < b.date) return -1;
    return 0;
  });
}

function popularity() {
  themes.sort(function(a, b){
    return b.stars - a.stars;
  });
}
*/
