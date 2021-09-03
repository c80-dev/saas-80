// a function that protect pages
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

const editPackageForm = _("editPackageForm");
const nameField = _("name");
const descriptionField = _("description");
const durationField = _("duration");
const costField = _("cost");
const signingMessage = _("signingMessage");
let globalProperties;

// This is for the modal (packages)
const successAlertDiv = _("successAlertDiv");
const modalNotifcation = _("modalNotifcation");
const closeNotificationDiv = _("closeNotificationDiv");

// the code is use to extract data from a query params
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

//function to fetch the selected Package Profile
const getPackageProfile = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    // This Api fetches the user profile
    const request = await fetch(`${baseUrl}/plans/${id}`, config);
    if (request.status === 401) {
      return window.location.replace("../../login.html");
    }

    if (request.status === 200) {
      const response = await request.json();
      const responseData = response.data;
      const properties = responseData.properties;
      let responseName = responseData.name;
      let responseDescription = responseData.description;
      let responseDuration = responseData.duration;
      let responseCost = responseData.cost;
      let numResponseDuration = parseInt(responseDuration);
      let numResponseCost = parseInt(responseCost);

      // inserting the values in the form field
      nameField.value = responseName;
      descriptionField.value = responseDescription;
      durationField.value = numResponseDuration;
      costField.value = numResponseCost;

      //set the value of the check box
      function setProperties(prop) {
        let value = _(prop);
        value.checked = properties[prop];
      }

      //convert the properties object into an array
      Object.keys(properties).forEach((key) => {
        setProperties(key);
      });
      globalProperties = properties;
    }
  } catch (error) {
    console.log(error);
  }
};

getPackageProfile();

// trigger form submission for edit subscribers profiles
editPackageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  $(function () {
    $("#editPackageForm").validate();
  });
  const nameFieldValue = nameField.value.trim();
  const descriptionFieldValue = descriptionField.value.trim();
  const durationFieldValue = durationField.value.trim();
  const costFieldValue = costField.value.trim();

  globalProperties;

  const newProperties = {};

  //convert the props object into an array and save it into the properties object
  Object.keys(globalProperties).forEach((key) => {
    let value = _(key);
    newProperties[key] = value.checked;
  });

  //inserting signing message
  const small = signingMessage.querySelector("small");
  small.style.display = "block";

  const config = {
    method: "patch",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: nameFieldValue,
      description: descriptionFieldValue,
      duration: durationFieldValue,
      cost: costFieldValue,
      properties: newProperties,
    }),
  };
  const request = await fetch(`${baseUrl}/plans/${id}`, config);
  if (request.status == 200) {
    setTimeout(() => {
      modalNotifcation.click();
      return window.location.replace("../../packages.html");
    }, 2000);
    hideSigningMessage(small);
    modalNotifcation.style.display = "block";
    modalNotifcation.innerText = `Plan has been Successfully Updated`;
  }
});

//removes updating profile message
function hideSigningMessage(input) {
  input.style.display = "none";
  input.classList.remove("signingMessage");
}
