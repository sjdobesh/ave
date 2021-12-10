//these global vars are pulled out incase we want to implement custom user keybinds
//change as desired. empty string is equivalent to Mousetrap.unbind() as it will just bind nothing.
var ISMOUSETRAP = true;
//video actions
var play = "p";
var download = "ctrl+s";
var trim = "t"
var deleteSelection = "d";

//markers
var placeMarker1 = "u";
var placeMarker2 = "i";
var playSelectionKey = "o";

//scrubbing
var jumpBack = "j";
var hopBack = "k";
var hopForward = "l"; //this is an L, not an I
var jumpForward = ";";

//emergency escape AVE keybinds incase user has screenreader conflicts!
var fleeAVE = "shift+esc";

// start keybinds if the video element exists
if (document.getElementsByTagName("video")) {
    startMousetrap();
}

//this is the unbinding function, it will stop mousetrap until something calls startMousetrap() again
function disableMousetrap() {
    if (!ISMOUSETRAP) {
        return;
    }

    ISMOUSETRAP = !ISMOUSETRAP;

    Mousetrap.unbind(play);
    Mousetrap.unbind(download);
    Mousetrap.unbind(trim);
    Mousetrap.unbind(deleteSelection);
    Mousetrap.unbind(placeMarker1);
    Mousetrap.unbind(placeMarker2);
    Mousetrap.unbind(playSelectionKey);
    Mousetrap.unbind(hopBack);
    Mousetrap.unbind(jumpBack);
    Mousetrap.unbind(hopForward);
    Mousetrap.unbind(jumpForward);
    Mousetrap.unbind(fleeAVE);
}

//keybind go juice, this will all be moved into a function that is activated by a button in the nav
function startMousetrap() {
    ISMOUSETRAP = "true";
    Mousetrap.bind(play, function () {
        togglePlay();
    });

    Mousetrap.bind(trim, function () {
        document.getElementById("trim").click();
    });

    Mousetrap.bind(download, function () {
        document.getElementById("download").click();
    });

    Mousetrap.bind(deleteSelection, function () {
        document.getElementById("delete").click();
    });

    Mousetrap.bind(placeMarker1, function () {
        document.getElementById("addMark1").click();
    });

    Mousetrap.bind(placeMarker2, function () {
        document.getElementById("addMark2").click();
    });

    Mousetrap.bind(playSelectionKey, function () {
        document.getElementById("playSelection").click();
    });

    Mousetrap.bind(fleeAVE, function () {
        disableMousetrap();
        document.getElementById("shortcuts").checked = false;
    });

    Mousetrap.bind(hopBack, function () {
        movePlayhead(-1 * SMALL_STEP);
    });

    Mousetrap.bind(jumpForward, function () {
        movePlayhead(LARGE_STEP);
    });

    Mousetrap.bind(hopForward, function () {
        movePlayhead(SMALL_STEP);
    });

    Mousetrap.bind(jumpBack, function () {
        movePlayhead(-1 * LARGE_STEP);
    });
}