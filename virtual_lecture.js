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


// Page - Up
document.addEventListener("DOMContentLoaded", () => {
  const pageUp = document.querySelector(".page-up");

  if (!pageUp) {
    console.error("Error: .page-up element not found in the DOM");
    return;
  }

  window.addEventListener("scroll", () => {
  //   console.log("Current Scroll Position (window.scrollY):", window.scrollY); 
    if (window.scrollY >= 120) {  // Ensure visibility after 120px
      pageUp.classList.add("show");
      // console.log("page-up is now visible!"); 
    } else {
      pageUp.classList.remove("show");
      // console.log("page-up is hidden!"); 
    }
  });

  pageUp.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});  