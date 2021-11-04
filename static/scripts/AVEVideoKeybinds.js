//these global vars are pulled out incase we want to implement custom user keybinds
//change as desired. empty string is equivalent to Mousetrap.unbind() as it will just bind nothing.

//video actions
var togglePlayKey = "shift+s";
var saveKey = "ctrl+s";
var snipKey = "ctrl+a"
var undoKey = "ctrl+z";
var goToHelp = "?";

//markers
var placeMarker = "o";
var removeMarker = "p";
var toggleMarkerGrab = "u";

//scrubbing
var hopBack = "k";
var jumpBack = "j";
var hopForward = "l"; //this is an L, not an I
var jumpForward = ";";

//emergency escape AVE keybinds incase user has screenreader conflicts!
var fleeAVEKey = "shift+esc";

//this is the unbinding function, it will stop mousetrap until something calls startMousetrap() again
function disableMousetrap(){
    Mousetrap.unbind(togglePlayKey);
    Mousetrap.unbind(saveKey);
    Mousetrap.unbind(snipKey);
    Mousetrap.unbind(undoKey);
    Mousetrap.unbind(goToHelp);
    Mousetrap.unbind(placeMarker);
    Mousetrap.unbind(removeMarker);
    Mousetrap.unbind(toggleMarkerGrab);
    Mousetrap.unbind(hopback);
    Mousetrap.unbind(jumpBack);
    Mousetrap.unbind(fleeAVEKey);
}

//keybind go juice, this will all be moved into a function that is activated by a button in the nav
Mousetrap.bind(togglePlayKey, function(){
    togglePlay();
});

Mousetrap.bind(snipKey, function(){
    //place snip call here.
});

Mousetrap.bind(saveKey, function(){
    //save call here
});

Mousetrap.bind(undoKey, function(){
    //undo
});

Mousetrap.bind(goToHelp, function(){
    //help!
});

Mousetrap.bind(placeMarker, function(){
    //call place marker here
});

Mousetrap.bind(removeMarker, function(){
    //call remove marker here
});

Mousetrap.bind(toggleMarkerGrab, function(){
    //add call to grab/drop function here
});

Mousetrap.bind(fleeAVEKey, function(){
    disableMousetrap();
});

//scrubbing
Mousetrap.bind(hopBack, function(){
    movePlayhead(-1 * SMALL_STEP);
});

Mousetrap.bind(jumpForward, function(){
    movePlayhead(LARGE_STEP);
});

Mousetrap.bind(hopForward, function(){
    movePlayhead(SMALL_STEP);
});

Mousetrap.bind(jumpBack, function(){
    movePlayhead(-1 * LARGE_STEP);
});