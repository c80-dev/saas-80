function _(x) {
  return document.getElementById(x);
}
const baseUrl = "https://saas80-laravel.herokuapp.com/api/v0.01";

const resetPasswordForm = _("resetPasswordForm");
const userEmail = _("userEmail");
const userPassword = _("userPassword");
const displayBackendErrorMsg = _("displayBackendErrorMsg");
const signingMessage = _("signingMessage");
const firstPasswordInput = _("password1");
const secondPasswordInput = _("password2");

// This is for the modal (packages)
const successAlertDiv = _("successAlertDiv");
const modalNotifcation = _("modalNotifcation");
const selfClickedButton = _("selfClickedButton");
const closeNotificationDiv = _("closeNotificationDiv");

// the code is use to extract data from a query params
const params = new URLSearchParams(window.location.search);
const token = params.get("token");
console.log(token);

resetPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  $(function () {
    $("#resetPasswordForm").validate();
  });
  const firstPasswordInputValue = firstPasswordInput.value.trim();
  const secondPasswordInputValue = secondPasswordInput.value.trim();
  console.log(firstPasswordInputValue, secondPasswordInputValue);

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
      password: firstPasswordInputValue,
      password_confirmation: secondPasswordInputValue,
      token: token,
    }),
  };

  const request = await fetch(`${baseUrl}/reset-password`, config);
  console.log(request);
  let response = await request.json();
  console.log(response);

  if (request.status === 422) {
    setBackendError(displayBackendErrorMsg, response.message);
    hideSigningMessage(small);
  }
  if (request.status === 200) {
    hideErrorMessage(displayBackendErrorMsg);
    hideSigningMessage(small);
    setTimeout(() => {
      window.location.replace("../login.html");
    }, 2000);
    hideErrorMessage(displayBackendErrorMsg);
    modalNotifcation.style.display = "block";
    successAlertDiv.innerText = "Password reset successfully";
  }
});

//a function that inject a backend error to the front end
function setBackendError(input, message) {
  const small = input.querySelector("small");
  input.className = "displayBackendErrorMsg error";
  small.innerText = message;
  console.log(small);
}

//removes updating profile message
function hideSigningMessage(input) {
  input.style.display = "none";
  input.classList.remove("signingMessage");
}

//removes backend error message
function hideErrorMessage(input) {
  const small = input.querySelector("small");
  small.innerText = "";
}
