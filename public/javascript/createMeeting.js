let name = document.getElementById("name");
let email = document.getElementById("email");
let eventTitle = document.getElementById("eventTitle");
let eventStartingDateTime = document.getElementById("eventStartingDateTime");
let eventCategory = document.getElementById("eventCategory");
let eventEndingDateTime = document.getElementById("eventEndingDateTime");
let visibility = document.getElementById("visibility");

const createMeeting = () => {
  if (visibility.value == "public") {
    createMeetingPublic();
  } else {
    addToMyConference();
  }
};

const createMeetingPublic = async () => {
  try {
    const response = await fetch("http://localhost:8080/createMeetingPublic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        gmail: email.value,
        eventTitle: eventTitle.value,
        eventStartingDateTime: eventStartingDateTime.value,
        eventCategory: eventCategory.value,
        eventEndingDateTime: eventEndingDateTime.value,
        visibility: visibility.value,
      }),
    });

    if (response.ok) {
      alert("Meeting Created Successfully.");
      await addToMyConference(); // Wait for addToMyConference to complete
    } else {
      console.error("Failed to create meeting:", response.statusText);
    }
  } catch (error) {
    console.error("Error creating public meeting:", error);
  }
};

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

const addToMyConference = async () => {
  try {
    const response = await fetch("http://localhost:8080/authoriseToken", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to check user. Status: " + response.status);
    }

    const userData = await response.json(); // Parse JSON response

    const response2 = await fetch("http://localhost:8080/addToMyConference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        gmail: email.value,
        eventTitle: eventTitle.value,
        eventStartingDateTime: eventStartingDateTime.value,
        eventCategory: eventCategory.value,
        eventEndingDateTime: eventEndingDateTime.value,
        id: userData.id, // Access parsed user data for id
      }),
    });

    if (response2.ok) {
      console.log("Added to my conferences successfully.");
    } else {
      console.error("Failed to add to my conferences:", response2.statusText);
    }
  } catch (error) {
    console.error("Error adding to my conferences:", error);
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
