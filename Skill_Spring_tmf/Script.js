// Anime.js Configuration for SkillSpring Splash Screen

let currentSlide = 0;
const slides = [];

// Splash Screen Animation Sequence
document.addEventListener("DOMContentLoaded", function () {
  // Get all slide sections
  const slideSections = document.querySelectorAll(".slide-pg-1");
  slides.push(...slideSections);

  // Step 1: Show SkillSpring splash for 3 seconds, then fade out
  setTimeout(function () {
    const mainPage = document.querySelector(".main-page");
    mainPage.classList.add("fade-out");

    // Step 2: After fade out, show loading screen
    setTimeout(function () {
      const loadingContainer = document.querySelector(".loading-container");
      loadingContainer.classList.add("active");

      // Step 3: After 2 seconds of loading, show first slide
      setTimeout(function () {
        loadingContainer.classList.remove("active");
        showSlide(0);
      }, 2000);
    }, 500); // Small delay for smooth transition
  }, 3000); // Show splash for 3 seconds

  // Setup NEXT button listeners for all slides
  setupNextButtonListeners();
});

function showSlide(index) {
  if (index < 0 || index >= slides.length) return;

  // Hide current slide
  if (slides[currentSlide]) {
    slides[currentSlide].classList.remove("show");
    slides[currentSlide].classList.add("fade-out");
  }

  // Update current slide index
  currentSlide = index;

  // Show new slide
  slides[currentSlide].classList.remove("fade-out");
  slides[currentSlide].classList.add("show");

  // Animate content
  animateSlideContent();
  // Update dots tracker for all slides
  updateDots(currentSlide);
}

// Update dot indicators inside each slide to reflect current page
function updateDots(index) {
  slides.forEach((slide) => {
    const dots = slide.querySelectorAll(".slider-button .dot");
    if (!dots || dots.length === 0) return;
    const activeIndex = Math.min(index, dots.length - 1);
    dots.forEach((dot, i) => {
      if (i === activeIndex) dot.classList.add("active");
      else dot.classList.remove("active");
    });
  });
}

function setupNextButtonListeners() {
  const buttons = document.querySelectorAll("#next");
  buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      anime({
        targets: "#next",
        scale: 0.95,
        duration: 100,
        easing: "easeOutQuad",
      });
      const nextIndex = currentSlide + 1;
      if (nextIndex < slides.length) {
        showSlide(nextIndex);
      }
    });

    btn.addEventListener("mouseenter", function () {
      anime({
        targets: this,
        scale: 1.05,
        duration: 300,
        easing: "easeOutQuad",
      });
    });

    btn.addEventListener("mouseleave", function () {
      anime({
        targets: this,
        scale: 1,
        duration: 300,
        easing: "easeOutQuad",
      });
    });
  });
}

// Animate slide content
function animateSlideContent() {
  const currentContainer = slides[currentSlide]?.querySelector(".container");
  if (!currentContainer) return;

  anime
    .timeline()
    .add({
      targets: currentContainer.querySelector("img"),
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      easing: "easeOutQuad",
    })
    .add(
      {
        targets: currentContainer.querySelector(".final-container h3"),
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: "easeOutQuad",
      },
      "-=400",
    )
    .add(
      {
        targets: currentContainer.querySelector(".final-container p"),
        opacity: [0, 1],
        duration: 600,
        easing: "easeOutQuad",
      },
      "-=300",
    );
}
