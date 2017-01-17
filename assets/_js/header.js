
// #####################################################################

function headActive() {
    document.getElementById('wrap-head-active').style.display = "";
    document.getElementById('wrap-head-default').style.display = "none";
}

// ---------------------------------------------------------------------

function headDefault() {
    document.getElementById('wrap-head-active').style.display = "none";
    document.getElementById('wrap-head-default').style.display = "";
}

// ---------------------------------------------------------------------

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    // For portability.
    if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
        isEscape = (evt.keyCode == 27);
    }
    if (isEscape) {
        headDefault();
    }
};
