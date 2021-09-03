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
const ticketsTable = _("ticketsTable");

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

//function to fetch all tickets
const getTickets = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(`${baseUrl}/tickets`, config);

    const response = await request.json();
    const responseArray = response.tickets;
    responseArray.forEach((data) => {
      const status = data.status;
      const title = data.title;
      const body = data.body;
      const ticketID = data.ticketId;
      console.log(data);
      ticketsTable.innerHTML = `  <tr>
          <td class="v-align-middle">
            <div>
            <a href="replyTicket.html?id=${data._id}"> <span class="material-icons">
            edit
            </span></a>
            </div>
          </td>
            <td class="v-align-middle semi-bold">
              <p>${ticketID}</p>
            </td>
            <td class="v-align-middle">
           ${title}
            </td>
            <td class="v-align-middle">
              <p>${body}</p>
            </td>
            <td class="v-align-middle">
              <p>${status}</p>
            </td>
          </tr>`;
    });
  } catch (error) {
    console.log(error);
  }
};

getTickets();
