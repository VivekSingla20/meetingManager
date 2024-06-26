let profilePic = document.getElementById("profile_pic");
let inputImage = document.getElementById("input_image");
inputImage.onchange = function () {
  profilePic.src = URL.createObjectURL(inputImage.files[0]);
};

const getUserDetails = async () => {
  try {
    const response = await fetch("http://localhost:8080/getUserDetails");
    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }
    const data = await response.json();
    console.log(data);
    let name = document.getElementById("name");
    name.textContent = data[0].firstName + " " + data[0].lastName;
    let email = document.getElementById("email");
    email.textContent = data[0].memberGmail;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};
function backBtn() {
  fetch("http://localhost:8080/authoriseToken", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "http://localhost:8080/home";
      } else {
        console.error("Middleware request failed:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error during middleware request:", error);
    });
}

function signOut() {
  fetch("http://localhost:8080/logout", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "http://localhost:8080/";
      } else {
        console.error("Logout request failed:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error during logout request:", error);
    });
}

function openMyConferences() {
  window.location.href = "http://localhost:8080/myConferences";
}
getUserDetails();
