//function that return getElement by ID
function selectProfileElement(x) {
  return document.getElementById(x);
}

const baseUrl = "http://192.168.1.134:8000/api/v0.01";
const token = sessionStorage.getItem("token");
const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

const imgContainer = document.getElementById("imgContainer");
imgContainer.src = `${userProfile.image_path}`;

document.title = `${userProfile.name} || C80 Pages`;
const userId = userProfile.id;
selectProfileElement("user-name").innerText = userProfile.name;

console.log(userProfile);

selectProfileElement("profile-name").placeholder = userProfile.name;
selectProfileElement("profile-email").placeholder = userProfile.email;
selectProfileElement("profile-phonenumber").placeholder =
  userProfile.phone || "";
selectProfileElement("profile-facebook").placeholder =
  userProfile.facebook || "";
selectProfileElement("profile-twitter").placeholder = userProfile.twitter || "";
selectProfileElement("profile-linkedin").placeholder =
  userProfile.linkedin || "";

const editProfile = async (event) => {
  event.preventDefault();
  const name = selectProfileElement("profile-name").value;
  const email = selectProfileElement("profile-email").value;
  const phonenumber = selectProfileElement("profile-phonenumber").value;
  const facebook = selectProfileElement("profile-facebook").value;
  const twitter = selectProfileElement("profile-twitter").value;
  const linkedin = selectProfileElement("profile-twitter").value;

  // remove hidden class from confirm password
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

  const userObject = {
    name: name || userProfile.name,
    email: email || userProfile.email,
  };

  // if the person enter an input field that is not required push it to the user object
  if (phonenumber) {
    userObject.phone = phonenumber;
  }
  if (facebook) {
    userObject.facebook = facebook;
  }
  if (twitter) {
    userObject.twitter = twitter;
  }
  if (linkedin) {
    userObject.linkedin = linkedin;
  }

  //inserting signing message
  const signingMessage = selectProfileElement("signingMessage");
  const small = signingMessage.querySelector("small");
  small.style.display = "block";

  const request = await fetch(`${baseUrl}/update-profile/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  });

  if (request.status === 200) {
    hideSigningMessage(small);
    selectProfileElement("success-message").classList.remove("hidden");
    const response = await request.json();
    const userProfile = JSON.stringify(response.user);
    sessionStorage.setItem("userProfile", userProfile);
    console.log(JSON.parse(sessionStorage.getItem("userProfile")));
    setTimeout(() => {
      selectProfileElement("success-message").classList.add("hidden");
      window.location.reload();
    }, 3000);
  }
};

// This functinality invokes the edit Profile
selectProfileElement("profile-form").addEventListener(
  "submit",
  function (event) {
    editProfile(event);
  }
);

const editProfileImage = async (event) => {
  // Show loading icon
  const icon = selectProfileElement("upload-icon");
  icon.classList.remove("text-success");
  icon.classList.add("text-warning");
  icon.innerHTML = "cloud";

  const file = event.target.files[0];
  console.log(file);

  const formData = new FormData();
  formData.append("image_path", file);
  try {
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const request = await fetch(`${baseUrl}/profile-image/${userId}`, config);
    const response = await request.json();
    if (request.status === 200) {
      imgContainer.src = ` ${response.path}`;
      icon.classList.add("text-success");
      icon.classList.remove("text-warning");
      icon.innerHTML = "camera";
      const userProfile = JSON.stringify(response.user);
      sessionStorage.setItem("userProfile", userProfile);
      console.log(JSON.parse(sessionStorage.getItem("userProfile")));
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};

// This functionality is use to upload an image
selectProfileElement("profile-image").addEventListener(
  "change",
  function (event) {
    editProfileImage(event);
  }
);

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
