const bookingId = localStorage.getItem("bookingId");

let notified = false;

// 👉 MAIN FUNCTION
async function getQueue() {
  try {
    if (!bookingId) {
      alert("No booking found");
      return;
    }

    const res = await fetch(`http://localhost:5000/api/queue/${bookingId}`);
    const data = await res.json();

    // 👉 Update UI
    document.getElementById("name").innerText = data.name || "-";
    document.getElementById("status").innerText =
      "Status: " + (data.status || "-");
    document.getElementById("position").innerText =
      data.position ?? "-";
    document.getElementById("peopleAhead").innerText =
      data.peopleAhead ?? "-";
    document.getElementById("waitingTime").innerText =
      (data.estimatedWaitingTime ?? "-") + " mins";

    // 🔥 SMART NOTIFICATION (NO ALERT POPUP)
    if (data.peopleAhead <= 1 && !notified) {
      showToast("⚡ Your turn is near!");
      playSound();
      notified = true;
    }

  } catch (err) {
    console.error(err);
  }
}

// 👉 TOAST NOTIFICATION
function showToast(message) {
  const toast = document.createElement("div");

  toast.innerText = message;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#2ecc71";
  toast.style.color = "white";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "8px";
  toast.style.fontSize = "14px";
  toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  toast.style.zIndex = "9999";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// 👉 SOUND ALERT
function playSound() {
  const audio = new Audio("https://www.soundjay.com/buttons/sounds/beep-01a.mp3");
  audio.play();
}

// 👉 AUTO REFRESH
setInterval(getQueue, 3000);
getQueue();