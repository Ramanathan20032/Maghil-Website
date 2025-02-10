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


// #######################################################
// Select chatbot elements
const chatbotToggle = document.querySelector(".chatbot-toggle");
const chatbotWindow = document.querySelector(".chatbot-window");
const chatbotClose = document.querySelector(".chatbot-close");
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const messages = document.querySelector(".chatbot-messages");

// Toggle chatbot window
chatbotToggle.addEventListener("click", () => {
  chatbotWindow.style.display =
    chatbotWindow.style.display === "none" ? "block" : "none";
});

// Close chatbot window
chatbotClose.addEventListener("click", () => {
  chatbotWindow.style.display = "none";
});

// Function to add messages to the chat window
function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("chatbot-message", sender);
  message.innerText = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight; // Auto-scroll to the latest message
}

// Handle sending messages
sendBtn.addEventListener("click", () => {
  const userMessage = chatInput.value.trim().toLowerCase();
  if (!userMessage) return;

  // Add user's message
  addMessage(userMessage, "user");

  // Generate chatbot reply
  let botReply = "I don't understand.";
  if (userMessage.includes("hello")) botReply = "Hello! How can I assist you?";
  if (userMessage.includes("help"))
    botReply = "Sure! What do you need help with?";
  if (userMessage.includes("bye")) botReply = "Goodbye! Have a great day.";
  if (userMessage.includes("hi")) botReply = "Hi...";

  setTimeout(() => {
    addMessage(botReply, "bot");
  }, 700); 

  chatInput.value = "";
});

// Handle Enter key for input
chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendBtn.click();
  }
});


// scale Effect on the first Scroll
window.addEventListener("load", () => {
  setTimeout(() => {
    const chatbotToggle = document.querySelector(".chatbot-toggle");
    chatbotToggle.style.opacity = "1";
    chatbotToggle.style.transform = "scale(1)";  // Scale up to normal size
  }, 500); 
});
