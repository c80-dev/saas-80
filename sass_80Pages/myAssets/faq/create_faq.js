//function that return getElement by ID
function _(x) {
  return document.getElementById(x);
}

const baseUrl = "http://192.168.1.134:8000/api/v0.01";
const token = sessionStorage.getItem("token");

const createFaqForm = _("createFaqForm");
const changeCategoriesDiv = _("changeCategoriesDiv");
const tableContainer = _("table-container");
let categoryIdValue;

const getCategories = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    //This Api fetches the list of all  categories
    const categoriesRequest = await fetch(`${baseUrl}/categories`, config);
    const categoriesResponse = await categoriesRequest.json();

    //redirect a user to the login page when the tokens expires
    if (categoriesResponse.status === `Token is Expired`) {
      return window.location.replace("../../login.html");
    }

    //create a table for the category Modal
    const table = document.createElement("table");
    table.classList.add("table");
    table.id = "table-container";

    // The table head is created below
    table.innerHTML = `
    <thead>
    <th scope="col" class="numberColumn">#</th>
    <th scope="col">FAQ CATEGORY NAME</th>
    <th scope="col">ACTION</th>
    </thead>
`;
    const tableBody = document.createElement("tbody");

    //inject the list of categories as a drop down in the input field
    if (categoriesRequest.status === 200) {
      const categoriesData = categoriesResponse.data;
      categoriesData.map((category, index) => {
        const option = document.createElement("option");

        option.value = category.id;
        option.innerHTML = category.name;
        changeCategoriesDiv.appendChild(option);

        const count = index + 1;
        const name = category.name;
        const categoryId = category.id;

        // The table body is created below
        const tr = document.createElement("tr");
        tr.innerHTML = ` <td scope="row" class="numberCount">${count}</td>
        <td>${name}</td>
        <td> <button type="button" class="btn btn-primary delCatButton" id="delCatButton" onclick="setId(${categoryId})">Remove</button></td> `;
        tableBody.appendChild(tr);
      });

      //   The table body is injected to the table and a
      table.appendChild(tableBody);
      tableContainer.appendChild(table);

      const delCatButton = _("delCatButton");
    }
  } catch (error) {
    console.log(error);
  }
};

getCategories();

const modalNotifcation2 = _("modalNotifcation2");
const customModalMessage = _("customModalMessage");
const successAlertDiv2 = _("successAlertDiv2");
const selfClickedModalButton = _("selfClickedModalButton");
const small = customModalMessage.querySelector("small");

// This function grab the subscriber's id when a user clicked the remove button
const setId = async (categoryId) => {
  categoryIdValue = categoryId;
  console.log(categoryIdValue);
  addLoadingMessage(small);

  const config = {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  //   This functionality deletes a category
  const request = await fetch(
    `${baseUrl}/categories/${categoryIdValue}`,
    config
  );
  // If the user token has expired
  if (request.status == 401) {
    return window.location.replace("../../login.html");
  }

  // when delete categories
  if (request.status == 400) {
    setTimeout(() => {
      selfClickedModalButton.click();
      window.location.reload();
    }, 2000);
    hideLoadingMessage(small);
    modalNotifcation2.style.display = "block";
    successAlertDiv2.innerText = "Fail to Delete";
  }

  //   when the request is successful
  if (request.status == 200) {
    setTimeout(() => {
      selfClickedModalButton.click();
      window.location.reload();
    }, 2000);
    hideLoadingMessage(small);
    modalNotifcation2.style.display = "block";
    successAlertDiv2.innerText = "This Category Has Been Removed";
  }
  console.log(request.status);
  if (request.status == 400) {
    hideLoadingMessage(small);
    modalNotifcation2.style.display = "block";
    successAlertDiv2.innerText = "Unable to  Removed Category";
  }
};

// This functionality is use to create new categories
const addNewCategories = _("addNewCategories");
const categoryName = _("categoryName");
addNewCategories.addEventListener("click", async () => {
  const categoryNameField = categoryName.value.trim();
  small.innerText = `Creating...`;
  addLoadingMessage(small);

  //   These code runs only when the input contains a value
  if (categoryNameField) {
    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: categoryNameField,
      }),
    };
    //   This functionality create a category
    const request = await fetch(`${baseUrl}/categories`, config);

    // If the user token has expired
    if (request.status == 401) {
      return window.location.replace("../../login.html");
    }

    //   when the request is successful
    if (request.status == 200) {
      setTimeout(() => {
        selfClickedModalButton.click();
        window.location.reload();
      }, 2000);
      hideLoadingMessage(small);
      modalNotifcation2.style.display = "block";
      successAlertDiv2.innerText = "New Category Has Been Added";
    }
  }
});

const titleField = _("title");
const descriptionField = _("description");

const modalNotifcation = _("modalNotifcation");
const successAlertDiv = _("successAlertDiv");
const signingMessage = _("signingMessage");

// This fuctionality is use to create new FAQ
createFaqForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  $(function () {
    $("#createFaqForm").validate();
  });
  const small = signingMessage.querySelector("small");
  small.style.display = `block`;
  const titleFieldValue = titleField.value.trim();
  const descriptionFieldValue = descriptionField.value.trim();

  const changeCategoriesDivValue = changeCategoriesDiv.value;

  const config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: titleFieldValue,
      category_id: changeCategoriesDivValue,
      description: descriptionFieldValue,
    }),
  };

  try {
    const request = await fetch(`${baseUrl}/faqs`, config);
    if (request.status == 200) {
      setTimeout(() => {
        return window.location.replace("../../faq.html");
      }, 2000);
      hideSigningMessage(small);
      modalNotifcation.style.display = "block";
      modalNotifcation.innerText = `Plan has been Successfully Created`;
    }
  } catch (error) {
    console.log(error);
  }
});

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

//removes signing message
function hideLoadingMessage(input) {
  input.style.display = "none";
  input.classList.remove("customModalMessage");
}

function addLoadingMessage(input) {
  input.style.display = "block";
  input.classList.add("customModalMessage");
}
