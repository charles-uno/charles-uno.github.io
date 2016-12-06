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
