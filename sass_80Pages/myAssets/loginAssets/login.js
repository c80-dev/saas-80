function _(x) {
  return document.getElementById(x);
}
const baseUrl = "http://192.168.1.134:8000/api/v0.01";

const loginForm = _("loginForm");
const userEmail = _("userEmail");
const userPassword = _("userPassword");
const displayBackendErrorMsg = _("displayBackendErrorMsg");
const signingMessage = _("signingMessage");

//handle form submit
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  $(function () {
    $("#loginForm").validate();
  });

  //get the input value
  const userEmailValue = userEmail.value.trim();
  const userPasswordValue = userPassword.value.trim();

  // inserting signing message
  const small = signingMessage.querySelector("small");
  small.style.visibility = "visible";

  const response = await fetch(`${baseUrl}/login`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmailValue,
      password: userPasswordValue,
    }),
  });

  let data = await response.json();

  //validation for a failed response
  if (response.status === 401) {
    setBackendError(displayBackendErrorMsg, data.error);
    hideSigningMessage(small);
  }

  //validation for successful response
  if (response.status === 200) {
    const token = data.token.original.access_token;
    hideSigningMessage(small);
    hideErrorMessage(displayBackendErrorMsg);

    //save
    sessionStorage.setItem("token", token);
    window.location.replace("../index.html");
  }
});

//display backend error messsage to the frontend
function setBackendError(input, message) {
  const small = input.querySelector("small");
  input.className = "displayBackendErrorMsg error";
  small.innerText = message;
}

//removes signing message
function hideSigningMessage(input) {
  console.log(input);
  input.style.visibility = "hidden";
  input.classList.remove("signingMessage");
}

//removes backend error message
function hideErrorMessage(input) {
  const small = input.querySelector("small");
  small.innerText = "";
}
