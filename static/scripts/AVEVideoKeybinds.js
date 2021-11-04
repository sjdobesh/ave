//these global vars are pulled out incase we want to implement custom user keybinds
//change as desired

//video actions
var startKey = "shift+s";
var pauseKey = "shift+d";
var startDownload = "shift+w";
var saveKey = "ctrl+s";
var undoKey = "ctrl+z";
var goToHelp = "?";

//scrubbing
var hopBack = "j";
var jumpBack = "k";
var hopForward = "l"; //this is an L, not an I
var jumpForward = ";";

//keybind go juice
Mousetrap.bind(startKey, function(){
    togglePlay();
});