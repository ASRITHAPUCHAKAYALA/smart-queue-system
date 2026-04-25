function goToBooking(service) {
  localStorage.setItem("serviceType", service);
  window.location.href = "pages/book.html";
}
function goToLogin() {
  window.location.href = "pages/login.html";
}

function goToSignup() {
  window.location.href = "pages/signup.html";
}
function goToService(type) {
  window.location.href = `pages/service.html?type=${type}`;
}