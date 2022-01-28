// Form input
const signUpForm = document.querySelector(".section-signup--form");

// Send credentials to server
const createAccount = async function (e) {
  e.preventDefault();

  // Signup Username
  const signUpUsername = document
    .querySelector("#section-signup--username")
    .value.trim();
  // Signup Password
  const signUpPassword = document
    .querySelector("#section-signup--password")
    .value.trim();
  // Signup Email
  const signUpEmail = document
    .querySelector("#section-signup--email")
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
