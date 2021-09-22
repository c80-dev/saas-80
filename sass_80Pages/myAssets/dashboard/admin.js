//function that return getElement by ID
function _(x) {
  return document.getElementById(x);
}

const baseUrl = "https://saas80-laravel.herokuapp.com/api/v0.01";
const token = sessionStorage.getItem("token");

let adminId;

const createAdmin = async (e) => {
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

  if (!check)
    return (_("signingMessage").innerHTML = "Please fill in all input fields");

  if (password !== password_confirmation) {
    _("signingMessage").innerHTML = "Passwords do not match";
    _("signingMessage").style.color = "red";
    return;
  }

  _("signingMessage").innerHTML = "Creating Account...";
  _("signingMessage").style.color = "green";

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
  if (request.status !== 200) {
    _("signingMessage").innerHTML = response.message;
    _("signingMessage").style.color = "red";
    return;
  }

  _("signingMessage").innerHTML = "";
  setTimeout(() => {
    return window.location.replace("../../admins.html");
  }, 2000);

  _("modalNotifcation").style.display = "block";
  _("modalNotifcation").innerText = `New Admin has been Successfully Created`;
};

try {
  _("createAdminForm").addEventListener("submit", function (e) {
    createAdmin(e);
  });
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
        <th>Role</th>
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

      // using tenary operator
      const roles = data.roles[0] ? data.roles[0].name : "Admin";

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
      ${roles}
         </td>
        <td class="v-align-middle">
        <button class="deactivateButton" id="deactivate" onclick="deactivate('${data.id}')" data-toggle="modal" data-target="#deactivateModalCenter"><span class="material-icons">
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
  adminId = id;
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
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const request = await fetch(`${baseUrl}/delete-user/${adminId}`, config);

    const response = await request.json();
    const responseArray = response.data;
    if (request.status == 200) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      selfClickedButton2.click();
      console.log(modalNotifcation);
      console.log(successAlertDiv);
      modalNotifcation.style.display = "block";
      successAlertDiv.innerText = "The User is Deactivated";
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
