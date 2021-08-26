const select = (name) => {
  return document.getElementById(name);
};
const url = "https://sass-80.herokuapp.com";
// const url = "http://localhost:5000";

// Login Function
const login = async (event) => {
  event.preventDefault();

  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const email = select("email").value;
  const password = select("password").value;

  if (!email.match(validEmail)) {
    select("invalid-email").innerText = "Please type in a valid email";
    return;
  }

  select("sign-in-btn").classList.add("hidden");
  select("sign-in-text").classList.remove("hidden");

  const request = await fetch(`${url}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const response = await request.json();

  if (request.status === 400) {
    select("error-message").classList.remove("hidden");
    select("sign-in-btn").classList.remove("hidden");
    select("sign-in-text").classList.add("hidden");
    return;
  }

  const token = response.token;
  const userData = JSON.stringify(response);
  console.log(userData);

  sessionStorage.setItem("token", token);
  sessionStorage.setItem("data", userData);
  window.location.replace("/index.html");
};

// Logout Function
const logout = async () => {
  const token = sessionStorage.getItem("token");

  const request = await fetch(`${url}/users/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (request.status !== 200) {
    console.log("Error logging out");
    return;
  }

  sessionStorage.removeItem("token");
  window.location.replace("/login.html");
};

const register = async (event) => {};

select("form-login").addEventListener("submit", function (event) {
  login(event);
});
