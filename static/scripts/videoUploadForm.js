function updateUploadForm() {
    let label = document.getElementById("video-label");
    let input = document.getElementById("video");
    let button = document.getElementById("upload-button");

    let fileName = input.value;
    if (fileName.includes("\\")) {
        let reg = /([^\\]+$)/; // Get everything after last slash: https://regex101.com/library/zJ1zK6
        fileName = input.value.match(reg)[0]; // Get everything after last slash from filepath
        // TODO not sure how this works on mobile browsers...
    }

    label.innerHTML = fileName;
    button.disabled = false;
    button.innerHTML = "Upload " + fileName;
}