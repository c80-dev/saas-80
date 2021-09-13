const selectTableElement = (name) => {
  return document.getElementById(name);
};

// API table_url
// const table_url = "http://localhost:5000/analyse";
const table_url = "https://sass-80.herokuapp.com/analyse";

let column;
let id;

const uploadFile = () => {
  const file = selectTableElement("file").files[0],
    fileName = selectTableElement("fileName"),
    fileSize = selectTableElement("fileSize");

  if (!file) {
    return;
  }

  selectTableElement("nxtBtn1").classList.remove("hidden");
  selectTableElement("fileUploadDiv").classList.remove("hidden");

  fileName.innerText = file.name;
  fileSize.innerText = `${file.size / 1000} kb`;
};

// Process File Function
const processFile = async () => {
  const file = selectTableElement("file").files[0];
  const hasHeader = selectTableElement("flexSwitchCheckDefault").checked;

  if (!file) {
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("hasHeader", hasHeader);

  const request = await fetch(table_url, {
    method: "POST",
    body: formData,
  });

  const response = await request.json();

  column = response.cols;
  id = response.transactionId;

  console.log(response);

  // Fetch table headers
  const tableHeader = selectTableElement("basicTableHeader");
  const tableHeader2 = selectTableElement("basicTableHeader2");
  const tableHeader3 = selectTableElement("basicTableHeader3");

  // Fetch table body
  const tableBody = selectTableElement("basicHeaderBody");

  selectTableElement(
    "card-title"
  ).innerHTML = `SHOWING ROW 1 - ${response.rowCount} OF ${response.rowCount}`;

  response.cols.map((item) => {
    /* Get input items for first header row */
    const node = document.createElement("th");
    node.innerHTML = `<input class="tableHeaders" placeholder="COLUMN HEADER" type="text" value=${item.title}>`;

    tableHeader.appendChild(node);
    /* ************ */

    /* Get input items for second header row */

    // Create options for default column type
    const options = ["Text", "Number", "Date"];

    // Create selectTableElement dropdowns for default column types
    const selectTableElementDataType = document.createElement("select");
    selectTableElementDataType.className = "defaultType";
    selectTableElementDataType.innerHTML = options.map((item) => {
      return `<option value=${item}>${item}</option>`;
    });

    const node2 = document.createElement("th");
    node2.appendChild(selectTableElementDataType);

    tableHeader2.appendChild(node2);
    /* ************ */

    /* Get input items for second header row */
    const node3 = document.createElement("th");
    node3.innerHTML = `<input type="text" class="tableDefaultType" placeholder="Default value">`;

    tableHeader3.appendChild(node3);
    /* ************ */
  });

  let tableBodyData = [];

  response.rows.map((item) => {
    const tableBodyRow = document.createElement("tr");

    // Set the object item to an array with it's values
    const rows = Object.values(item);

    rows.map((element) => {
      const td = document.createElement("td");
      const textnode = document.createTextNode(element);
      td.appendChild(textnode);

      tableBodyRow.appendChild(td);
    });

    tableBodyData.push(tableBodyRow);
  });

  tableBodyData.forEach((item) => {
    tableBody.appendChild(item);
  });
};

const saveEditedData = async () => {
  const headersList = [];
  const typeList = [];
  const defaultValues = [];

  const headers = Array.from(document.getElementsByClassName("tableHeaders"));
  const types = Array.from(document.getElementsByClassName("defaultType"));
  const defaults = Array.from(
    document.getElementsByClassName("tableDefaultType")
  );

  for (let i = 0; i < headers.length; i++) {
    headersList.push(headers[i].value);
    typeList.push(types[i].value);
    defaultValues.push(defaults[i].value);
  }

  column.forEach((item, index) => {
    item.title = headersList[index];
    item.dataType = typeList[index];
    item.default = defaultValues[index];
  });

  const request = await fetch(`${table_url}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cols: column,
    }),
  });

  const response = await request.json();
  console.log(response);
};
