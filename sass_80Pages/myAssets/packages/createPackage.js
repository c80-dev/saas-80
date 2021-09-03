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

const createPackageForm = _("createPackageForm");
const nameField = _("name");
const descriptionField = _("description");
const durationField = _("duration");
const costField = _("cost");

// trigger form submission for edit subscribers profiles
createPackageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  $(function () {
    $("#createPackageForm").validate();
  });
  const nameFieldValue = nameField.value.trim();
  const descriptionFieldValue = descriptionField.value.trim();
  const durationFieldValue = durationField.value.trim();
  const costFieldValue = costField.value.trim();

  const checkboxProperties = {
    email: "",
    sms: "",
    ticket: "",
    invoices: "",
    event: "",
  };

  const newProperties = {};

  Object.keys(checkboxProperties).forEach((checkbox) => {
    let value = _(checkbox);
    newProperties[checkbox] = value.checked;
  });

  console.log(newProperties);
  console.log(
    nameFieldValue,
    descriptionFieldValue,
    durationFieldValue,
    costFieldValue
  );
  //inserting signing message
  const small = signingMessage.querySelector("small");
  small.style.display = "block";

  const config = {
    method: "post",
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
  const request = await fetch(`${baseUrl}/plans`, config);
  if (request.status == 200) {
    setTimeout(() => {
      modalNotifcation.click();
      return window.location.replace("../../packages.html");
    }, 2000);
    hideSigningMessage(small);
    modalNotifcation.style.display = "block";
    modalNotifcation.innerText = `Plan has been Successfully Created`;
  } else {
    return window.location.replace("../../login.html");
  }
});

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
