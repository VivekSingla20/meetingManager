const showAllConferences = async () => {
  try {
    const response = await fetch("http://localhost:8080/getAllConferences");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const lists = document.querySelector(".lists");
    lists.innerHTML = ""; // Clear previous list items

    data.forEach((response) => {
      const li = document.createElement("li");
      const table = document.createElement("table");

      // Add table header
      const thead = document.createElement("thead");
      const trHead = document.createElement("tr");
      trHead.innerHTML = `
          <th>${response.eventTitle}</th>
          <th> </th>
          <th> </th>
          <th> </th>
          <th> </th>
          <th>Conference</th>
        `;
      thead.appendChild(trHead);

      // Add table body
      const tbody = document.createElement("tbody");
      const trBody1 = document.createElement("tr");
      const trBody2 = document.createElement("tr");
      trBody1.innerHTML = `
          <td>Organizer</td>
          <td>Category</td>
          <td>startingDateTime</td>
          <td>endingDateTime</td>
          <td>Entry Fee</td>
          <td rowspan="2"><button onclick="register()" >Register</button></td>
        `;
      trBody2.innerHTML = `
          <td>${response.Name}</td>
          <td>${response.eventCategory}</td>
          <td>${response.eventStartingDateTime}</td>
          <td>${response.eventEndingDateTime}</td>
          <td>Free</td>
        `;
      tbody.appendChild(trBody1);
      tbody.appendChild(trBody2);

      // Append table to list item
      table.appendChild(thead);
      table.appendChild(tbody);
      li.appendChild(table);

      // Append list item to ordered list
      lists.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

showAllConferences();
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
