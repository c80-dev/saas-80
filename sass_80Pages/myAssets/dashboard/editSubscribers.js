//function that return getElement by ID
function _(x) {
  return document.getElementById(x);
}
const baseUrl = "http://192.168.1.134:8000/api/v0.01";
const token = sessionStorage.getItem("token");

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