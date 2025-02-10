// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// Typing Effect
const staticText = document.querySelector('.static-text');
const words = ["Secure", "Optimized", "User-Friendly", "Customizable", "Collaborative"];
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

const typingSpeed = 150; // Typing/deleting speed in milliseconds
const holdTime = 1000; // Hold time after the full word appears

function typeEffect() {
  // Typing phase
  if (!isDeleting && letterIndex < words[wordIndex].length) {
    staticText.textContent = words[wordIndex].substring(0, ++letterIndex);
  }

  // When the full word appears
  if (!isDeleting && letterIndex === words[wordIndex].length) {
    setTimeout(() => (isDeleting = true), holdTime); // Start deleting after holding
    return setTimeout(typeEffect, holdTime); // Pause while holding
  }

  // Deleting phase
  if (isDeleting && letterIndex > 0) {
    staticText.textContent = words[wordIndex].substring(0, --letterIndex);
  }

  // Move to the next word when deletion is complete
  if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  // Continue the typing/deleting cycle
  setTimeout(typeEffect, typingSpeed);
}

typeEffect();


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
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


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// Counter Animation
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".achievement-count");

  const updateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const increment = Math.max(target / 50); 

    let count = 0;
    const update = () => {
      count += increment;
      if (count < target) {
        counter.innerText = Math.min(Math.ceil(count), target); 
        requestAnimationFrame(update);
      } else {
        counter.innerText = `${target}+`;
      }
    };
    update();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          updateCounter(counter);
          observer.unobserve(counter); // Stops observing after animation
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});