
// If there's an ingredient list, show the toggle right before it.
var imperials = document.getElementsByClassName("imperial");
if (imperials.length > 0) {
    console.log("Creating unit toggle.")
    // The parent of the units is the item. Its parent is the list.
    var ingredients = imperials[0].parentNode.parentNode;
    unit_toggle = '<p id="unit-toggle"><label class="switch"><input type="checkbox" onclick="toggleUnits();"><span class="slider round"></span></label><span class="imperial">Showing imperial units. Switch to metric?</span><span class="metric">Showing metric units. Switch to imperial?</span></p>';
    ingredients.insertAdjacentHTML('afterend', unit_toggle);
} else {
    console.log("No unit toggle needed on this page.")
}

// When clicked, toggle between showing metric and imperial units.
function toggleUnits() {
    var imperial_display = document.getElementsByClassName("imperial")[0].style.display;
    if (imperial_display == "inline-block") {
        showUnits("metric");
        hideUnits("imperial");
    } else {
        showUnits("imperial");
        hideUnits("metric");
    }
    return;
}

function showUnits(type) {
    var units = document.getElementsByClassName(type);
    for (var i=0; i < units.length; i++) {
        // Not really sure why, but if we go straight from "none" to
        // "inline-block" it doesn't work.
        units[i].style.display = "block";
        units[i].style.display = "inline-block";
    }
    return;
}

function hideUnits(type) {
    var units = document.getElementsByClassName(type);
    for (var i=0; i < units.length; i++) {
        units[i].style.display = "none";
    }
    return;
}
