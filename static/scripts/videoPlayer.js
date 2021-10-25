// Code from https://freshman.tech/custom-html5-video/
const video = document.getElementById("videoPlayer");
const videoControls = document.getElementById("videoControls");

// const videoWorks = !!document.createElement('video').canPlayType;
// if (videoWorks) {
//     video.controls = false;
//     videoControls.classList.remove('hidden');
// }

// // play button
// const playButton = document.getElementById("play");

// function togglePlay() {
//     if (video.paused || video.ended) {
//         video.play();
//     } else {
//         video.pause();
//     }
// }

// time-elapsed
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');

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

// log time to Console for debugging
function logCurrentTime() {
    const time = formatTime(Math.round(video.currentTime));
    console.log(time);
}

// playButton.addEventListener('click', togglePlay);
video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('timeupdate', updateTimeElapsed);