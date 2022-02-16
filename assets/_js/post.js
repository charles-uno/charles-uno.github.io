
// The CSS ::before pseudo-element is not allowed to insert HTML, so
// let's use some Javascript to insert an <hr> before the div that
// contains the footnotes.
var fns = document.getElementsByClassName('footnotes');
for ( var i=0; i < fns.length; i++ ) {
    fns[i].parentNode.insertBefore(
        document.createElement('hr'),
        fns[i]
    );
}
