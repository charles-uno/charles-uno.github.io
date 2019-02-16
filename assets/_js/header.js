
// #####################################################################

function headActive() {
    document.getElementById('wrap-head-active').style.display = "";
    document.getElementById('wrap-head-default').style.display = "none";
    f = document.getElementById('index-filter');
    if (f) { f.select(); f.focus(); }
}

// ---------------------------------------------------------------------

function headDefault() {
    f = document.getElementById('index-filter');
    if (f) { f.value = ''; filter(); }
    document.getElementById('wrap-head-active').style.display = 'none';
    document.getElementById('wrap-head-default').style.display = '';
}
