const params = new URLSearchParams(window.location.search);
const type = params.get("type");

const listDiv = document.getElementById("centerList");

let centers = [];

// 🔥 FETCH FROM BACKEND
async function fetchCenters() {
  const res = await fetch(`http://localhost:5000/api/centers?type=${type}`);
  centers = await res.json();

  loadCenters(centers);
}

function loadCenters(data) {
  listDiv.innerHTML = "";

  data.forEach(center => {
    const div = document.createElement("div");
    div.className = "card";
    div.style.cursor = "pointer";

    div.innerHTML = `<h3>${center.name}</h3>`;

    // 🔥 CLICK EVENT
    div.addEventListener("click", () => {
       localStorage.setItem("adminCenterId", center._id);
      window.location.href = `book.html?centerId=${center._id}&type=${center.type}`;
    });

    listDiv.appendChild(div);
  });
}

// 🔍 SEARCH
function searchCenter() {
  const value = document.getElementById("search").value.toLowerCase();

  const filtered = centers.filter(c =>
    c.name.toLowerCase().includes(value)
  );

  loadCenters(filtered);
}

fetchCenters();