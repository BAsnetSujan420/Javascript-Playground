/*Get our elements*/ 
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = document.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = document.querySelector(".toggle");
const skipButtons = player.querySelector("[data-skip]");
cont ranges = player.querySelector(".player__slider");

/*Build out function*/ 
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
  }

/*Hook up the event listeners */ 
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);