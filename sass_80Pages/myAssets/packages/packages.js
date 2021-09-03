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

//function to fetch packages
const getPackages = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const request = await fetch(`${baseUrl}/plans`, config);
    const response = await request.json();
    const globalProperties = [];
    const globalValues = [];

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
        <th style="width: 10%">Name</th>
        <th style="width: 25%">Description</th>
        <th style="width: 10%">Duration</th>
        <th style="width: 10%">Cost</th>
        <th style="width: 10%">Subcribers</th>
        <th style="width: 10%">properties</th>
        <th style="width: 5%">Delete</th>
      </tr>
    </thead>
    `;
      const tableBody = document.createElement("tbody");
      const responseArray = response.data;

      responseArray.forEach((data) => {
        const name = data.name;
        const description = data.description;
        const duration = data.duration;
        const cost = data.cost;
        const subscribers = data.subscribers_count;
        let properties = data.properties;
        console.log(properties);

        // Convert property keys to an array
        // Push to a global variable
        globalProperties.push(Object.keys(properties));
        globalValues.push(Object.values(properties));

        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td class="v-align-middle">
          <div>
          <a href="editPackage.html?id=${data.id}" class="editProfile"> <span class="material-icons">
          edit
          </span></a>
          </div>
        </td>
          <td class="v-align-middle semi-bold" class="viewSubcribers">
            <p> <a href="subscriberProfile.html?id=${description}"> ${name}</a></p>
          </td>
          <td class="v-align-middle">
          <p>${description}</p>
        </td>
          <td class="v-align-middle">
            <p>${duration}</p>
          </td>
          <td class="v-align-middle">
            <p>${cost}</p>
          </td>
          <td class="v-align-middle">
          <p>${subscribers}</p>
        </td>
          <td class="v-align-middle append" id="append">
          </td>
          <td class="v-align-middle">
          <button class="deleteButton" onclick="deletePlan(${data.id})" btn btn-primary" data-toggle="modal" data-target="#deleteModalCenter"><span class="material-icons">
          delete
          </span></button>
        </td>`;
        tableBody.appendChild(tr);
      });
      table.appendChild(tableBody);
      tableContainer.appendChild(table);

      globalProperties.map((prop, index) => {
        const values = globalValues[index];
        // get all elements with class of append
        const rows = Array.from(document.getElementsByClassName("append"));
        const row = rows[index];

        prop.forEach((item, index) => {
          const p = document.createElement("p");
          if (values[index]) {
            p.innerHTML = `<span class="material-icons trueCheckSpan">
            check
            </span><span>${item}</span>`;
          } else {
            p.innerHTML = `<span class="material-icons falseClearSpan">
            clear
            </span><span>${item}</span>`;
          }
          row.appendChild(p);
        });
      });
    }
  } catch (error) {
    console.log(error);
  }

  console.log();
};
getPackages();

// This function is use to grab a plan Id
const deletePlan = async (getPlanId) => {
  planIdValue = getPlanId;
  deleteModalMessage.innerHTML = `Do You Want To Delete This Plan`;
};

//This function runs when a user clicks the no button to cancel delete plan
const cancelDeleteUser = async () => {
  selfClickedButton.click();
};

//This function runs when a user clicks the yes button to deactivate a user
const runDeleteUser = async () => {
  const deleteModalMessage = _("deleteModalMessage");
  deleteModalMessage.innerHTML = ` <small>Deleting Plan ...</small>`;

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
  console.log(planIdValue);
  try {
    console.log(planIdValue);
    const request = await fetch(`${baseUrl}/plans/${planIdValue}`, config);

    const response = await request.json();
    const responseArray = response.data;
    console.log(response);
    console.log(responseArray);
    if (request.status == 200) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      selfClickedButton.click();
      hideSigningMessage(small);
      modalNotifcation.style.display = "block";
      successAlertDiv.innerText = "This Plan has been deleted";
    }
  } catch (error) {
    console.log(error);
  }
};

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

//removes signing message
function hideSigningMessage(input) {
  console.log(input);
  input.style.visibility = "hidden";
  input.classList.remove("signingMessage");
}
