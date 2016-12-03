var post = document.getElementsByClassName('post')[0];
if(post) { loadOrder(); }

function previous(title) {
    var i = findThemeIndex(title);
    var ii = (i + themes.length - 1) % themes.length;
    window.location.href = themes[ii].url;
}

function next(title) {
    var i = findThemeIndex(title);
    var ii = (i + 1) % themes.length;
    window.location.href = themes[ii].url;
}

function findThemeIndex(title) {
    for(var i = 0; i < themes.length; i++) {
        if(themes[i].title === title) {
            return i;
        }
    }
    return 0;
}
