const showMyConferences = async () => {
  try {
    const response = await fetch("http://localhost:8080/getMyConferences");
    const data = await response.json();

    const olist = document.getElementById("olist");

    data.forEach((item) => {
      const li = document.createElement("li");
      const table = document.createElement("table");

      // Add table header
      const thead = document.createElement("thead");
      const trHead = document.createElement("tr");
      trHead.innerHTML = `
                <th>${item.eventTitle}</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
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
                <td>Starting date and time</td>
                <td>Ending date and time</td>
                <td></td>
                <td rowspan="2"><button>Upcoming</button></td>
            `;
      trBody2.innerHTML = `
                <td>${item.Name}</td>
                <td>${item.eventCategory}</td>
                <td>${item.eventStartingDateTime}</td>
                <td>${item.eventEndingDateTime}</td>
                <td></td>
            `;
      tbody.appendChild(trBody1);
      tbody.appendChild(trBody2);

      // Append table to list item
      table.appendChild(thead);
      table.appendChild(tbody);
      li.appendChild(table);

      // Append list item to ordered list
      olist.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call the function to populate conferences
showMyConferences();
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
