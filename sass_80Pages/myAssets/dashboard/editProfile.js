// this function checks if a user is authenticated
function authenticateUser() {
  let token = sessionStorage.getItem("token");
  if (!token) {
    window.location.replace("./login.html");
  }
}

//a fuction that calls the authentictaed users function
window.onload = function () {
  authenticateUser();
};

//function that return getElement by ID
function _(x) {
  return document.getElementById(x);
}

const baseUrl = "https://saas80-laravel.herokuapp.com/api/v0.01";
const token = sessionStorage.getItem("token");
const editProfileForm = _("editProfileForm");
const nameField = _("name");
const numberField = _("phoneNumber");
const emailField = _("email");
let changePackagesDiv = _("changePackagesDiv");
const displayBackendErrorMsg = _("displayBackendErrorMsg");
const modalForm = _("modalForm");
selectInputValue = "";
let userId = "";
let subscriberId;

// This is for the modal (packages)
const successAlertDiv = _("successAlertDiv");
const modalNotifcation = _("modalNotifcation");
const selfClickedButton = _("selfClickedButton");
const closeNotificationDiv = _("closeNotificationDiv");

// the code is use to extract data from a query params
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

//function to fetch the selected subscriber's Profile
const getSubscribersProfile = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    // This Api fetches the user profile
    const request = await fetch(`${baseUrl}/subscribers/${id}`, config);
    if (request.status === 401) {
      return window.location.replace("../../login.html");
    }
    const response = await request.json();
    subscriberId = response.data.id;
    userId = response.data.user.id;

    // when the tokens expires it routes a user to the login page
    if (response.errors === "Route not found you need to login") {
      return window.location.replace("./login.html");
    }
    if (request.status === 200) {
      const responseData = response.data;
      let responseName = responseData.user.name;
      let responsePhoneNumber = responseData.user.phone;
      let responseEmail = responseData.user.email;
      nameField.value = responseName;
      numberField.value = responsePhoneNumber;
      emailField.value = responseEmail;

      selectInputValue = responseData.plan.id;
    }

    changePackagesDiv.value = selectInputValue;
  } catch (error) {
    console.log(error);
  }
};
getSubscribersProfile();

// trigger form submission for edit subscribers profiles
editProfileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  $(function () {
    $("#editProfileForm").validate();
  });

  //get the input value of the form
  const nameFieldValue = nameField.value.trim();
  const numberFieldValue = numberField.value.trim();

  //inserting signing message
  const small = signingMessage.querySelector("small");
  small.style.display = "block";
  // successfulRequest.style.display = "none";

  const config = {
    method: "patch",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: nameFieldValue,
      phone: numberFieldValue,
    }),
  };

  const request = await fetch(`${baseUrl}/update-profile/${userId}`, config);
  let response = await request.json();
  if (response.status === 200) {
    hideSigningMessage(small);
    successfulRequest.style.display = "block";
    successfulRequest.innerText = `Profile Successfully updated`;
    return window.location.replace("./subscribeUsers.html");
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
