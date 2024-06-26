const loginUser = async () => {
  let userGmail = document.getElementById("emailId");
  let password = document.getElementById("password");

  try {
    const response = await fetch(
      `http://localhost:8080/login?memberGmail=${userGmail.value}&memberPassword=${password.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      window.location.href = "/home";
    } else {
      alert("Invalid User Gmail or Password. Please try again.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Failed to connect to the server. Please try again later.");
  }

  userGmail.value = "";
  password.value = "";
};
