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
const tableContainer = _("table-container");

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

    // returns the admin to the login page when the tokens expire
    if (response.status === "Token is Expired") {
      return window.location.replace("../../login.html");
    }

    // If the array is empty
    if (request.status === 404) {
      const noRecordFound = _("noRecordFound");
      noRecordFound.style.display = "grid";
      noRecordFound.innerHTML = `NO RECORD FOUND`;
    }

    //When there is a successful request
    if (request.status == 200) {
      const table = document.createElement("table");
      table.classList.add(
        "table",
        "demo-table-search",
        "table-responsive-block"
      );
      table.id = "tableWithSearch";
      table.innerHTML += `
    <thead>
      <tr>
        <th style="width: 10%">Ticket ID</th>
        <th style="width: 25%">Title</th>
        <th style="width: 30%">Body</th>
        <th style="width: 10%">Status</th>
      </tr>
    </thead>
    `;

      const tableBody = document.createElement("tbody");
      const responseArray = response.tickets;
      console.log(responseArray);
      responseArray.map((data) => {
        console.log(data);
        const status = data.status;
        const title = data.title;
        const body = data.body;
        const ticketID = data.ticketId;
        const ticketID2 = data._id;

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="v-align-middle semi-bold" class="viewSubcribers">
            <p> <a href="ticket_response.html?id=${ticketID}"> ${ticketID}</a></p>
          </td>
          <td class="v-align-middle">
          <p>${title}</p>
        </td>
          <td class="v-align-middle">
            <p>${body}</p>
          </td>
          <td class="v-align-middle">
            <p>${status}</p>
          </td`;
        tableBody.appendChild(tr);
      });
      table.appendChild(tableBody);
      tableContainer.appendChild(table);
    }
  } catch (error) {
    console.log(error);
  }
};

getTickets();
