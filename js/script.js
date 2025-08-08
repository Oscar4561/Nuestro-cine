// Lista de usuarios permitidos
const usuarios = [
  { username: "saniorji12", password: "cine_saniorji_2025" },
  { username: "user2", password: "ab#cd" },
  { username: "user3", password: "pass$123" },
  { username: "user4", password: "p3lIcul@" },
  { username: "user5", password: "_ciNe2001" },
];

// Mostrar / ocultar contraseña
document.getElementById("togglePassword").addEventListener("click", function () {
  const password = document.getElementById("password");
  password.type = password.type === "password" ? "text" : "password";
});

// Validación de login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const validUser = usuarios.find(u => u.username === username && u.password === password);

  if (validUser) {
    // Redirige a la cartelera si los datos son correctos
    window.location.href = "cartelera.html";
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
});
