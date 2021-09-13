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

const register = async (event) => {
  event.preventDefault();

  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const name = select("name").value;
  const email = select("email").value;
  const password = select("password").value;
  const phonenumber = select("phonenumber").value;

  if (!email.match(validEmail)) {
    select("invalid-email").innerText = "Please type in a valid email";
    return;
  }

  select("sign-in-btn").classList.add("hidden");
  select("sign-in-text").classList.remove("hidden");

  const user = {
    name,
    email,
    password,
  };

  if (phonenumber) {
    user.phonenumber = phonenumber;
  }

  console.log(user);

  const request = await fetch(`${url}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const response = await request.json();

  if (request.status !== 201) {
    select("error-message").classList.remove("hidden");
    select("error-message").innerText = response.error;
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

try {
  select("form-login").addEventListener("submit", function (event) {
    login(event);
  });
} catch (error) {
  console.log(error);
}

try {
  select("form-register").addEventListener("submit", function (event) {
    register(event);
  });
} catch (error) {
  console.log(error);
}
