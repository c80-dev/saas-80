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
const tableContainer = _("table-container");
let planIdValue;

// This is for the modal (packages)
const successAlertDiv = _("successAlertDiv");
const modalNotifcation = _("modalNotifcation");
const selfClickedButton = _("selfClickedButton");

//function to fetch faq
const getFAQs = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const request = await fetch(`${baseUrl}/faqs`, config);
    const response = await request.json();
    console.log(response);
    if (response.message === `Sorry no faq found`) {
      const noRecordFound = _("noRecordFound");
      noRecordFound.style.display = "grid";
      noRecordFound.innerHTML = `NO RECORD FOUND`;
    }
    console.log(request.status);
    if (request.status == 200) {
      const response = await request.json();
      noRecordFound.style.display = "none";

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
      <th style="width: 5%">Edit</th>
      <th style="width: 5%">ID</th>
        <th style="width: 10%">TITLE</th>
        <th style="width: 10%">CATEGORY</th>
        <th style="width: 30%">DESCRIPTION</th>
        <th style="width: 5%">ACTION</th>
      </tr>
    </thead>
    `;
      const tableBody = document.createElement("tbody");
      const responseArray = response.data;
      responseArray.forEach((data) => {
        const id = data.id;
        const description = data.description;
        const title = data.title;
        const category = data.category.name;
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td class="v-align-middle">
          <div>
          <a href="edit_faq.html?id=${id}" class="editFAQ"> <span class="material-icons">
          edit
          </span></a>
          </div>
        </td>
          <td class="v-align-middle semi-bold" class="viewSubcribers">
            <p> <a href="subscriberProfile.html?id=${description}"> ${id}</a></p>
          </td>
          <td class="v-align-middle">
        const title = data.title;
        <p>${title}</p>
        </td>
          <td class="v-align-middle">
            <p>${category}</p>
          </td>
          <td class="v-align-middle append" id="append">
          </td>
          <td class="v-align-middle">
          <button class="deleteButton" onclick="deleteFaq(${data.id})" btn btn-primary" data-toggle="modal" data-target="#deleteModalCenter"><span class="material-icons">
          delete
          </span></button>
        </td>`;
        tableBody.appendChild(tr);
      });
      table.appendChild(tableBody);
      console.log(table);
      tableContainer.appendChild(table);
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

getFAQs();

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
