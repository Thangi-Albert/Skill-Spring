const signUpButton = document.getElementById("sign-up-toggle");
const signInButton = document.getElementById("sign-in-toggle");
const signUpForm = document.getElementById("sign-up");
const signInForm = document.getElementById("sign-in");
const submitSignup = document.getElementById("submitSignup");
const submitSignin = document.getElementById("submitSignin");

// Toggle between forms
signUpButton.addEventListener("click", () => {
  signInButton.classList.remove("active");
  signUpButton.classList.add("active");
  signInForm.classList.remove("active");
  signUpForm.classList.add("active");
  clearErrors();
});

signInButton.addEventListener("click", () => {
  signUpButton.classList.remove("active");
  signInButton.classList.add("active");
  signInForm.classList.add("active");
  signUpForm.classList.remove("active");
  clearErrors();
});

function clearErrors() {
  document.querySelectorAll('.errors').forEach(span => span.textContent = '');
}

// Helper: show error for a specific field
function showError(elementId, message) {
  const errorSpan = document.getElementById(elementId);
  if (errorSpan) errorSpan.textContent = message;

  setTimeout(() => {
    if (errorSpan) errorSpan.textContent = '';
  }, 3000);
}

// Sign Up validation
function validateSignUp() {
  const firstname = document.getElementById("signup-firstname").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  let isValid = true;
  clearErrors();

  if (firstname === "") {
    showError("signup-name-error", "First name is required.");
    isValid = false;
  }
  if (email === "") {
    showError("signup-email-error", "Email is required.");
    isValid = false;
  } else if (!email.includes("@") || !email.includes(".")) {
    showError("signup-email-error", "Enter a valid email address.");
    isValid = false;
  }
  if (password === "") {
    showError("signup-password-error", "Password is required.");
    isValid = false;
  } else if (password.length < 6) {
    showError("signup-password-error", "Password must be at least 6 characters.");
    isValid = false;
  }

  if (isValid) {
    alert("Sign Up successful! (Demo)");
  }
}

// Sign In validation
function validateSignIn() {
  const email = document.getElementById("signin-email").value.trim();
  const password = document.getElementById("signin-password").value.trim();

  let isValid = true;
  clearErrors();

  if (email === "") {
    showError("signin-email-error", "Email is required.");
    isValid = false;
  } else if (!email.includes("@") || !email.includes(".")) {
    showError("signin-email-error", "Enter a valid email address.");
    isValid = false;
  }
  if (password === "") {
    showError("signin-password-error", "Password is required.");
    isValid = false;
  }

  if (isValid) {
    alert("Sign In successful! (Demo)");
  }
}

// Attach event listeners to buttons
submitSignup.addEventListener("click", (e) => {
  e.preventDefault();
  validateSignUp();
});

submitSignin.addEventListener("click", (e) => {
  e.preventDefault();
  validateSignIn();
});