const registerUser = async () => {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let userGmail = document.getElementById("emailId").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Password and Confirm Password are not the same.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        memberGmail: userGmail,
        memberPassword: password,
      }),
    });

    if (response.ok) {
      alert("You have been registered successfully.");
      window.location.href = "http://localhost:8080";
    } else {
      const data = await response.json();
      alert(`Failed to register: ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred during registration. Please try again later.");
  }
};
