  const API_URL = "https://68df1237898434f41356ae93.mockapi.io/formularioRegistro";

    export function initLogin() {
  const formLogin = document.getElementById("formLogin");

  if (!formLogin) return;

  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const correo = document.getElementById("floatingInput").value.trim();
    const contrasena = document.getElementById("floatingPassword").value;

    if (!correo || !contrasena) {
      alert("Por favor, completa todos los campos");
      return;
    }

    

    try {
    //Buscar si el usuario existe 
      const respuesta = await fetch(`${API_URL}?correo=${correo}`);
      const usuarios = await respuesta.json();

      //Verificar si se encontró un usuario con ese correo
      if (usuarios.length === 0) {
        alert("❌ No existe una cuenta con este correo. Regístrate primero.");
        return;
      }

      const usuario = usuarios[0];

      //Comparar contraseñas
      if (usuario.contrasena !== contrasena) {
        alert("⚠️ Contraseña incorrecta");
        return;
      }

     

      // Si el usuario marcó "Guardar datos", almacenamos el correo
      const rememberMe = document.getElementById("checkDefault").checked;
      if (rememberMe) {
        localStorage.setItem("correoGuardado", correo);
      } else {
        localStorage.removeItem("correoGuardado");
      }

      //  Redirigir al usuario a otra página 
      window.location.href = "./cronoClase-app/public/calendarStudent.html";

    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("⚠️ Error de conexión con el servidor");
    }
  });

  //  Si hay un correo guardado, lo colocamos automáticamente
  const correoGuardado = localStorage.getItem("correoGuardado");
  if (correoGuardado) {
    document.getElementById("floatingInput").value = correoGuardado;
    document.getElementById("checkDefault").checked = true;
  }
}



