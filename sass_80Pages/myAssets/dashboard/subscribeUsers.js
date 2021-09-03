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
const modalForm = _("modalForm");
const changePackagesDiv = _("changePackagesDiv");
const deactivateModalMessage = _("deactivateModalMessage");
let selectInputValue;
let subsriberIdValue;

// This is for the modal (packages)
const successAlertDiv = _("successAlertDiv");
const modalNotifcation = _("modalNotifcation");
const selfClickedButton = _("selfClickedButton");
const closeNotificationDiv = _("closeNotificationDiv");
const selfClickedButton2 = _("selfClickedButton2");

//function to fetch subscribers
const getUsers = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const request = await fetch(`${baseUrl}/subscribers`, config);

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
        <th>Package</th>
        <th>Status</th>
        <th>Activity</th>
        <th style="width: 5%" class="text-center">Deactive Users</th>
      </tr>
    </thead>
    `;

    const tableBody = document.createElement("tbody");

    const responseArray = response.data;
    responseArray.forEach((data) => {
      const status = data.status;
      const subscribedUser = data.user;
      const name = subscribedUser.name;
      const email = subscribedUser.email;

      const plan = data.plan;
      const package = plan.name;
      selectInputValue = data.id;

      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td class="v-align-middle">
        <div>
        <a href="editProfile.html?id=${data.id}" class="editSubcribers"> <span class="material-icons">
        edit
        </span></a>
        </div>
      </td>
        <td class="v-align-middle semi-bold" class="viewSubcribers">
          <p> <a href="subscriberProfile.html?id=${data.id}"> ${name}</a></p>
        </td>
        <td class="v-align-middle">
       ${email}
        </td>
        <td class="v-align-middle">
          <p>${package}</p>
          <button type="button" onclick="setId(${data.id})" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
          change
        </button>

        </td>
        <td class="v-align-middle">
          <p>${status}</p>
        </td>
        <td class="v-align-middle">
          <p>${data.login_logs.created_at}</p>
        </td>
        <td class="v-align-middle">
        <button class="deactivateButton" onclick="deactivateUser(${data.id})" btn btn-primary" data-toggle="modal" data-target="#deactivateModalCenter"><span class="material-icons">
        block
        </span></button>
      </td>`;
      tableBody.appendChild(tr);
    });

    table.appendChild(tableBody);

    _("table-container").appendChild(table);

    const getSubscribersPlan = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        //This Api fetches the list of all plans
        const planRequest = await fetch(`${baseUrl}/plans`, config);
        const planResponse = await planRequest.json();
        const planResponseData = planResponse.data;
        planResponseData.map((planData) => {
          const option = document.createElement("option");
          option.value = planData.id;
          option.innerHTML = planData.name;
          changePackagesDiv.appendChild(option);
        });
        changePackagesDiv.value = selectInputValue;
      } catch (error) {
        console.log(error);
      }
    };

    getSubscribersPlan();
  } catch (error) {
    console.log(error);
  }
};

getUsers();

// This function grab the subscriber's id when a user clicked the change button
const setId = (getSubscriberId) => {
  subsriberIdValue = getSubscriberId;
  console.log(subsriberIdValue);
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

// trigger form submission to change plan
modalForm.addEventListener("click", async () => {
  let selectedPlan = changePackagesDiv.value;

  // inserting signing message
  const signingMessage = _("signingMessage");
  signingMessage.innerHTML = ` <small>Changing Plan ...</small>`;
  const small = signingMessage.querySelector("small");
  small.style.visibility = "visible";
  console.log(small);

  const config = {
    method: "patch",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      plan_id: selectedPlan,
    }),
  };
  const request = await fetch(
    `${baseUrl}/change-plans/${subsriberIdValue}`,
    config
  );
  const response = await request.json();
  if (request.status == 200) {
    setTimeout(() => {
      selfClickedButton.click();
      window.location.reload();
    }, 2000);
    selfClickedButton.click();
    hideSigningMessage(small);
    modalNotifcation.style.display = "block";
    successAlertDiv.innerText = "Packages has been successfully changed";
  }
});

// This function is use to deactivae a subscribed user
const deactivateUser = async (getSubscriberId) => {
  subsriberIdValue = getSubscriberId;
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
      `${baseUrl}/deactivate-subscribers/${subsriberIdValue}`,
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

//This function runs when a user clicks the no button to cancel dactivation
const cancelDeactivateUser = async () => {
  selfClickedButton2.click();
};

//removes signing message
function hideSigningMessage(input) {
  console.log(input);
  input.style.visibility = "hidden";
  input.classList.remove("signingMessage");
}
