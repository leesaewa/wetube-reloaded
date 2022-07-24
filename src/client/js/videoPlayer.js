const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeLine");

// fullscreen
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

//마우스가 오버됐을 때 계속 생성되는 timeout을 취소함.
let controlsTimeout = null;
let controlsMovementTimeout = null;

// volume
let volumeValue = 0.5;
video.volume = volumeValue;

//
// play
//

// video click
video.addEventListener("click", () => {
  handlePlayClick();
});
// space bar
window.addEventListener("keyup", (event) => {
  const { code } = event;
  if (code === "Space") {
    handlePlayClick();
  }

  if (code === "ArrowLeft") {
    video.currentTime -= 10;
  } else if (code === "ArrowRight") {
    video.currentTime += 10;
  }
});

const handlePlayClick = (e) => {
  //if the video is playing, pause it
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "play_arrow" : "pause";
};

//
// mute
//
const handleMute = (e) => {
  // mute check
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  if (video.volume === 0) {
    volumeValue = 0.5;
    video.volume = 0.5;
  }
  muteBtn.innerText = video.muted ? "volume_off" : "volume_up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

//
// volume
//
const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "volume_up";
  }

  volumeValue = value;
  video.volume = value;

  if (Number(volumeValue) === 0) {
    video.muted = true;
    muteBtn.innerText = "volume_off";
  } else {
    video.muted = false;
    muteBtn.innerText = "volume_up";
  }
};

//
// time
//
const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(11, 19);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));

  //
  timeLine.max = Math.floor(video.duration);
};

const handleTimeupdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

//
// fullscreen
//
const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "fullscreen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "close_fullscreen";
  }
};

//
// mouse
// 기본 로직
// 1. 마우스를 움직이게 되면 기존 setTimeout이 clearTimeout에 의해 지워지고, 새로운 setTimeout이 생성되고, 실행되게 된다.
// 2. 그 상태에서 마우스를 움직이지 않으면 새로운 setTimeout이 3초 후에 실행되게 되서 비디오 컨트롤바를 숨긴다.
// 3. 움직이게 되면 다시 위의 1번처럼 기존 setTimeout은 clearTimeout에 의해 지워지고, 새로운 setTimeout이 생성된다.
const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleEnded = async () => {
  const { id } = videoContainer.dataset;
  console.log(id);
  await fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

//
// addEventListener
//
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);

volumeRange.addEventListener("input", handleVolumeChange);
timeLine.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);

video.addEventListener("ended", handleEnded);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeupdate);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
