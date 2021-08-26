const selectElement = (name) => {
  return document.getElementById(name);
};

const url_string = "https://sass-80.herokuapp.com";
// const url_string = "http://localhost:5000";

const token = sessionStorage.getItem("token");

const createTicket = async (event) => {
  event.preventDefault();

  const title = selectElement("project-title").value;
  const category = selectElement("category").value;
  const body = selectElement("ticket-body").value;

  if (!category)
    return (selectElement("error-message").innerText =
      "Please select a category");

  const request = await fetch(`${url_string}/tickets`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      category,
      body,
    }),
  });

  console.log(request);

  if (request.status !== 201) {
    return;
  }

  selectElement("project-title").value = "";
  selectElement("category").value = "";
  selectElement("ticket-body").value = "";

  selectElement("alert").classList.remove("slide");

  setTimeout(() => {
    selectElement("alert").classList.add("slide");
  }, 3000);
};

try {
  selectElement("ticket-form").addEventListener("submit", function (event) {
    createTicket(event);
  });
} catch (error) {
  console.log(error);
}

const fetchTickets = async () => {
  const request = await fetch(`${url_string}/tickets`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const response = await request.json();

  console.log(response);

  const tickets = response.tickets.reverse();

  const latestTicket = tickets.splice(0, 1)[0];

  selectElement("latest-ticket-title").innerText = latestTicket.title;
  selectElement("latest-ticket-status").innerText = latestTicket.status;
  selectElement("latest-ticket-body").innerText = latestTicket.body;

  console.log(latestTicket, tickets);

  tickets.map((item) => {
    console.log("hello");
    const innerHTML = `
    <div class="card card-default" data-pages="card">
                      <div class="card-header">
                        <div class="card-title">${item.status}</div>
                        <div class="card-controls">
                          <ul>
                            <li>
                              <a
                                href="#"
                                class="card-collapse"
                                data-toggle="collapse"
                                ><i class="card-icon card-icon-collapse"></i
                              ></a>
                            </li>
                            <li>
                              <a
                                href="#"
                                class="card-refresh"
                                data-toggle="refresh"
                                ><i class="card-icon card-icon-refresh"></i
                              ></a>
                            </li>
                            <li>
                              <a href="#" class="card-close" data-toggle="close"
                                ><i class="card-icon card-icon-close"></i
                              ></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="card-body">
                        <h3><span class="semi-bold">${item.title}</span></h3>
                        <p id="other-ticket-body">${item.body}
                        </p>
                      </div>
                    </div>
    `;

    selectElement("other-ticket").innerHTML += innerHTML;
  });
};

fetchTickets();
