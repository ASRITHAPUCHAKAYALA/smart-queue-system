async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  alert(data.message);

  if (data.message === "Login successful") {
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "../index.html";
  }
}