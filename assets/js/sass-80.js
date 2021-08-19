const select = (name) => {
  return document.getElementById(name);
};

const url = "https://sass-80.herokuapp.com/analyse";

let column;
let id;

const uploadFile = () => {
  const input = select("file");
  const file = input.files[0];

  const fileName = select("fileName");
  const fileSize = select("fileSize");

  if (!file) {
    return;
  }

  const nxtBtn1 = select("nxtBtn1");
  nxtBtn1.classList.remove("hidden");

  const successDiv = select("fileUploadDiv");
  successDiv.classList.remove("hidden");

  fileName.innerText = file.name;
  fileSize.innerText = `${file.size / 1000} kb`;
};

const processFile = async () => {
  const input = select("file");
  const hasHeader = select("flexSwitchCheckDefault").checked;
  const file = input.files[0];

  if (!file) {
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("hasHeader", hasHeader);

  const request = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const response = await request.json();

  column = response.cols;
  id = response.transactionId;

  console.log(response);

  const tableHeader = select("basicTableHeader");
  const tableHeader2 = select("basicTableHeader2");
  const tableHeader3 = select("basicTableHeader3");

  const tableBody = select("basicHeaderBody");

  select(
    "card-title"
  ).innerHTML = `SHOWING ROW 1 - 100 OF ${response.rowCount}`;

  response.cols.map((item) => {
    const node = document.createElement("th");
    node.innerHTML = `<input class="tableHeaders" placeholder="COLUMN HEADER" type="text" value=${item.title}>`;
    // const textnode = document.createTextNode(item.title);
    // node.appendChild(textnode);

    tableHeader.appendChild(node);

    const options = ["String", "Number", "Date"];

    const selectDataType = document.createElement("select");
    selectDataType.className = "defaultType";
    selectDataType.innerHTML = options.map((item) => {
      return `<option value=${item}>${item}</option>`;
    });

    const node2 = document.createElement("th");
    node2.appendChild(selectDataType);

    tableHeader2.appendChild(node2);

    const node3 = document.createElement("th");
    node3.innerHTML = `<input type="text" class="tableDefaultType" placeholder="Default value">`;

    tableHeader3.appendChild(node3);
  });

  let tableBodyData = [];

  response.rows.map((item) => {
    const tableBodyRow = document.createElement("tr");
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

  const request = await fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cols: column,
    }),
  });

  const response = await request.json();
  console.log(response);
};
