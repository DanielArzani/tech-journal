// Form input
const signUpForm = document.querySelector(".signup-form");

// Send credentials to server
const createAccount = async function (e) {
  e.preventDefault();

  // Signup Username
  const signUpUsername = document
    .querySelector("#signup-username-input")
    .value.trim();
  // Signup Password
  const signUpPassword = document
    .querySelector("#signup-password-input")
    .value.trim();
  // Signup Email
  const signUpEmail = document
    .querySelector("#signup-email-input")
    .value.trim();

  // Basic validation
  if ((signUpUsername, signUpPassword, signUpEmail)) {
    // Post to server
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
        email: signUpEmail,
      }),
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

// Listen for submit event
signUpForm.addEventListener("submit", createAccount);
