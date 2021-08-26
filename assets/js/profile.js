const selectProfileElement = (name) => {
  return document.getElementById(name);
};

// const profile_url = "http://localhost:5000/users/me";
const profile_url = "https://sass-80.herokuapp.com/users/me";

const profileData = JSON.parse(sessionStorage.getItem("data"));

selectProfileElement("user-name").innerText = profileData.user.name;

selectProfileElement("profile-name").placeholder = profileData.user.name;
selectProfileElement("profile-email").placeholder = profileData.user.email;
selectProfileElement("profile-phonenumber").placeholder =
  profileData.user.phonenumber || "";

const editProfile = async (event) => {
  event.preventDefault();

  const name = selectProfileElement("profile-name").value;
  const email = selectProfileElement("profile-email").value;
  const phonenumber = selectProfileElement("profile-phonenumber").value;
  const password = selectProfileElement("profile-password").value;
  const confirmPassword = selectProfileElement(
    "confirm-profile-password"
  ).value;

  if (password && !confirmPassword) {
    selectProfileElement("confirm-password").classList.remove("hidden");
    return;
  }

  if (password && password !== confirmPassword) {
    selectProfileElement("error-message").classList.remove("hidden");
    selectProfileElement("error-message-text").innerText =
      "Passwords do not match";
    return;
  }

  const token = sessionStorage.getItem("token");

  const userObject = {
    name: name || profileData.user.name,
    email: email || profileData.user.email,
  };

  if (phonenumber) {
    userObject.phonenumber = phonenumber;
  }

  if (password) {
    userObject.password = password;
  }

  const request = await fetch(profile_url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  });

  if (request.status === 200) {
    selectProfileElement("success-message").classList.remove("hidden");
  }

  setTimeout(() => {
    selectProfileElement("success-message").classList.add("hidden");
  }, 3000);

  const response = await request.json();

  console.log(response);
};

selectProfileElement("profile-form").addEventListener(
  "submit",
  function (event) {
    editProfile(event);
  }
);

selectProfileElement("profile-image").addEventListener(
  "change",
  function (event) {
    const file = event.target.files[0];
    console.log(file);
  }
);
