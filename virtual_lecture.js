function showVideo(event) {
  if (event) event.stopPropagation();
  document.getElementById("fullscreenOverlay").style.display = "flex";
  let fullscreenVid = document.getElementById("fullscreenVideo");
  fullscreenVid.play();
}

function closeVideo(event) {
  if (event) event.stopPropagation();
  document.getElementById("fullscreenOverlay").style.display = "none";
  let fullscreenVid = document.getElementById("fullscreenVideo");
  fullscreenVid.pause();
  fullscreenVid.currentTime = 0;
}