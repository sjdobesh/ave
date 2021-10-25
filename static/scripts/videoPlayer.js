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

function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
    };
}

// initializeVideo sets the video duration, and maximum value of the
// progressBar
function initializeVideo() {
    const videoDuration = Math.round(video.duration);
    seek.setAttribute('max', videoDuration);
    progressBar.setAttribute('max', videoDuration);
    const time = formatTime(videoDuration);
    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}  

// updateTimeElapsed indicates how far through the video
// the current playback is
function updateTimeElapsed() {
    const time = formatTime(Math.round(video.currentTime));
    timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

// updateProgress indicates how far through the video
// the current playback is by updating the progress bar
function updateProgress() {
    seek.value = Math.floor(video.currentTime);
    progressBar.value = Math.floor(video.currentTime);
} 

// log time to Console for debugging
function logCurrentTime() {
    const time = formatTime(Math.round(video.currentTime));
    console.log(time);
}

const seekTooltip = document.getElementById('seek-tooltip');

// updateSeekTooltip uses the position of the mouse on the progress bar to
// roughly work out what point in the video the user will skip to if
// the progress bar is clicked at that point
function updateSeekTooltip(event) {
    const skipTo = Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10));
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


video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('timeupdate', updateTimeElapsed);
video.addEventListener('timeupdate', updateProgress);
seek.addEventListener('mousemove', updateSeekTooltip);
seek.addEventListener('input', skipAhead);

