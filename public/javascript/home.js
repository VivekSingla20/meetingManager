function openMyProfile() {
  fetch("http://localhost:8080/authoriseToken", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "http://localhost:8080/profile";
      } else {
        console.error("Middleware request failed:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error during middleware request:", error);
    });
}
function showAllConferences() {
  fetch("http://localhost:8080/authoriseToken", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "http://localhost:8080/showAllConferences";
      } else {
        console.error("Middleware request failed:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error during middleware request:", error);
    });
}
function openCreateMeeting() {
  fetch("http://localhost:8080/authoriseToken", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "http://localhost:8080/createMeeting";
      } else {
        console.error("Middleware request failed:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error during middleware request:", error);
    });
};

