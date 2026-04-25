async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  console.log("Response:", data); // 👈 ADD THIS

  alert(data.message || "Something went wrong"); // 👈 SAFE FIX

  if (data.message === "Signup successful") {
    window.location.href = "login.html";
  }
}