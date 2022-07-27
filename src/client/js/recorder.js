const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
  const a = document.createElement("a"); //a태그 생성
  a.href = videoFile; //'URL.createObjectURL(event.data);'로 생성된 링크를 a태그로 보냄
  a.download = "My_Recording.webm"; //a태그의 다운로드 속성
  document.body.appendChild(a); //생성한 a태그를 body 안에 넣음
  a.click(); // 유저가 클릭할 수 있게 함.
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    //브라우저의 메모리에 있는 url을 생성함.
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });

  video.srcObject = stream;
  video.play();
};

init();
startBtn.addEventListener("click", handleStart);
