//function that return getElement by ID
function _(x) {
  return document.getElementById(x);
}

const baseUrl = "http://192.168.1.134:8000/api/v0.01";
const token = sessionStorage.getItem("token");
const tableContainer = _("table-container");
let planIdValue;

// This is for the modal (packages)
const successAlertDiv = _("successAlertDiv");
const modalNotifcation = _("modalNotifcation");
const selfClickedButton = _("selfClickedButton");

// the code is use to extract data from a query params
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

//function to fetch packages
const getPackagesSubscribers = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const request = await fetch(`${baseUrl}/plan-subscribers/${id}`, config);
    const response = await request.json();
    const responseData = response.data;

    // returns the admin to the login page when the tokens expire
    if (response.status === "Token is Expired") {
      return window.location.replace("../../login.html");
    }
    if (request.status === 404) {
      const noRecordFound = _("noRecordFound");
      noRecordFound.style.display = "grid";
      noRecordFound.innerHTML = `NO RECORD FOUND`;
    }

    if (request.status == 200) {
      if (responseData.length === 0) {
        const noRecordFound = _("noRecordFound");
        noRecordFound.style.display = "grid";
        noRecordFound.innerHTML = `NO RECORD FOUND`;
      }

      if (responseData.length) {
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
            <th style="width: 25%">Name</th>
            <th style="width: 25%">Subscribers</th>
            <th style="width: 25%">Status</th>
          </tr>
        </thead>
        `;
        const tableBody = document.createElement("tbody");
        const responseArray = response.data;
        console.log(responseArray);

        responseArray.forEach((data) => {
          // const name = data.name;
          const packageID = data.id;
          const status = data.status;
          const subscribers = data.user.name;
          const tr = document.createElement("tr");
          // <div>
          // <a href="editPackage.html?id=${data.id}" class="editProfile"> <span class="material-icons">
          // edit
          // </span></a>
          // </div>
          tr.innerHTML = `
              <td class="v-align-middle">
              <p>${packageID}</p>
            </td>
            <td class="v-align-middle semi-bold" class="viewSubcribers">
            <p> <a href="subscriberProfile.html?id=${packageID}"> ${subscribers}</a></p>
          </td>
              <td class="v-align-middle">
                <p>${status}</p>
              </td>`;
          tableBody.appendChild(tr);
        });
        table.appendChild(tableBody);
        tableContainer.appendChild(table);
      }
    }
  } catch (error) {
    console.log(error);
  }

  console.log();
};
getPackagesSubscribers();
