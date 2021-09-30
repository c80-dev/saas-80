//function that return getElement by ID
function _(x) {
  return document.getElementById(x);
}



const baseUrl = "http://192.168.1.134:8000/api/v0.01";
const token = sessionStorage.getItem("token");

const editProfileForm = _("editProfileForm");
const nameField = _("name");
const numberField = _("phoneNumber");
const emailField = _("email");
const facebookField = _("facebook");
const twitterField = _("twitter");
const linkedinField = _("linkedin");
let changePackagesDiv = _("changePackagesDiv");
const displayBackendErrorMsg = _("displayBackendErrorMsg");
const modalForm = _("modalForm");
const logoInput = _("logoInput");
const imgContainer = _("imgContainer");
const cancelButton = _("cancelButton");
const hiddenButton = _("hiddenButton");
let logoLength;
let files;

// This is for the modal (packages)
const successAlertDiv = _("successAlertDiv");
const modalNotifcation = _("modalNotifcation");
const closeNotificationDiv = _("closeNotificationDiv");

// This functionality shows a preview of the photo
logoInput.onchange = function (evt) {
  var tgt = evt.target;
  files = tgt.files;
  logoLength = files.length;
  // console.log(files);
  // FileReader support
  if (FileReader && files && files.length) {
    var fr = new FileReader();
    fr.onload = function () {
      imgContainer.style.display = `block`;
      imgContainer.src = fr.result;
      console.log(logoInput.value);
    };
    fr.readAsDataURL(files[0]);
    hiddenButton.classList.remove("hiddenButton");
  }
};

// removes a photo
cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  logoInput.value = "";
  imgContainer.src = "";
  imgContainer.style.display = `none`;
  hiddenButton.classList.add("hiddenButton");
});

selectInputValue = "";
let userId = "";
let subscriberId;

// the code is use to extract data from a query params
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

//function to fetch the selected subscriber's Profile
const getAdminProfile = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    // This Api fetches the user profile
    const request = await fetch(`${baseUrl}/users/${id}`, config);
    if (request.status === 401) {
      return window.location.replace("../../login.html");
    }
    const response = await request.json();
    userId = response.data.id;

    // when the tokens expires it routes a user to the login page
    if (response.errors === "Route not found you need to login") {
      return window.location.replace("./login.html");
    }
    if (request.status === 200) {
      const responseData = response.data;
      imgContainer.src = responseData.image_path;
      imgContainer.style.display = "block";
      console.log(imgContainer);
      let responseName = responseData.name;
      let responsePhoneNumber = responseData.phone;
      let responseEmail = responseData.email;
      nameField.value = responseName;
      numberField.value = responsePhoneNumber;
      emailField.value = responseEmail;
      let responseFacebook = responseData.facebook;
      let responseTwitter = responseData.twitter;
      let responseLinkedin = responseData.linkedin;

      facebookField.value = responseFacebook;
      twitterField.value = responseTwitter;
      linkedinField.value = responseLinkedin;
    }
  } catch (error) {
    console.log(error);
  }
};
getAdminProfile();

// trigger form submission for edit subscribers profiles
editProfileForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  //get the input value of the form
  const nameFieldValue = nameField.value.trim();
  const numberFieldValue = numberField.value.trim();
  const emailFieldValue = emailField.value.trim();
  const facebookFieldValue = facebookField.value.trim();
  const twitterFieldValue = twitterField.value.trim();
  const linkedinFieldValue = linkedinField.value.trim();

  //inserting signing message
  const small = signingMessage.querySelector("small");
  small.style.display = "block";

  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: nameFieldValue,
      phone: numberFieldValue,
      email: emailFieldValue,
      twitter: twitterFieldValue,
      facebook: facebookFieldValue,
      linkedin: linkedinFieldValue,
    }),
  };

  try {
    const request = await fetch(`${baseUrl}/update-profile/${userId}`, config);

    let response = await request.json();
    console.log(request.status === 222);
    {
      small.innerText = `${response.message}`;
      small.style.color = `red`;
      small.style.textAlign = "start";
    }
    if (request.status === 200) {
      setTimeout(() => {
        closeNotificationDiv.click();
        return window.location.replace("./admins.html");
      }, 2000);
      hideSigningMessage(small);
      modalNotifcation.style.display = "block";
      modalNotifcation.innerText = `Profile Successfully updated`;
    }
  } catch (error) {
    console.log(error);
  }
});

//a function that inject a backend error to the front end
function setBackendError(input, message) {
  const small = input.querySelector("small");
  input.className = "displayBackendErrorMsg error";
  small.innerText = message;
}

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

const uploadButton = _("uploadButton");
const selectImage = _("selectImage");
const loadingImage = _("loadingImage");
uploadButton.addEventListener("click", async function (e) {
  e.preventDefault();
  console.log(loadingImage);
  hiddenButton.classList.add("hiddenButton");
  selectImage.classList.add("hiddenButton");
  loadingImage.innerText = `Uploading...`;
  try {
    const formData = new FormData();
    console.log(files[0]);
    formData.append("image_path", files[0]);
    console.log(formData);

    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const request = await fetch(`${baseUrl}/profile-image/${userId}`, config);
    if (request.status === 200) {
      loadingImage.innerText = ``;
      selectImage.classList.remove("hiddenButton");
      const response = await request.json();
      imgContainer.src = response.path;
    }
  } catch (error) {
    console.log(error);
  }
});
