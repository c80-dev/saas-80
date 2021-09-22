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
const baseUrl = "https://saas80-laravel.herokuapp.com/api/v0.01";
const token = sessionStorage.getItem("token");

const replyTicketForm = _("replyTicketForm");
const ticketID = _("ticketID");
const response = _("response");
const title = _("title");

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
      console.log(response);
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
