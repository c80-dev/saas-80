//function that return getElement by ID
function _(x) {
  return document.getElementById(x);
}

const baseUrl = "https://saas80-laravel.herokuapp.com/api/v0.01";
const token = sessionStorage.getItem("token");

let adminId;

// try {
//   _("createPackageForm").addEventListener("submit", (e) => createAdmin(e));
// } catch (error) {
//   console.log(error);
// }

const createAdmin = async (e) => {
  console.log("here");
  e.preventDefault();

  // Declare Variables
  const name = _("name").value;
  const email = _("email").value;
  const phone = _("phonenumber").value;
  const password = _("password").value;
  const password_confirmation = _("confirm-password").value;

  // Check for empty variables
  const variables = [name, email, phone, password, password_confirmation];

  const check = variables.every((variable) => {
    return variable;
  });

  if (!check) return console.log("Please fill in every field");

  const request = await fetch(`${baseUrl}/create-account`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      password,
      password_confirmation,
    }),
  });

  const response = await request.json();

  console.log(response);
};

try {
  _("createAdminForm").addEventListener("submit", function (e) {
    createAdmin(e)
  })
} catch (error) {
  console.log(error);
}

const getUsers = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(`${baseUrl}/admins`, config);

    if (request.status === 401) {
      return window.location.replace("../../login.html");
    }

    const response = await request.json();
    const table = document.createElement("table");
    table.classList.add("table", "demo-table-search", "table-responsive-block");
    table.id = "tableWithSearch";
    table.innerHTML += `
    <thead>
      <tr>
        <th style="width: 10%" class="text-center">Edit </th>
        <th>Name</th>
        <th>Email</th>
        <th style="width: 5%" class="text-center">Delete</th>
      </tr>
    </thead>
    `;

    const tableBody = document.createElement("tbody");

    const responseArray = response.data;
    responseArray.forEach((data) => {
      // const admin = data.user;
      const name = data.name;
      const email = data.email;

      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td class="v-align-middle">
        <div>
        <a href="editAdmins.html?id=${data.id}" class="editSubcribers"> <span class="material-icons">
        edit
        </span></a>
        </div>
      </td>
        <td class="v-align-middle semi-bold" class="viewSubcribers">
          <p> <a href="editAdmins.html?id=${data.id}"> ${name}</a></p>
        </td>
        <td class="v-align-middle">
       ${email}
        </td>
        <td class="v-align-middle">
        <button class="deactivateButton" id="deactivate" onclick="deactivate(5)" btn btn-primary" data-toggle="modal" data-target="#deactivateModalCenter"><span class="material-icons">
        block
        </span></button>
      </td>`;
      tableBody.appendChild(tr);
    });

    table.appendChild(tableBody);

    _("table-container").appendChild(table);
  } catch (error) {
    console.log(error);
  }
};

getUsers();

const deactivate = (id) => {
  console.log(id);
  const deactivateModalMessage = _("deactivateModalMessage");
  deactivateModalMessage.innerHTML = `Do You Want To Deactivate This User`;
};

//This function runs when a user clicks the yes button to deactivate a user
const runDeactivateUser = async () => {
  const deactivateModalMessage = _("deactivateModalMessage");
  deactivateModalMessage.innerHTML = ` <small>Deactivating User ...</small>`;

  // inserting signing message
  const small = deactivateModalMessage.querySelector("small");
  small.style.visibility = "visible";
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const request = await fetch(
      `${baseUrl}/delete-user/${subsriberIdValue}`,
      config
    );

    const response = await request.json();
    const responseArray = response.data;
    if (request.status == 200) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      selfClickedButton2.click();
      hideSigningMessage(small);
      modalNotifcation.style.display = "block";
      successAlertDiv.innerText = "This subscriber has been deactivated";
    }
  } catch (error) {
    console.log(error);
  }
};
