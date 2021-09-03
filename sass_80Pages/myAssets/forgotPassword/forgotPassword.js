//function that return getElement by ID
function _(x) {
  return document.getElementById(x);
}
const baseUrl = "https://saas80-laravel.herokuapp.com/api/v0.01";
const forgotPasswordForm = _("forgotPasswordForm");
const userEmail = _("userEmail");
const displayBackendErrorMsg = _("displayBackendErrorMsg");
const successfulRequest = _("successfulRequest");
const hideInputField = _("hideInputField");
const resendForm = _("resendForm");
const sendForm = _("sendForm");
const signingMessage = _("signingMessage");
const changeEmailFunctionality = _("changeEmailFunctionality");
let emailValue;

forgotPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  $(function () {
    $("#forgotPasswordForm").validate();
  });

  //get the input value
  const userEmailValue = userEmail.value.trim();
  emailValue = userEmailValue;

  //inserting signing message
  const small = signingMessage.querySelector("small");
  small.style.display = "block";
  successfulRequest.style.display = "none";

  const config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmailValue,
    }),
  };
  const request = await fetch(`${baseUrl}/forgot-password`, config);
  console.log(request);
  let response = await request.json();
  console.log(response);

  //validation for a failed response
  if (request.status === 404) {
    setBackendError(displayBackendErrorMsg, response.message);
    hideSigningMessage(small);
  }

  //validation for successful response
  if (request.status === 200) {
    hideSigningMessage(small);
    hideErrorMessage(displayBackendErrorMsg);
    hideInputField.style.display = "none";
    successfulRequest.style.display = "block";
    successfulRequest.innerText = "Email Sent";
    resendForm.style.display = "block";
    sendForm.style.display = "none";
  }
});

function setBackendError(input, message) {
  const small = input.querySelector("small");
  input.className = "displayBackendErrorMsg error";
  small.innerText = message;
}

//removes signing message
function hideSigningMessage(input) {
  input.style.display = "none";
  input.classList.remove("signingMessage");
}

//removes backend error message
function hideErrorMessage(input) {
  const small = input.querySelector("small");
  small.innerText = "";
}

//A functionality that resend the form
const resendFormFunctionality = async () => {
  //inserting signing message
  const small = signingMessage.querySelector("small");
  small.style.display = "block";
  successfulRequest.style.display = "none";
  console.log(emailValue);

  const config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
    }),
  };
  const request = await fetch(`${baseUrl}/forgot-password`, config);
  let response = await request.json();

  console.log(response);
  console.log(request);

  //validation for a failed response
  if (request.status === 404) {
    setBackendError(displayBackendErrorMsg, response.message);
    hideSigningMessage(small);
  }

  //validation for successful response
  if (request.status === 200) {
    hideSigningMessage(small);
    hideErrorMessage(displayBackendErrorMsg);
    hideInputField.style.display = "none";
    resendForm.style.display = "block";
    sendForm.style.display = "none";
    successfulRequest.style.display = "block";
    successfulRequest.innerText = "Email Sent";
  }
};

//This functionality allows a user to change his/her email address
changeEmailFunctionality.addEventListener("click", () => {
  const small = signingMessage.querySelector("small");
  hideSigningMessage(small);
  hideErrorMessage(displayBackendErrorMsg);
  hideInputField.style.display = "block";
  resendForm.style.display = "none";
  sendForm.style.display = "block";
  successfulRequest.style.display = "none";
});
