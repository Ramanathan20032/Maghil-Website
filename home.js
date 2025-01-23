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
