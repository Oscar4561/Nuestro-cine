// Lista de usuarios permitidos (debería venir de un backend en producción)
const usuarios = [
  { username: "saniorji12", password: "cine_saniorji_2025" },
  { username: "user2", password: "ab#cd" },
  { username: "user3", password: "pass$123" },
  { username: "user4", password: "p3lIcul@" },
  { username: "user5", password: "_ciNe2001" }
];

// Control de intentos
let intentosFallidos = 0;
const MAX_INTENTOS = 5;
const TIEMPO_BLOQUEO = 30000; // 30 segundos

// Elementos del DOM
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const errorMessage = document.getElementById('error-message');
const submitBtn = loginForm.querySelector('button[type="submit"]');

// Mostrar/ocultar contraseña (igual que original)
togglePasswordBtn.addEventListener('click', function() {
  const password = document.getElementById('password');
  password.type = password.type === 'password' ? 'text' : 'password';
});

// Validación de login mejorada
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Ocultar errores anteriores
  errorMessage.style.display = 'none';
  
  // Verificar bloqueo
  if (intentosFallidos >= MAX_INTENTOS) {
    const tiempoRestante = Math.ceil(TIEMPO_BLOQUEO / 1000);
    showError(`Demasiados intentos. Espere ${tiempoRestante} segundos.`);
    return;
  }

  // Obtener valores
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Validar campos vacíos
  if (!username || !password) {
    showError('Por favor complete todos los campos');
    return;
  }

  // Simular carga (en producción sería una petición real)
  submitBtn.disabled = true;
  
  setTimeout(() => {
    // Validar credenciales
    const validUser = usuarios.find(u => u.username === username && u.password === password);

    if (validUser) {
      // Login exitoso - redirigir
      intentosFallidos = 0;
      window.location.href = 'cartelera.html';
    } else {
      // Login fallido
      intentosFallidos++;
      const intentosRestantes = MAX_INTENTOS - intentosFallidos;
      
      showError(intentosRestantes > 0 
        ? `Usuario o contraseña incorrectos. Intentos restantes: ${intentosRestantes}`
        : 'Cuenta bloqueada temporalmente por seguridad');
      
      // Bloquear después de máximo intentos
      if (intentosFallidos >= MAX_INTENTOS) {
        setTimeout(() => {
          intentosFallidos = 0;
          errorMessage.style.display = 'none';
        }, TIEMPO_BLOQUEO);
      }
      
      // Limpiar contraseña
      passwordInput.value = '';
      passwordInput.focus();
    }
    
    submitBtn.disabled = false;
  }, 800); // Simular tiempo de red
});

// Mostrar mensaje de error
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}
