// Form input
const loginForm = document.querySelector(".section-login--form");

// Send credentials to server
const login = async function (e) {
  e.preventDefault();

  // login Username
  const loginUsername = document
    .querySelector("#section-login--username")
    .value.trim();
  // login Password
  const loginPassword = document
    .querySelector("#section-login--password")
    .value.trim();
  // login Email
  const loginEmail = document
    .querySelector("#section-login--email")
    .value.trim();

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
