const validUserName = "admin";
const validPassword = "admin123";

const userNameInput = document.getElementById("input-userName");
const passwordInput = document.getElementById("input-password");

document.getElementById("sign-in-button").addEventListener("click", function () {
  if (userNameInput.value === validUserName && passwordInput.value === validPassword) {
    window.location.href = "dashboard.html";
  } else {
    userNameInput.value = "";
    passwordInput.value = "";
    document.getElementById("error-message").textContent = "Invalid credentials. Please try again.";
    document.getElementById("signInModal").showModal();
  }
});
