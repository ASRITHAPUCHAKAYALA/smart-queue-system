// ✅ GET URL PARAMS
const params = new URLSearchParams(window.location.search);
const centerId = params.get("centerId");
const type = params.get("type");

// ✅ BUTTON CLICK
const btn = document.getElementById("bookBtn");

btn.onclick = async function () {
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  // ✅ VALIDATION
  if (!name || !date || !time) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/bookings/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        serviceType: type,
        centerId: centerId
      })
    });

    const data = await res.json();

    console.log("Response:", data); // debug

    if (res.ok) {
      alert("✅ Booking Successful");

      // ✅ store id
      localStorage.setItem("bookingId", data.booking._id);

      // ✅ redirect
      window.location.href = "queue.html";
    } else {
      alert(data.message || "Booking failed");
    }

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};