const centerId = localStorage.getItem("adminCenterId");

async function loadQueue() {
  if (!centerId) {
    alert("❌ No center selected");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/queue/center/${centerId}`);
    const data = await res.json();

    const listDiv = document.getElementById("queueList");
    const nowServingDiv = document.getElementById("nowServing");

    listDiv.innerHTML = "";

    if (data.length === 0) {
      nowServingDiv.innerText = "-";
      return;
    }

    // 👉 Find serving
    const serving = data.find(b => b.status === "serving");
    nowServingDiv.innerText = serving ? serving.name : "-";

    // 👉 Render queue
    data.forEach((b, index) => {
      const div = document.createElement("div");
      div.className = "queue-card";

      div.innerHTML = `
        <div class="queue-left">
          <span class="token">#${index + 1}</span>
          <span class="name">${b.name}</span>
        </div>
        <div class="status ${b.status}">
          ${b.status}
        </div>
      `;

      listDiv.appendChild(div);
    });

  } catch (err) {
    console.error(err);
  }
}

// 👉 NEXT BUTTON
async function nextCustomer() {
  await fetch(`http://localhost:5000/api/queue/next/${centerId}`, {
    method: "PUT"
  });

  loadQueue();
}

// auto refresh (optional but good)
setInterval(loadQueue, 3000);

loadQueue();