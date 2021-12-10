// Code from https://freshman.tech/custom-html5-video/
const video = document.getElementById("videoPlayer");
const videoControls = document.getElementById("videoControls");

const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
    video.controls = false;
    videoControls.classList.remove('hidden');
}

// toggle between playing and pausing
function togglePlay() {
    playStart = Date.now();
    const playButton = document.getElementById("playButton")
    if (video.paused || video.ended) {
        video.play();
        playButton.innerText = "Pause";
    } else {
        video.pause();
        playButton.innerText = "Play";
    }
}

// time-elapsed
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');
const seek = document.getElementById('seek');

function formatTime(timeInSeconds) { // eg 76.4193746
    const result = (new Date(timeInSeconds * 1000)).toISOString().substr(11, 11);

    return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
        milliseconds: result.substr(9, 2),
    };
}

// initializeVideo sets the video duration, and maximum value of the
// progressBar
function initializeVideo() {
    const videoDuration = video.duration.toFixed(2);
    seek.setAttribute('max', videoDuration);
    progressBar.setAttribute('max', videoDuration);
    const time = formatTime(videoDuration);
    duration.innerText = `${time.minutes}:${time.seconds}.${time.milliseconds}`;
}

// updateTimeElapsed indicates how far through the video
// the current playback is
function updateTimeElapsed() {
    const time = formatTime(video.currentTime.toFixed(2));
    timeElapsed.innerText = `${time.minutes}:${time.seconds}.${time.milliseconds}`;
}

// updateProgress indicates how far through the video
// the current playback is by updating the progress bar
function updateProgress() {
    seek.value = video.currentTime.toFixed(2);
    progressBar.value = video.currentTime.toFixed(2);
}

// log time to Console for debugging
function logCurrentTime() {
    const time = formatTime(video.currentTime.toFixed(2));
    console.log(time);
}

const seekTooltip = document.getElementById('seek-tooltip');

// updateSeekTooltip uses the position of the mouse on the progress bar to
// roughly work out what point in the video the user will skip to if
// the progress bar is clicked at that point
function updateSeekTooltip(event) {
    const skipTo = ((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10)).toFixed(2);
    seek.setAttribute('data-seek', skipTo)
    const t = formatTime(skipTo);
    seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
    const rect = video.getBoundingClientRect();
    seekTooltip.style.left = `${event.pageX - rect.left}px`;
}

// skipAhead jumps to a different point in the video when
// the progress bar is clicked
function skipAhead(event) {
    const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
    video.currentTime = skipTo;
    progressBar.value = skipTo;
    seek.value = skipTo;
}
const playSelectionButton = document.getElementById('playSelection');
playSelectionButton.onclick = function() {playSelection()};
var playSelectionStart = Date.now();
function playSelection() {
    if (validateMarks("Play Selection")) {
        // if video is playing, pause real quick so togglePlay() works as intended
        if (!video.paused && !video.ended) {
            video.pause();
        }
        // set start at first mark, play, and set delayed pause for this specific playSelection instance
        seek.value = mark1time.toFixed(2);
        progressBar.value = mark1time.toFixed(2);
        video.currentTime = mark1time;
        playStart = Date.now();
        let timeToWait = (mark2time - mark1time).toFixed(2) * 1000;
        togglePlay();
        endPlaySelection(timeToWait, playStart);
    }
}
// waits and then ends "play selection" at mark2 time. only ends if we are still playing from original playSelection call
function endPlaySelection(timeToWait, currentPlayStart) {
    setTimeout(() => {
        if (playStart == currentPlayStart) {
            togglePlay();
        }
    }, timeToWait);
}

// SETTING MARKS //

// collect the labels from the document
const mark1 = document.getElementById('mark1');
const mark2 = document.getElementById('mark2');
// collect the actual timings
var mark1time = video.currentTime;
var mark2time = video.currentTime;
// collect the buttons
const addMark1 = document.getElementById("addMark1");
const addMark2 = document.getElementById("addMark2");
// collect the alert list
const alertList = document.querySelector("ul.flashes");
var markAlert = document.querySelector("ul.flashes li#markAlert");

// which should be 1 or 2 indicating which mark
function updateMark(which) {
    const time = formatTime(video.currentTime.toFixed(2));
    const timeAsText = `${time.minutes}:${time.seconds}.${time.milliseconds}`;
    // using ternary with arg to decide which mark we are setting
    if (which == 1) {
        mark1time = video.currentTime;
        mark1.innerText = timeAsText;
    } else {
        mark2time = video.currentTime;
        mark2.innerText = timeAsText;
    }
}
// set on click functions to update marks
addMark1.onclick = function() {updateMark(1)};
addMark2.onclick = function() {updateMark(2)};

// Validate marks before trimming or deleting
function validateMarks(action = "") {
    if (mark1.innerText < mark2.innerText) {
        // Set hidden inputs
        if (action == "Trim") {
            document.getElementById("trimMark1").value = mark1.innerText;
            document.getElementById("trimMark2").value = mark2.innerText;
        } else if (action == "Delete") {
            document.getElementById("deleteMark1").value = mark1.innerText;
            document.getElementById("deleteMark2").value = mark2.innerText;
        }
        return true;
    }
    if (!markAlert) {
        alertList.innerHTML = '<li id="markAlert">ALERT</li>';
        markAlert = document.querySelector("ul.flashes li#markAlert");
    }
    markAlert.innerHTML = String(action) + " Error: Markers out of order. Mark 1 must come before Mark 2. Current placement: <ol><li>" + mark1.innerText + "</li><li>" + mark2.innerText + "</li></ol>";
    return false;
}

// Video scrubbing and rewinding/fast-forwarding

const smallRightStep = document.getElementById("smallRightStep");
const largeRightStep = document.getElementById("largeRightStep");
const largeLeftStep = document.getElementById("largeLeftStep");
const smallLeftStep = document.getElementById("smallLeftStep");

function movePlayhead(numFrames) {
    video.currentTime += numFrames;
    progressBar.value = video.currentTime;
    const time = formatTime(video.currentTime.toFixed(2));
}

const SMALL_STEP = 1; // Amount of seconds for a scrub
const LARGE_STEP = 10; // Amount of seconds for a large step

video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('timeupdate', updateTimeElapsed);
video.addEventListener('timeupdate', updateProgress);
seek.addEventListener('mousemove', updateSeekTooltip);
seek.addEventListener('input', skipAhead);
smallRightStep.onclick = function() {movePlayhead(SMALL_STEP)};
smallLeftStep.onclick = function() {movePlayhead(-1 * SMALL_STEP)};
largeRightStep.onclick = function() {movePlayhead(LARGE_STEP)};
largeLeftStep.onclick = function() {movePlayhead(-1 * LARGE_STEP)};

