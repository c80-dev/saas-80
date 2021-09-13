//function that return getElement by ID
function _(x) {
  return document.getElementById(x);
}
const baseUrl = "https://saas80-laravel.herokuapp.com/api/v0.01";
const token = sessionStorage.getItem("token");

const subscriberProfileForm = _("subscriberProfileForm");
const nameField = _("name");
const numberField = _("phone");
const emailField = _("email");
const facebookField = _("facebook");
const twitterField = _("twitter");
const linkedinField = _("linkedin");
const statusField = _("status");
const activityField = _("activity");
const packageNameField = _("packageName");
const packagePriceField = _("packagePrice");
const packageDurationField = _("packageDuration");
let selectInputValue;
let subscriberId;

// the code is use to extract data from a query params
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

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
    if (request.status === 200) {
      const response = await request.json();
      const responseData = response.data;
      subscriberId = responseData.id;
      let responseName = responseData.user.name;
      let responsePhoneNumber = responseData.user.phone;
      let responseEmail = responseData.user.email;
      let responseFacebook = responseData.user.email;
      let responseTwitter = responseData.user.email;
      let responseLinkedin = responseData.user.email;
      let responsePackageName = responseData.plan.name;
      let responsePackagePrice = responseData.plan.cost;
      let responsepackageDuration = responseData.plan.duration;

      nameField.value = responseName;
      numberField.value = responsePhoneNumber;
      emailField.value = responseEmail;
      facebookField.value = responseFacebook;
      twitterField.value = responseTwitter;
      linkedinField.value = responseLinkedin;
      packageNameField.value = responsePackageName;
      packagePriceField.value = responsePackagePrice;
      packageDurationField.value = responsepackageDuration;
      selectInputValue = responseData.plan.id;
      getSubscribersPlan();
    }
  } catch (error) {
    console.log(error);
  }
};

getSubscribersProfile();

// This functionality takes a user to the edit profile page
const editSubscriberButton = _("editSubscriberButton");
editSubscriberButton.addEventListener("click", () => {
  window.location.replace(`editProfile.html?id=${id}`);
});

// This functionality fetches all the plans
const changePackagesDiv = _("changePackagesDiv");

const getSubscribersPlan = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    //This Api fetches the list of all plans
    const planRequest = await fetch(`${baseUrl}/plans`, config);
    const planResponse = await planRequest.json();
    const planResponseData = planResponse.data;
    planResponseData.map((planData) => {
      const option = document.createElement("option");
      option.value = planData.id;
      option.innerHTML = planData.name;
      changePackagesDiv.appendChild(option);
    });
    addValue();
  } catch (error) {
    console.log(error);
  }
};

function addValue() {
  changePackagesDiv.value = selectInputValue;
}

// trigger form submission to change plan
const modalForm = _("modalForm");
modalForm.addEventListener("click", async () => {
  let selectedPlan = changePackagesDiv.value;
  console.log(selectedPlan);
  console.log(subscriberId);

  // inserting signing message
  const signingMessage = _("signingMessage");
  signingMessage.innerHTML = ` <small>Changing Plan ...</small>`;
  const small = signingMessage.querySelector("small");
  small.style.display = "block";
  console.log(small);

  const config = {
    method: "patch",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      plan_id: selectedPlan,
    }),
  };
  const request = await fetch(
    `${baseUrl}/change-plans/${subscriberId}`,
    config
  );
  const response = await request.json();
  if (request.status == 200) {
    setTimeout(() => {
      selfClickedButton.click();
      window.location.reload();
    }, 2000);
    selfClickedButton.click();
    hideSigningMessage(small);
    modalNotifcation.style.display = "block";
    successAlertDiv.innerText = "Packages has been successfully changed";
  }
});

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

//removes signing message
function hideSigningMessage(input) {
  console.log(input);
  input.style.visibility = "hidden";
  input.classList.remove("signingMessage");
}
