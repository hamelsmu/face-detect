const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
canvas.width = 1280;
canvas.height = 720;
const ctx = canvas.getContext('2d');
ctx.lineWidth = 2;
ctx.strokeStyle = 'yellow';
const faceCanvas = document.querySelector('.face');
const faceCtx = canvas.getContext('2d');
const faceDetector = new FaceDetector({ fastMode: true });

async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
  video.srcObject = stream;
  await video.play();
}

function drawface(face) {
  const { x, y, width, height } = face.boundingBox;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(x, y, width, height);
}

async function detect() {
  const faces = await faceDetector.detect(video);
  faces.forEach(drawface);
  // ask the browser when the next animation frame is
  requestAnimationFrame(detect);
}

populateVideo().then(detect);
