
/* =========================================
   AREPA EXPRESS - ACCESO ADMINISTRATIVO
========================================= */

const ADMIN_SETTINGS_KEY = "arepaExpressAdminSettings";

function getLoginSettings() {
    try {
        return JSON.parse(
            localStorage.getItem(ADMIN_SETTINGS_KEY)
        ) || {};
    } catch (error) {
        return {};
    }
}

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const settings = getLoginSettings();

    const adminName = settings.name || "carlos";
    const adminPassword = settings.password || "33c";

    const name = document.getElementById("adminName").value.trim();
    const password = document.getElementById("adminPassword").value;

    if (name === adminName && password === adminPassword) {
        sessionStorage.setItem("arepaExpressAdmin", "true");
        window.location.href = "admin.html";
    } else {
        loginError.textContent = "Nombre o contraseña incorrectos.";
        loginError.style.display = "block";
    }
});
