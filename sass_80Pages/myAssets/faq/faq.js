//function that return getElement by ID
function _(x) {
  return document.getElementById(x);
}

const baseUrl = "https://saas80-laravel.herokuapp.com/api/v0.01";
const token = sessionStorage.getItem("token");
const tableContainer = _("table-container");
let faqIdValue;

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

    // when there are no FAQ records
    if (response.message === `Sorry no faq found`) {
      const noRecordFound = _("noRecordFound");
      noRecordFound.style.display = "grid";
      noRecordFound.innerHTML = `NO RECORD FOUND`;
    }

    //when there is a successful request and existing records
    if (request.status == 200) {
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
        <th style="width: 5%">DELETE</th>
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
            <p>${id}</a></p>
          </td>
          <td class="v-align-middle">
        <p>${title}</p>
        </td>
          <td class="v-align-middle">
            <p>${category}</p>
          </td>
          <td class="v-align-middle">
          <p>${description}</p>
        </td>
          <td class="v-align-middle">
          <button class="deleteButton" onclick="deleteFaq(${id})" btn btn-primary" data-toggle="modal" data-target="#deleteModalCenter"><span class="material-icons">
          delete
          </span></button>
        </td>`;
        tableBody.appendChild(tr);
      });
      table.appendChild(tableBody);
      tableContainer.appendChild(table);
    }
  } catch (error) {
    console.log(error);
  }
};

getFAQs();

// This function is use to grab a plan Id
const deleteFaq = async (getFaqId) => {
  faqIdValue = getFaqId;
  deleteModalMessage.innerHTML = `Do You Want To Delete This FAQ`;
};

//This function runs when a user clicks the delete button to delete a plan
const runDeleteFaq = async () => {
  const deleteModalMessage = _("deleteModalMessage");
  deleteModalMessage.innerHTML = ` <small>Deleting FAQ ...</small>`;

  // inserting deleting message
  const small = deleteModalMessage.querySelector("small");
  small.style.visibility = "visible";

  const config = {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const request = await fetch(`${baseUrl}/faqs/${faqIdValue}`, config);

    const response = await request.json();
    const responseArray = response.data;
    console.log(response);
    if (request.status == 200) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      selfClickedButton.click();
      hideSigningMessage(small);
      modalNotifcation.style.display = "block";
      successAlertDiv.innerText = "This FAQ has been deleted";
    }
  } catch (error) {
    console.log(error);
  }
};

//logout functionality
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

//removes signing message
function hideSigningMessage(input) {
  console.log(input);
  input.style.visibility = "hidden";
  input.classList.remove("signingMessage");
}
