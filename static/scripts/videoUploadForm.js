function updateUploadForm() {
    let label = document.getElementById("video-label");
    let input = document.getElementById("video");
    let button = document.getElementById("upload-button");

    console.log(label.innerHTML);
    console.log(input.value);

    let fileName = input.value;
    if (fileName.includes("\\")) {
        let reg = /([^\\]+$)/; // Get everything after last slash: https://regex101.com/library/zJ1zK6
        fileName = input.value.match(reg)[0]; // Get everything after last slash from filepath
        console.log(fileName);
        // TODO not sure how this works on mobile browsers...
    }

    console.log(button.innerHTML);

    label.innerHTML = fileName;
    button.innerHTML = "Upload " + fileName;
}