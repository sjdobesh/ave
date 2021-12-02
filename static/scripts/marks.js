function updateMarkForm(mark) {
    if (isNaN(mark) || (mark != 1 && mark != 2)) {
        console.log("Issue with mark. Should be 1 or 2");
        return false;
    }

    let form = document.forms["m" + mark + "-form"];
    let mm = form["m" + mark + "-mm"];
    let ss = form["m" + mark + "-ss"];
    let ms = form["m" + mark + "-ms"];
    console.log(mm.value + ":" + ss.value + "." + ms.value);

    return false;
}