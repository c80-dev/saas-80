//function that return getElement by ID
function _(x) {
  return document.getElementById(x);
}

// a function that protect pages
function authenticateUser() {
  let token = sessionStorage.getItem("token");
  if (!token) {
    window.location.replace("./login.html");
  }
}
const baseUrl = "http://192.168.1.134:8000/api/v0.01";
const token = sessionStorage.getItem("token");

const replyTicketForm = _("replyTicketForm");
const ticketID = _("ticketID");
const responseField = _("response");
const title = _("title");
const signingMessage = _("signingMessage");

// This is for the modal (packages)
const successAlertDiv = _("successAlertDiv");
const modalNotifcation = _("modalNotifcation");
const closeNotificationDiv = _("closeNotificationDiv");

// the code is use to extract data from a query params
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id);

//function to fetch the selected subscriber's Profile
const getTicketProfile = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const request = await fetch(`${baseUrl}/tickets/${id}`, config);
    if (request.status === 401) {
      return window.location.replace("../../login.html");
    }
    if (request.status === 200) {
      const response = await request.json();
      responseData = response.ticket;
      const ticketId = responseData.ticketId;
      const ticketTitle = responseData.title;
      ticketID.value = ticketId;
      title.value = ticketTitle ? ticketTitle : "General Issue";
    }
  } catch (error) {
    console.log(error);
  }
};

getTicketProfile();

replyTicketForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const responseFieldValue = responseField.value.trim();
  console.log(responseFieldValue);
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
      response: responseFieldValue,
    }),
  };
  const request = await fetch(`${baseUrl}/tickets/${id}`, config);
  if (request.status == 200) {
    setTimeout(() => {
      modalNotifcation.click();
      return window.location.replace("../../tickets.html");
    }, 2000);
    hideSigningMessage(small);
    modalNotifcation.style.display = "block";
    modalNotifcation.innerText = `Response is successful`;
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

//removes updating profile message
function hideSigningMessage(input) {
  input.style.display = "none";
  input.classList.remove("signingMessage");
}
