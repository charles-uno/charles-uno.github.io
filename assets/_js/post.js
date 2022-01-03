
// Wrap each table in a div so we can round its corners nicely. If the
// table is immediately followed by a caption, get that in there too.
var tables = document.getElementsByTagName('table');
for (var i=0; i<tables.length; i++) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("table-wrapper");
    var next = tables[i].nextElementSibling;
    // Insert the wrapper right before the table.
    tables[i].parentNode.insertBefore(wrapper, tables[i]);
    // Move the table into the wrapper.
    wrapper.appendChild(tables[i]);
    // If it's followed by a caption, move that in there as well.
    if (next.classList && next.classList.contains("table-caption")) {
        wrapper.appendChild(next);
    }
}

// ---------------------------------------------------------------------

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
