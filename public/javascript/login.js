// Form input
const loginForm = document.querySelector(".login-form");

// Send credentials to server
const login = async function (e) {
  e.preventDefault();

  // login Username
  const loginUsername = document
    .querySelector("#login-username-input")
    .value.trim();
  // login Password
  const loginPassword = document
    .querySelector("#login-password-input")
    .value.trim();
  // login Email
  const loginEmail = document.querySelector("#login-email-input").value.trim();

  console.log(loginUsername);
  console.log(loginPassword);
  console.log(loginEmail);
  // Basic validation
  if ((loginUsername, loginPassword, loginEmail)) {
    // Post to server
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
        email: loginEmail,
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
loginForm.addEventListener("submit", login);
