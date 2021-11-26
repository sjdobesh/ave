function updateDisplay() {
    let form = document.forms["a11y-form"];
    let body = document.getElementsByTagName("body")[0];

    setColorScheme(form["color-scheme-select"], body);

    setFontFamily(form["font-select"], body);

    return false; //don't submit form
}

function setColorScheme(colorSelect, body) {
    // Set class on body
    body.classList.remove("light-gentle");
    body.classList.remove("dark");
    body.classList.remove("dark-gentle");
    body.classList.add(colorSelect.value);
    // Mark the current selection in dropdown
    markSelected(colorSelect);
}

function setFontFamily(fontSelect, body) {
    // Set class on body
    body.classList.remove("serif");
    body.classList.remove("monospace");
    body.classList.remove("opendyslexic");
    body.classList.add(fontSelect.value);
    // Mark the current selection in dropdown
    markSelected(fontSelect);
}

function markSelected(select) {
    for (let i = 0; i < select.length; i++) {
        // console.log(i + ": " + colorSelect.options[i].text);
        if (i == select.selectedIndex) {
            if (!select.options[i].text.includes("Current")) {
                select.options[i].text += " - Current";
            }
        } else {
            select.options[i].text = select.options[i].text.replace(" - Current", "");
        }
    }
}