//function that return getElement by ID
function selectProfileElement(x) {
  return document.getElementById(x);
}

const baseUrl = "http://192.168.1.134:8000/api/v0.01";
const token = sessionStorage.getItem("token");
const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

const userId = userProfile.id;

// This functinality invokes the edit Profile
selectProfileElement("password-form").addEventListener(
  "submit",
  function (event) {
    editProfile(event);
  }
);

const editProfile = async (event) => {
  event.preventDefault();
  const currentPassword = selectProfileElement(
    "current-profile-password"
  ).value;
  const profilePassword = selectProfileElement("new-profile-Password").value;
  const confirmProfilePassword = selectProfileElement(
    "confirm-profile-password"
  ).value;

  console.log(currentPassword, profilePassword, confirmProfilePassword);

  // remove hidden class from confirm password
  if (profilePassword && !confirmProfilePassword) {
    selectProfileElement("confirm-password").classList.remove("hidden");
    return;
  }

  if (profilePassword && profilePassword !== confirmProfilePassword) {
    selectProfileElement("error-message").classList.remove("hidden");
    selectProfileElement("error-message-text").innerText =
      "Passwords do not match";
    return;
  }

  selectProfileElement("error-message").classList.add("hidden");
  selectProfileElement("error-message-text").innerText = "";

  //inserting signing message
  const signingMessage = selectProfileElement("signingMessage");
  const small = signingMessage.querySelector("small");
  small.style.display = "block";

  const userObject = {
    old_password: currentPassword,
    password: profilePassword,
    password_confirmation: confirmProfilePassword,
  };

  const request = await fetch(`${baseUrl}/change-password/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  });
  console.log(request.status);
  if (request.status === 402) {
    selectProfileElement("error-message").classList.remove("hidden");
    selectProfileElement("error-message-text").innerText =
      "Current password do not match";
  }
  const response = await request.json();
  console.log(response);

  if (request.status === 200) {
    hideSigningMessage(small);
    selectProfileElement("success-message").classList.remove("hidden");
    setTimeout(() => {
      selectProfileElement("success-message").classList.add("hidden");
      window.location.reload();
    }, 3000);
  }
};

//removes updating profile message
function hideSigningMessage(input) {
  input.style.display = "none";
  input.classList.remove("signingMessage");
}

//logout function
const logoutUser = async () => {
  const config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      token,
    }),
  };
  try {
    const request = await fetch(`${baseUrl}/logout`, config);
    const response = await request.json();
    sessionStorage.clear();
    window.location.replace("./login.html");
  } catch (error) {
    console.log(error);
  }
};
