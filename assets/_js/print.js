function getLetterLabel(n) {
    var str = '';
    while (n > 0) {
        var m = (n - 1) % 26;
        str = String.fromCharCode(97 + m) + str;
        n = Math.floor((n - 1) / 26);
    }
    return str;
}

function preparePrintReferences() {
    var article = document.querySelector('article');
    if (!article) return;

    // Clean up any existing generated print elements
    var existing = article.querySelector('.print-references');
    if (existing) existing.remove();
    article.querySelectorAll('.print-link-num').forEach(function(el) { el.remove(); });

    var links = article.querySelectorAll('a[href^="http"]');
    if (links.length === 0) return;

    var refSection = document.createElement('div');
    refSection.className = 'print-references';
    
    var heading = document.createElement('h3');
    heading.textContent = 'Links';
    refSection.appendChild(heading);

    var ol = document.createElement('ol');
    ol.setAttribute('type', 'a');
    var count = 0;

    links.forEach(function(link) {
        // Skip tags, metadata links, or autocard links
        if (link.classList.contains('post-tag') || link.closest('.post-links') || link.closest('.print-header')) return;

        count++;
        var label = getLetterLabel(count);
        var sup = document.createElement('sup');
        sup.className = 'print-link-num';
        sup.textContent = '[' + label + ']';
        if (link.nextSibling) {
            link.parentNode.insertBefore(sup, link.nextSibling);
        } else {
            link.parentNode.appendChild(sup);
        }

        var li = document.createElement('li');
        li.textContent = link.href;
        ol.appendChild(li);
    });

    if (count > 0) {
        refSection.appendChild(ol);
        article.appendChild(refSection);
    }
}

if (typeof window !== 'undefined') {
    window.addEventListener('beforeprint', preparePrintReferences);
}
