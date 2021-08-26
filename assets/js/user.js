const selectUserElement = (name) => {
  return document.getElementById(name);
};

const data = JSON.parse(sessionStorage.getItem("data"));

selectUserElement("username").innerText = data.user.name;
